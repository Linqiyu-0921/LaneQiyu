'use strict';
const pool = document.querySelector('.pool');
const canvas = pool.querySelector('canvas');
const duck = pool.querySelector('.duck');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
const state = { x: .61, y: .42, tx: .61, ty: .42, vx: 0, vy: 0, angle: -.8, time: 0, lastInput: 0, roaming: false, heading: 0, cruise: 0, activity: 0, float: 0, roll: 0 };
let width = 1, height = 1, lastFrame = 0, program, uniforms, surfaceTexture;
let gridWidth = 256, gridHeight = 98, field, previous, next, pressureField, surfacePixels, accumulator = 0;
let lastSourceX = state.x, lastSourceY = state.y;
let frameId = 0;
let playing = false;
let nextPaddle = 0;
let paddleSide = 1;

function resetSurface() {
  gridHeight = Math.max(64, Math.round(gridWidth * height / width));
  field = new Float32Array(gridWidth * gridHeight);
  previous = new Float32Array(field.length);
  next = new Float32Array(field.length);
  pressureField = new Float32Array(field.length);
  surfacePixels = new Uint8Array(field.length * 4);
  accumulator = 0;
}

function disturb(x, y, strength, radius = .095) {
  const cx = x * (gridWidth - 1), cy = y * (gridHeight - 1);
  const r = radius * gridHeight;
  for (let j = Math.max(1, Math.floor(cy - r * 4)); j < Math.min(gridHeight - 1, cy + r * 4); j++) {
    for (let i = Math.max(1, Math.floor(cx - r * 4)); i < Math.min(gridWidth - 1, cx + r * 4); i++) {
      const d = ((i - cx) ** 2 + (j - cy) ** 2) / (r * r);
      const offset = j * gridWidth + i;
      const pressure = strength * (1 - d) * Math.exp(-d);
      field[offset] -= pressure;
      previous[offset] -= pressure * .94;
    }
  }
}

function ripple(x, y, strength = 1) { disturb(x, y, strength * .75, .035); }

function updateSurface(dt) {
  const heading = state.angle + Math.PI;
  const dirX = Math.cos(heading), dirY = Math.sin(heading);
  const radius = .105;
  const amplitude = 1.35 + state.activity * 1.65;
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const dx = (x / (gridWidth - 1) - state.x) * width / height;
      const dy = y / (gridHeight - 1) - state.y;
      const along = dx * dirX + dy * dirY;
      const across = -dx * dirY + dy * dirX;
      const stretch = 1 + state.activity * .5 / (1 + Math.exp(along * 45));
      pressureField[y * gridWidth + x] = amplitude * Math.exp(-.5 * ((along / stretch) ** 2 + across ** 2) / radius ** 2);
    }
  }
  accumulator += dt;
  while (accumulator >= 1 / 60) {
    for (let y = 1; y < gridHeight - 1; y++) {
      for (let x = 1; x < gridWidth - 1; x++) {
        const i = y * gridWidth + x;
        const laplacian = field[i - 1] + field[i + 1] + field[i - gridWidth] + field[i + gridWidth] - 4 * field[i];
        const edgeDistance = Math.min(x, y, gridWidth - 1 - x, gridHeight - 1 - y);
        const distance = Math.hypot((x / (gridWidth - 1) - state.x) * width / height, y / (gridHeight - 1) - state.y);
        const farFade = Math.max(0, Math.min(1, (distance - .3) / .4));
        const localDamping = .964 - .024 * farFade * farFade * (3 - 2 * farFade);
        const damping = edgeDistance < 12 ? Math.min(localDamping, .82 + edgeDistance * .012) : localDamping;
        const pressureLaplacian = pressureField[i - 1] + pressureField[i + 1] + pressureField[i - gridWidth] + pressureField[i + gridWidth] - 4 * pressureField[i];
        next[i] = field[i] + (field[i] - previous[i]) * damping + .22 * (laplacian - pressureLaplacian);
      }
    }
    const old = previous;
    previous = field;
    field = next;
    next = old;
    accumulator -= 1 / 60;
  }
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const i = y * gridWidth + x;
      const gx = field[y * gridWidth + Math.min(gridWidth - 1, x + 1)] - field[y * gridWidth + Math.max(0, x - 1)];
      const gy = field[Math.min(gridHeight - 1, y + 1) * gridWidth + x] - field[Math.max(0, y - 1) * gridWidth + x];
      surfacePixels[i * 4] = Math.max(0, Math.min(255, Math.round(128 + gx * 100)));
      surfacePixels[i * 4 + 1] = Math.max(0, Math.min(255, Math.round(128 + gy * 100)));
      surfacePixels[i * 4 + 2] = Math.max(0, Math.min(255, 128 + field[i] * 12));
      surfacePixels[i * 4 + 3] = 255;
    }
  }
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, surfaceTexture);
  gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gridWidth, gridHeight, gl.RGBA, gl.UNSIGNED_BYTE, surfacePixels);
}

function compile(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
  return shader;
}

function setupWater() {
  const vertex = compile(gl.VERTEX_SHADER, `
    attribute vec2 position;
    varying vec2 uv;
    void main() { uv = position * .5 + .5; gl_Position = vec4(position, 0., 1.); }
  `);
  const fragment = compile(gl.FRAGMENT_SHADER, `
    precision highp float;
    varying vec2 uv;
    uniform sampler2D water;
    uniform sampler2D surface;
    uniform vec2 size;
    uniform vec2 surfaceTexel;
    uniform float time;
    uniform float motion;

    void main() {
      vec2 p = vec2(uv.x, 1. - uv.y);
      float aspect = size.x / size.y;
      vec2 q = p * vec2(aspect, 1.);
      vec2 distortion = vec2(
        sin(q.y * 15. + time * .7) + sin(q.x * 11. + q.y * 7. - time * .42),
        cos(q.x * 13. - time * .55) + sin(q.y * 10. + q.x * 8. + time * .6)
      ) * .00025 * motion;
      vec3 surfaceState = texture2D(surface, p).rgb * .4;
      surfaceState += texture2D(surface, p + vec2(surfaceTexel.x, 0.)).rgb * .15;
      surfaceState += texture2D(surface, p - vec2(surfaceTexel.x, 0.)).rgb * .15;
      surfaceState += texture2D(surface, p + vec2(0., surfaceTexel.y)).rgb * .15;
      surfaceState += texture2D(surface, p - vec2(0., surfaceTexel.y)).rgb * .15;
      vec2 gradient = (surfaceState.rg - vec2(128. / 255.)) * 2.55;
      gradient /= 1. + length(gradient) * 1.8;
      distortion += gradient * .24;
      float slope = length(gradient);
      float light = clamp(dot(gradient, vec2(-.2, -.3)), -.055, .055);
      vec3 normal = normalize(vec3(-gradient * 2.8, 1.));
      float highlight = pow(max(dot(normal, normalize(vec3(-.5, -.7, 1.))), 0.), 24.);
      highlight *= smoothstep(.015, .14, slope) * .035;
      vec2 sampleUV = p + distortion / vec2(aspect, 1.);
      sampleUV = clamp(sampleUV, vec2(.002), vec2(.998));
      vec3 color = texture2D(water, sampleUV * .97 + .015).rgb;
      float luminance = dot(color, vec3(.2126, .7152, .0722));
      color = mix(vec3(luminance), color, 1.22);
      color += vec3(.55, .85, 1.) * light;
      color += vec3(.25, .65, .85) * highlight;
      gl_FragColor = vec4(color, 1.);
    }
  `);
  program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  uniforms = Object.fromEntries(['water', 'size', 'time', 'motion', 'surface', 'surfaceTexel'].map(key => [key, gl.getUniformLocation(program, key)]));
  gl.activeTexture(gl.TEXTURE0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([0,120,255]));
  const textureImage = new Image();
  textureImage.onload = () => {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, textureImage);
    pool.dataset.renderer = 'webgl';
  };
  textureImage.src = 'assets/water.jpg';
  surfaceTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, surfaceTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.uniform1i(uniforms.surface, 1);
  gl.uniform1i(uniforms.water, 0);
  gl.uniform1f(uniforms.motion, reducedMotion ? 0 : 1);
}

function resize() {
  const rect = pool.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  resetSurface();
  if (gl) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, surfaceTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gridWidth, gridHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  }
}

function startRoaming() {
  if (state.roaming) return;
  state.roaming = true;
  state.heading = state.angle + Math.PI;
  state.cruise = 0;
  nextPaddle = state.time + .35;
  state.tx = state.x;
  state.ty = state.y;
  pool.dataset.motion = 'roaming';
}

function steerRoaming(dt) {
  if (!state.roaming || reducedMotion) return;
  const aspect = width / height;
  const headingX = Math.cos(state.heading), headingY = Math.sin(state.heading);
  const edgeX = Math.max(0, .18 - state.x) * 22 - Math.max(0, state.x - .82) * 22;
  const edgeY = Math.max(0, .22 - state.y) * 22 - Math.max(0, state.y - .78) * 22;
  const desired = Math.atan2(headingY + edgeY, headingX + edgeX);
  const turn = Math.atan2(Math.sin(desired - state.heading), Math.cos(desired - state.heading));
  state.heading += (turn * 2.4 + Math.sin(state.time * .7) * .35) * dt;
  state.cruise += (.13 - state.cruise) * (1 - Math.exp(-2.5 * dt));
  state.tx = Math.max(.07, Math.min(.93, state.tx + Math.cos(state.heading) * state.cruise * dt / aspect));
  state.ty = Math.max(.1, Math.min(.9, state.ty + Math.sin(state.heading) * state.cruise * dt));
}

function point(event) {
  const rect = pool.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
    startRoaming();
    return;
  }
  state.roaming = false;
  pool.dataset.motion = 'following';
  state.tx = Math.max(.025, Math.min(.975, (event.clientX - rect.left) / width));
  state.ty = Math.max(.025, Math.min(.975, (event.clientY - rect.top) / height));
  state.lastInput = state.time;
}
pool.addEventListener('pointerenter', point);
pool.addEventListener('pointermove', point);
pool.addEventListener('pointerleave', startRoaming);
pool.addEventListener('pointercancel', startRoaming);
pool.addEventListener('pointerup', event => {
  if (event.pointerType !== 'mouse') startRoaming();
});
pool.addEventListener('pointerdown', event => {
  point(event);
  ripple(state.tx, state.ty, 1.6);
  pool.setPointerCapture(event.pointerId);
  pool.classList.remove('keyboard');
  pool.focus({ preventScroll: true });
});
pool.addEventListener('keydown', event => {
  state.roaming = false;
  pool.dataset.motion = 'keyboard';
  pool.classList.add('keyboard');
  const directions = { ArrowLeft: [-.06, 0], ArrowRight: [.06, 0], ArrowUp: [0, -.1], ArrowDown: [0, .1] };
  if (directions[event.key]) {
    event.preventDefault();
    const [dx, dy] = directions[event.key];
    state.tx = Math.max(.04, Math.min(.96, state.tx + dx));
    state.ty = Math.max(.06, Math.min(.94, state.ty + dy));
    state.lastInput = state.time;
  } else if (event.code === 'Space') {
    event.preventDefault();
    ripple(state.x, state.y, 1.8);
  }
});

function render(now) {
  const dt = Math.min((now - lastFrame) / 1000 || .016, .04);
  lastFrame = now;
  state.time += dt;
  steerRoaming(dt);
  if (state.roaming && !reducedMotion && state.time >= nextPaddle) {
    const heading = state.angle + Math.PI;
    const sideX = -Math.sin(heading) * .045 * height / width;
    const sideY = Math.cos(heading) * .045;
    disturb(state.x + sideX * paddleSide, state.y + sideY * paddleSide, 1.65, .052);
    disturb(state.x - sideX * paddleSide, state.y - sideY * paddleSide, 1.0, .058);
    paddleSide *= -1;
    nextPaddle = state.time + 1.1 + .16 * Math.sin(state.time * 1.7);
  }
  const dx = state.tx - state.x, dy = state.ty - state.y;
  const follow = 1 - Math.exp(-28 * dt);
  const moveX = dx * follow, moveY = dy * follow;
  state.vx = moveX / dt;
  state.vy = moveY / dt;
  state.x += moveX;
  state.y += moveY;
  const speed = Math.hypot(state.vx * width, state.vy * height);
  const activityTarget = Math.min(speed / Math.max(height * .65, 1), 1);
  state.activity += (activityTarget - state.activity) * (1 - Math.exp(-(activityTarget > state.activity ? 12 : 2.5) * dt));
  if (speed > 5) {
    const targetAngle = Math.atan2(state.vy * height, state.vx * width) - Math.PI;
    const difference = Math.atan2(Math.sin(targetAngle - state.angle), Math.cos(targetAngle - state.angle));
    state.angle += difference * (1 - Math.exp(-22 * dt));
  }
  const sourceDistance = Math.hypot((state.x - lastSourceX) * width / height, state.y - lastSourceY);
  if (sourceDistance > .001) {
    const steps = Math.max(1, Math.ceil(sourceDistance / .018));
    const strength = Math.min(sourceDistance * 3.5, .22) / steps;
    for (let i = 1; i <= steps; i++) {
      const fraction = i / steps;
      disturb(lastSourceX + (state.x - lastSourceX) * fraction, lastSourceY + (state.y - lastSourceY) * fraction, strength, .065);
    }
    lastSourceX = state.x;
    lastSourceY = state.y;
  }
  if (program && !gl.isContextLost()) {
    updateSurface(dt);
    gl.uniform2f(uniforms.size, width, height);
    gl.uniform2f(uniforms.surfaceTexel, 1.5 / gridWidth, 1.5 / gridHeight);
    gl.uniform1f(uniforms.time, state.time);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  const cellX = Math.max(1, Math.min(gridWidth - 2, Math.round(state.x * (gridWidth - 1))));
  const cellY = Math.max(1, Math.min(gridHeight - 2, Math.round(state.y * (gridHeight - 1))));
  const cell = cellY * gridWidth + cellX;
  const surfaceRoll = (field[cell + 1] - field[cell - 1]) * .16;
  state.float += (Math.tanh(field[cell]) * 1.8 - state.float) * (1 - Math.exp(-8 * dt));
  state.roll += (Math.max(-.045, Math.min(.045, surfaceRoll)) - state.roll) * (1 - Math.exp(-8 * dt));
  const bob = reducedMotion ? 0 : -state.float;
  const roll = reducedMotion ? 0 : state.roll;
  duck.style.transform = `translate(${state.x * width}px, ${state.y * height + bob}px) translate(-50%, -50%) rotate(${state.angle + roll}rad)`;
  frameId = playing ? requestAnimationFrame(render) : 0;
}
if (gl) {
  try { setupWater(); } catch (error) { console.error('Water renderer:', error); canvas.hidden = true; }
} else {
  canvas.hidden = true;
  pool.dataset.renderer = 'static';
}
canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); canvas.style.opacity = '0'; });
canvas.addEventListener('webglcontextrestored', () => { setupWater(); resize(); canvas.style.opacity = '1'; });
new ResizeObserver(resize).observe(pool);
resize();
function setPlaying(value) {
  playing = value && !document.hidden;
  cancelAnimationFrame(frameId);
  frameId = 0;
  pool.dataset.playing = String(playing);
  if (playing) { lastFrame = performance.now(); frameId = requestAnimationFrame(render); }
}
window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.source !== parent || event.data?.type !== 'qqq-playback') return;
  setPlaying(event.data.playing === true);
});
document.addEventListener('visibilitychange', () => { if (document.hidden) setPlaying(false); });
setPlaying(false);
parent.postMessage({ type: 'qqq-ready' }, location.origin);
