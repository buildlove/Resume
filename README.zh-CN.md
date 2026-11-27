# 个人线上简历（纯静态 · 侧栏悬浮版）

[English](./README.md) | **简体中文**

李洋的个人在线简历，**零外部依赖、纯 HTML/CSS/JS**，可直接发布到 GitHub Pages。
布局：**左侧悬浮栏**（基础信息 + 菜单 + 联系方式，滚动时常驻可见）+ 右侧主内容铺满（工作经历 → 项目经验 → 技术栈 → 教育经历 → 关于我）。

> 页面支持**中英文双语**，默认显示**英文**；点击侧栏顶部的 **中文** 胶囊按钮切换为中文，按钮随即变为 **English**，可再切回英文。

## 目录结构

```
线上简历项目/
├── index.html        # 简历主页面（页面初始文案为英文）
├── css/style.css     # 样式（侧栏悬浮 / 深浅色 / 响应式 / 打印样式）
├── js/main.js        # 交互（中英文切换 / 主题切换 / 菜单高亮 / 手机号复制）+ I18N 文案表
├── favicon.svg       # 站点图标
├── showTime/         # 个人作品集锦（独立站点，侧栏"作品展示"链接至此）
│   ├── index.html    #   作品集主页
│   ├── js/works-config.js  # ★ 作品配置（增删作品只改这里）
│   └── works/        #   本地打包作品放这里
├── README.md         # 英文说明（默认展示）
└── README.zh-CN.md   # 本说明（中文版）
```

> 发布到 GitHub Pages 后：简历 = 仓库根路径，作品集 = `https://<用户名>.github.io/<仓库名>/showTime/`。

## 本地预览

直接双击 `index.html` 用浏览器打开即可；或起本地服务：

```bash
# 在「线上简历项目」目录下执行
python3 -m http.server 8080
# 浏览器访问 http://localhost:8080
```

## 发布到 GitHub Pages（推荐方式 A：仓库名 <用户名>.github.io）

以你的 GitHub 账号 `buildlove` 为例：

1. GitHub 新建仓库，名字填 **`buildlove.github.io`**（公开 Public）
2. 把本目录所有文件推上去：

```bash
# 在「线上简历项目」目录下执行
git init
git add .
git commit -m "个人线上简历初版"
git branch -M main
git remote add origin https://github.com/buildlove/buildlove.github.io.git
git push -u origin main
```

3. 打开 `https://buildlove.github.io` 即是你的线上简历，**无需任何构建步骤**。

## 方式 B：任意仓库名 + Pages 开关

1. 新建仓库如 `resume`，推送同上（remote 地址换成 `.../resume.git`）
2. 仓库 **Settings → Pages → Source** 选 `main` 分支 `/ (root)`，保存
3. 访问 `https://buildlove.github.io/resume/`

## 内容维护

- **文字（中英文）**：编辑 `js/main.js` 中的 `I18N` 文案表。`index.html` 通过 `data-i18n="键名"` 标记可翻译元素（含内联标签的段落用 `data-i18n-html`）；HTML 初始文案为英文，即使 JS 未执行也能正常显示。
- **标题 / SEO 描述**：编辑 `js/main.js` 中的 `PAGE_META`（切换语言时会同步更新 `<title>`、`meta description` 与 Open Graph 标签）。
- **改配色**：`css/style.css` 顶部 `:root` 变量里的 `--primary` 等。
- **联系方式**：在 `index.html` 侧栏「联系方式」区直接改明文（手机 / 邮箱 / GitHub / 脚手架集合均为明文直出；手机号按钮点击可一键复制纯数字）。
- **打印导出 PDF**：浏览器 `Cmd/Ctrl + P`，已内置打印样式（自动隐藏导航与切换按钮等）。
- **缓存刷新**：`index.html` 引用 `css/style.css` 与 `js/main.js` 时带 `?v=` 版本号。修改这两个文件后请递增版本号（如 `?v=202611271342`），强制浏览器 / GitHub Pages CDN 拉取最新文件，避免旧缓存导致页面交互失效。

## 特性

- ✅ 零外部依赖（无 CDN、无字体库），国内访问快
- ✅ 中英文双语（侧栏顶部按钮切换，**默认英文**）
- ✅ 默认亮色主题（可一键切换深色，选择会被记忆）
- ✅ 响应式（手机 / 平板 / 桌面）
- ✅ 联系方式明文直出（手机号点击一键复制）
- ✅ 打印友好（可直接打印为 PDF 投递）
- ✅ SEO 基础（description / Open Graph / JSON-LD）
