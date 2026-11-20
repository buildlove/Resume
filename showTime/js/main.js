/**
 * 个人作品集锦 · 渲染与交互脚本
 * 功能：读取配置渲染卡片 / 标签筛选 / iframe 弹窗预览 / URL 定位（#work=id）
 * 规范：ES6+，无外部依赖，全部中文注释
 * 更新：20261119 13:01:11
 */

// ==================== 读取配置 ====================

/** 全局配置对象（来自 js/works-config.js） */
const config = window.WORKS_CONFIG || { site: {}, works: [] };

// 渲染站点标题 / 副标题 / 页脚
document.getElementById('siteTitle').textContent = config.site.title || '个人作品集';
document.getElementById('siteSubtitle').textContent = config.site.subtitle || '';
document.getElementById('siteFooter').textContent = config.site.footer || '';

// ==================== 渲染作品卡片 ====================

const worksGrid = document.getElementById('worksGrid');
const emptyTip = document.getElementById('emptyTip');

/**
 * 根据作品 id 生成一对稳定的渐变色（无封面图时使用）
 * @param {string} id - 作品 id
 * @returns {string[]} [起始色, 结束色]
 */
const gradientOf = (id) => {
  // 把 id 的字符编码累加得到一个稳定数值
  const hash = [...id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const hueA = hash % 360;              // 色相 A
  const hueB = (hueA + 60) % 360;       // 色相 B：与 A 保持 60° 色相差
  return [`hsl(${hueA}, 70%, 55%)`, `hsl(${hueB}, 70%, 45%)`];
};

/**
 * 渲染单个作品卡片
 * @param {object} work - 作品配置对象
 * @returns {HTMLElement} 卡片节点
 */
const renderCard = (work) => {
  const [colorA, colorB] = gradientOf(work.id);
  const card = document.createElement('article');
  card.className = 'work-card';
  card.dataset.tag = (work.tags || []).join(',');   // 供筛选用
  card.dataset.id = work.id;

  // 封面区：有 cover 用图片，否则生成渐变 + 标题首字
  const coverHtml = work.cover
    ? `<div class="work-cover"><img src="${work.cover}" alt="${work.title} 封面"></div>`
    : `<div class="work-cover" style="--cover-a:${colorA}; --cover-b:${colorB}">
         ${work.title.charAt(0)}
       </div>`;

  // 标签列表
  const tagsHtml = (work.tags || [])
    .map((tag) => `<li>${tag}</li>`)
    .join('');

  // 源码按钮：配置了 repo 才显示
  const repoHtml = work.repo
    ? `<a class="work-btn ghost" href="${work.repo}" target="_blank" rel="noopener">源码</a>`
    : '';

  card.innerHTML = `
    ${coverHtml}
    <div class="work-body">
      <div class="work-head">
        <h3 class="work-title">${work.title}</h3>
        ${work.date ? `<span class="work-date">${work.date}</span>` : ''}
      </div>
      <p class="work-desc">${work.description || ''}</p>
      <ul class="work-tags">${tagsHtml}</ul>
      <div class="work-actions">
        <button class="work-btn primary" data-preview="${work.id}">预览作品</button>
        ${repoHtml}
      </div>
    </div>
  `;

  // 点击卡片空白区域也能打开预览（按钮自身也触发，避免重复处理）
  card.addEventListener('click', (event) => {
    // 点到"源码"外链时不触发预览
    if (event.target.closest('a')) return;
    openPreview(work.id);
  });

  return card;
};

// 把所有作品卡片挂载到网格
config.works.forEach((work) => worksGrid.appendChild(renderCard(work)));

// ==================== 标签筛选 ====================

const filterBar = document.getElementById('filterBar');

// 从所有作品收集去重后的标签，生成筛选按钮
const allTags = [...new Set(config.works.flatMap((work) => work.tags || []))];
allTags.forEach((tag) => {
  const btn = document.createElement('button');
  btn.className = 'filter-btn';
  btn.dataset.tag = tag;
  btn.textContent = tag;
  filterBar.appendChild(btn);
});

// 筛选按钮点击：按标签显示 / 隐藏卡片
filterBar.addEventListener('click', (event) => {
  const btn = event.target.closest('.filter-btn');
  if (!btn) return;

  // 更新按钮选中态
  filterBar.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));
  btn.classList.add('active');

  const tag = btn.dataset.tag;
  let visibleCount = 0;

  // 遍历卡片做显隐
  worksGrid.querySelectorAll('.work-card').forEach((card) => {
    const matched = tag === '*' || card.dataset.tag.split(',').includes(tag);
    card.hidden = !matched;
    if (matched) visibleCount += 1;
  });

  // 空分类提示
  emptyTip.hidden = visibleCount > 0;
});

// ==================== iframe 预览弹窗 ====================

const modal = document.getElementById('previewModal');
const modalFrame = document.getElementById('modalFrame');
const modalTitle = document.getElementById('modalTitle');
const modalOpenNew = document.getElementById('modalOpenNew');
const modalRepo = document.getElementById('modalRepo');

/**
 * 打开作品预览弹窗
 * @param {string} workId - 作品 id
 */
function openPreview(workId) {
  const work = config.works.find((item) => item.id === workId);
  if (!work) return;

  modalTitle.textContent = work.title;

  // 预览地址：local 类型取相对路径，url 类型取完整云链接
  const previewSrc = work.type === 'url' ? work.source : work.source;
  modalFrame.src = previewSrc;

  // "新窗口打开"指向同一个预览地址
  modalOpenNew.href = previewSrc;

  // 源码按钮按需显示
  if (work.repo) {
    modalRepo.href = work.repo;
    modalRepo.hidden = false;
  } else {
    modalRepo.hidden = true;
  }

  modal.hidden = false;
  document.body.style.overflow = 'hidden';   // 锁定背景滚动

  // URL 记录当前作品，方便分享 / 刷新恢复（#work=demo）
  history.replaceState(null, '', `#work=${workId}`);
}

/** 关闭预览弹窗并恢复滚动 */
const closePreview = () => {
  modal.hidden = true;
  modalFrame.src = 'about:blank';   // 清空 iframe，停止作品内脚本
  document.body.style.overflow = '';
  history.replaceState(null, '', location.pathname);   // 清掉 hash
};

// 关闭按钮 / 遮罩点击
document.getElementById('modalClose').addEventListener('click', closePreview);
document.getElementById('modalMask').addEventListener('click', closePreview);

// ESC 键关闭
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closePreview();
});

// ==================== URL 定位（#work=id） ====================

// 页面加载时带 #work=xxx 则直接打开对应作品
const hashMatch = location.hash.match(/^#work=(.+)$/);
if (hashMatch) {
  openPreview(decodeURIComponent(hashMatch[1]));
}
