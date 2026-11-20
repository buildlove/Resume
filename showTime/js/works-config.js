/**
 * ============================================================
 * 作品集 · 配置文件（★ 你最常改的就是这个文件 ★）
 * ------------------------------------------------------------
 * 添加作品只需两步：
 *   1. 把打包好的前端作品（dist 内容）放到 works/<作品id>/ 目录，
 *      或准备好一个线上云链接
 *   2. 在下面 works 数组里加一条配置，刷新页面即可
 * 每条配置的字段说明见下方示例注释
 * 更新：20261119 13:01:11
 * ============================================================
 */

window.WORKS_CONFIG = {

  // ---------- 站点信息 ----------
  site: {
    title: '李洋 · 个人作品集',
    subtitle: '前端 / 全栈 / GIS 可视化 —— 打包作品与线上演示合集',
    footer: '© 2026 李洋 · 作品集锦 · 托管于 GitHub Pages',
  },

  // ---------- 作品列表（按需增删，顺序即展示顺序） ----------
  works: [

    {
      // 唯一标识：用于 URL 定位（#work=demo），建议英文小写
      id: 'demo',

      // 作品名称
      title: 'CSS 充电动画',

      // 一句话描述（会显示在卡片上）
      description: '纯 CSS 实现的充电动画效果示例，展示作品集本地打包作品的接入方式。',

      // 标签：用于卡片展示和顶部筛选，可任意写
      tags: ['CSS', '动效', '示例'],

      // 封面图路径（可省略：省略时自动生成渐变封面 + 首字）
      // 封面图放到 assets/covers/ 目录下，建议 640×400 左右
      cover: '',

      // 接入方式：
      //   'local' = 本地打包作品（把 dist 放到 works/<id>/ 目录）
      //   'url'   = 云链接（填线上可访问的地址，用 iframe 内嵌预览）
      type: 'local',

      // type='local' 时：作品入口页面的相对路径（相对本项目根目录）
      // type='url'   时：完整的线上地址，例如 'https://buildlove.github.io/my-demo/'
      source: 'works/demo/index.html',

      // 源码仓库地址（可省略；有则卡片上显示"源码"按钮）
      repo: 'https://github.com/buildlove',

      // 完成时间（可省略）
      date: '2026-11',
    },

    // ---------- 更多作品示例（复制改一改即可） ----------
    // {
    //   id: 'vue3-scaffold',
    //   title: 'Vue3 脚手架模板',
    //   description: 'Vue3 + Vite + Element Plus 工程模板，含自动导入、路由、状态管理。',
    //   tags: ['Vue3', '工程化'],
    //   cover: 'assets/covers/vue3-scaffold.png',
    //   type: 'url',                                  // 云链接方式
    //   source: 'https://buildlove.github.io/vue3-scaffolding-template/',
    //   repo: 'https://github.com/buildlove/vue3-scaffolding-template',
    //   date: '2026-11',
    // },
    // {
    //   id: 'gis-bigscreen',
    //   title: 'GIS 数据大屏',
    //   description: '地图点位聚合 + ECharts 大屏可视化演示。',
    //   tags: ['GIS', 'ECharts', '可视化'],
    //   cover: '',
    //   type: 'local',                                // 本地打包方式
    //   source: 'works/gis-bigscreen/index.html',     // dist 复制到 works/gis-bigscreen/
    //   repo: '',
    //   date: '2026-10',
    // },

  ],
};
