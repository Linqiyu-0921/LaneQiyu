# Lane Qiyu · 个人网站

个人博客与作品展示网站，记录写作、城市观察和项目实践。基于 Astro Theme Pure 定制，当前页面包含 Blog、Writing、Projects 和 About。

- 网站：[laneqiyu.cn](https://laneqiyu.cn)
- 配置中的 Cloudflare Pages 地址：[laneqiqu.pages.dev](https://laneqiqu.pages.dev)
- 定位：个人内容站；与数字园林 `linjian`、交互原型 `laneqiyu-world` 分别维护。

## 当前内容

已配置个人名称、头像、站点介绍、导航和社交入口。项目包含 Markdown/MDX 内容、RSS、主题组件及静态构建配置。原主题演示图片和性能成绩不代表本站实测结果。

## 本地运行

仓库保留 `bun.lock`，以下使用 Bun 管理依赖；运行前需有兼容当前 Astro 版本的 Node.js 环境。

```bash
git clone https://github.com/Linqiyu-0921/LaneQiyu.git
cd LaneQiyu
bun install
bun run dev
```

打开终端给出的本地地址。检查与构建：

```bash
bun run check
bun run build
bun run preview
```

`lint` 与 `format` 脚本会修改文件，审阅已有工作区改动后再使用。

## 目录导航

| 路径 | 内容 |
| --- | --- |
| [src/site.config.ts](src/site.config.ts) | 个人资料、导航、主题与集成配置 |
| [src/content/](src/content/) | 博客及写作内容 |
| [src/pages/](src/pages/) | 页面和 RSS 等入口 |
| [src/components/](src/components/) | 本站组件 |
| [packages/pure/](packages/pure/) | 随仓库保留的主题组件源码 |
| [public/](public/) | 图标、图片、重定向和静态文件 |
| [astro.config.ts](astro.config.ts) | 站点地址与构建配置 |

## 来源与维护

主题来自 [cworld1/astro-theme-pure](https://github.com/cworld1/astro-theme-pure)，保留原项目的 [LICENSE](LICENSE) 与署名要求。个人文章、照片及其他素材的使用范围需分别核对，不能由主题代码许可推导。

本地存在尚未同步的首页、图标和站点配置修改。仅更新 README 不会将这些修改发布到线上。
