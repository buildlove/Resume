# 个人作品集锦（纯静态脚手架）

李洋的个人作品集网站脚手架：**配置驱动**，随时打包前端作品或插入云链接，可发布到 GitHub Pages。

## 目录结构

```
作品集锦脚手架/
├── index.html            # 作品集主页面（一般不用改）
├── css/style.css         # 样式（深浅色 / 响应式卡片 / 弹窗）
├── js/
│   ├── works-config.js   # ★ 作品配置文件（你最常改的文件）
│   └── main.js           # 渲染与交互逻辑（一般不用改）
├── works/                # ★ 本地打包作品放这里，一个作品一个子目录
│   └── demo/             # 内置示例作品（CSS 充电动画）
├── assets/
│   └── covers/           # 作品封面图（可选，不放则自动生成渐变封面）
└── README.md             # 本说明
```

## 添加作品的两种方式

### 方式一：本地打包作品（dist 整包放入）

适合：自己的前端项目，打包后离线也能预览。

1. 在你的项目里执行构建：
   ```bash
   npm run build        # 生成 dist 目录
   ```
2. 把 **dist 里面的内容** 复制到本项目 `works/<作品id>/`，例如：
   ```
   works/gis-bigscreen/index.html
   works/gis-bigscreen/js/...
   works/gis-bigscreen/css/...
   ```
3. 打开 `js/works-config.js`，在 `works` 数组里加一条：
   ```js
   {
     id: 'gis-bigscreen',
     title: 'GIS 数据大屏',
     description: '地图点位聚合 + ECharts 大屏可视化演示。',
     tags: ['GIS', 'ECharts'],
     cover: '',                                     // 封面可留空（自动生成渐变）
     type: 'local',
     source: 'works/gis-bigscreen/index.html',      // 入口页面相对路径
     repo: 'https://github.com/buildlove/xxx',      // 可选
     date: '2026-11',
   }
   ```
4. 刷新页面即可看到新作品卡片，点「预览作品」在弹窗里 iframe 运行。

> ⚠️ 打包注意：资源路径请用**相对路径**（Vite 设置 `base: './'`，Webpack 设置 `publicPath: './'`），
> 否则部署到 GitHub Pages 子路径下资源会 404。

### 方式二：云链接（线上地址直接嵌入）

适合：已部署的线上演示（GitHub Pages / 自有服务器 / 其他云环境）。

配置里 `type` 填 `'url'`，`source` 填完整地址：
```js
{
  id: 'vue3-scaffold',
  title: 'Vue3 脚手架模板',
  description: 'Vue3 + Vite + Element Plus 工程模板演示。',
  tags: ['Vue3', '工程化'],
  cover: '',
  type: 'url',
  source: 'https://buildlove.github.io/vue3-scaffolding-template/',
  repo: 'https://github.com/buildlove/vue3-scaffolding-template',
  date: '2026-11',
}
```

> 说明：iframe 内嵌依赖对方站点允许被嵌入（响应头 `X-Frame-Options` / CSP 未禁止）。
> 若对方站点拒绝嵌入，点「新窗口打开」仍可正常访问。

### 封面图（可选）

- 放到 `assets/covers/` 下（建议 640×400），配置里填相对路径
- 留空则自动按作品 id 生成渐变封面 + 标题首字，省去做图

## 其他功能

- **标签筛选**：配置里的 `tags` 自动汇总成顶部筛选按钮
- **URL 定位**：预览时地址栏带 `#work=<id>`，可直接分享给对方直达某个作品
- **深浅色**：跟随系统自动切换
- **键盘操作**：弹窗内按 `ESC` 关闭

## 发布到 GitHub Pages

1. 新建仓库，例如 `my-works`（公开）
2. 在「作品集锦脚手架」目录执行：
   ```bash
   git init
   git add .
   git commit -m "个人作品集初版"
   git branch -M main
   git remote add origin https://github.com/buildlove/my-works.git
   git push -u origin main
   ```
3. 仓库 **Settings → Pages → Source** 选 `main` 分支 `/ (root)`
4. 访问 `https://buildlove.github.io/my-works/`

## 本地预览

```bash
# 在「作品集锦脚手架」目录下执行
python3 -m http.server 8081
# 浏览器访问 http://localhost:8081
```
