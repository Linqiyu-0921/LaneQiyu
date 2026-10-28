# Lane Qiyu

于尘世借一程风雨，于天地寻一处清欢。

一个安放文字、作品与未完探索的个人数字空间。

访问网站 · [**English**](./README.md) · [GitHub](https://github.com/Linqiyu-0921/LaneQiyu)
<!-- 将个人网站的真实首页截图保存到 docs/preview.png 后，可启用下面一行：
![网站预览](./docs/preview.png)
-->

## 关于

你好，我是 Lane Qiyu。

我学习地理空间信息工程，也关注数字产品、设计与文学创作。我对城市、地理、技术以及故事之间的联系充满兴趣。

这是我的个人网站，用于记录文字、项目、实验和一路上的观察。相比一份完成的简历或作品集，我更希望它成为一个持续生长的个人数字空间。

## 探索网站

| 栏目 | 内容 |
| --- | --- |
| Home | 个人简介与近期内容 |
| Blog | 技术、学习与日常发现的记录 |
| Writing | 散文、随笔等写作内容的索引 |
| Projects | 已做过与正在进行的项目和实验 |
| About | 经历、兴趣与联系方式 |

部分栏目与文章外链仍在持续完善。

## 技术栈

- [Astro](https://astro.build/) — 静态网站框架
- [Astro Theme Pure](https://astro-pure.js.org/) — 主题与界面基础
- TypeScript — 配置与逻辑
- Markdown / MDX — 文章与项目内容
- UnoCSS — 通过主题集成的样式方案
- [Pagefind](https://pagefind.app/) — 站内搜索
- [Bun](https://bun.sh/) — 依赖管理与本地开发
- [Cloudflare Pages](https://pages.cloudflare.com/) — 网站部署

具体依赖版本请以 [`package.json`](./package.json) 为准。

## 本地运行

请先安装 Bun，并使用与当前 Astro 版本兼容的 Node.js 环境。

```bash
git clone https://github.com/Linqiyu-0921/LaneQiyu.git
cd LaneQiyu
bun install
bun run dev
```

开发服务器会在终端显示本地访问地址。

```bash
bun run build    # 构建生产版本
bun run preview  # 本地预览构建结果
bun run check    # Astro 类型与配置检查
```

## 项目结构

```
src/
├── assets/          # 站点资源
├── components/      # 自定义组件
├── content/         # 博客文章与项目内容
├── pages/           # 页面与路由
└── site.config.ts   # 网站配置与导航
public/              # 图片、图标等公共资源
astro.config.ts      # Astro 配置
package.json         # 脚本与项目依赖
```

## 致谢

本网站基于 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure) 开发，并针对个人展示与内容组织进行了定制。感谢 [cworld1](https://github.com/cworld1) 及其他贡献者对主题、组件和相关功能的开源工作。

## 开源许可与内容版权

本仓库的源代码遵循 [Apache License 2.0](./LICENSE)，同时保留第三方依赖、组件及素材各自适用的许可与声明。

除另有明确声明外，我个人原创的文章、摄影、独立创作的视觉作品等内容，不因仓库代码开源而自动获得软件许可证下的复用授权。**如需超出法定许可或单独授权范围的使用，请先联系我。**第三方内容的权利归其各自权利人所有。

---

Lane Qiyu · [laneqiyu.cn](https://laneqiyu.cn)
