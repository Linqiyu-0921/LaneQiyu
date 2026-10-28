# Lane Qiyu

Borrowing a season of wind and rain from this world, seeking a quiet clearing between heaven and earth.

A personal digital space for words, work, and unfinished explorations.

[Visit the website](https://laneqiyu.cn) · [**简体中文**](./README.md) · [GitHub](https://github.com/Linqiyu-0921/LaneQiyu)
<!-- Save a real screenshot of the site's homepage to docs/preview.png, then uncomment the line below:
![Website preview](./docs/preview.png)
-->

## About

Hello, I'm Lane Qiyu.

I study geospatial information engineering, with an interest in digital products, design, and literary writing. I'm drawn to the connections between cities, geography, technology, and stories.

This is my personal website — a place to record writing, projects, experiments, and observations along the way. Rather than a finished résumé or portfolio, I hope it becomes a personal digital space that keeps growing.

## Explore the site

| Section | What's inside |
| --- | --- |
| Home | A short introduction and recent content |
| Blog | Notes on technology, learning, and everyday discoveries |
| Writing | An index of essays and other writing |
| Projects | Finished and ongoing projects and experiments |
| About | Background, interests, and contact |

Some sections and external article links are still being filled in.

## Tech stack

- [Astro](https://astro.build/) — static site framework
- [Astro Theme Pure](https://astro-pure.js.org/) — theme and UI foundation
- TypeScript — configuration and logic
- Markdown / MDX — articles and project content
- UnoCSS — styling provided through the theme
- [Pagefind](https://pagefind.app/) — site search
- [Bun](https://bun.sh/) — dependency management and local development
- [Cloudflare Pages](https://pages.cloudflare.com/) — deployment

For exact dependency versions, see [`package.json`](./package.json).

## Running locally

Install Bun first, and use a Node.js environment compatible with the current Astro version.

```bash
git clone https://github.com/Linqiyu-0921/LaneQiyu.git
cd LaneQiyu
bun install
bun run dev
```

The dev server prints its local address in the terminal.

```bash
bun run build    # Build for production
bun run preview  # Preview the production build locally
bun run check    # Astro type and configuration checks
```

## Project structure

```
src/
├── assets/          # Site assets
├── components/      # Custom components
├── content/         # Blog posts and project content
├── pages/           # Pages and routes
└── site.config.ts   # Site configuration and navigation
public/              # Images, icons, and other static assets
astro.config.ts      # Astro configuration
package.json         # Scripts and dependencies
```

## Acknowledgements

This site is built on [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure) and customized for personal presentation and content organization. Thanks to [cworld1](https://github.com/cworld1) and the other contributors for their open-source work on the theme, its components, and related features.

## License and content rights

The source code in this repository is released under the [Apache License 2.0](./LICENSE), while third-party dependencies, components, and assets remain subject to their own applicable licenses and notices.

Unless explicitly stated otherwise, my original articles, photography, and independently created visual works are not automatically granted for reuse under the software license just because the repository code is open source. **If you would like to use them beyond what statutory permissions or a separate authorization allow, please contact me first.** Rights to third-party content belong to their respective owners.

---

Lane Qiyu · [laneqiyu.cn](https://laneqiyu.cn)
