/**
 * 个人线上简历 · 交互脚本（侧栏悬浮版）
 * 功能：深浅色主题切换（默认亮色） / 侧栏菜单滚动高亮 / 手机号一键复制
 * 规范：ES6+，无外部依赖，全部中文注释
 * 更新：20261123 09:37:43
 */

// ==================== 深浅色主题切换（默认亮色） ====================
// 页面默认亮色主题；用户手动切换后写入 localStorage，下次访问直接沿用。
// 首次应用由 index.html <head> 内联脚本在渲染前完成（避免主题闪烁），此处只负责按钮图标与点击切换。

/** 主题切换按钮 */
const themeToggle = document.getElementById('themeToggle');

/**
 * 根据当前生效主题同步按钮图标：深色显示 ☀️（点击切亮色），亮色显示 🌙（点击切深色）
 */
const syncThemeIcon = () => {
  // data-theme 是 dark 即视为深色（默认亮色：属性缺省的情况）
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  themeToggle.textContent = isDark ? '☀️' : '🌙';
};

// 初始化按钮图标（默认亮色 → 🌙）
syncThemeIcon();

// 点击按钮：深色 ↔ 亮色 互换，并持久化用户选择
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('resume-theme', nextTheme);
  syncThemeIcon();
});

// ==================== 侧栏菜单滚动高亮 ====================

// 用 IntersectionObserver 监听各区块进入视口，联动侧栏菜单高亮
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const highlightNav = (sectionId) => {
  navAnchors.forEach((anchor) => {
    const active = anchor.getAttribute('href') === `#${sectionId}`;
    anchor.classList.toggle('active', active);
  });
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // 只取进入视口的区块做高亮
    if (entry.isIntersecting) {
      highlightNav(entry.target.id);
    }
  });
}, { rootMargin: '-20% 0px -60% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

// ==================== 手机号一键复制 ====================
// 手机号已在 index.html 明文直出（无需点击显示）；点击手机号即可复制到剪贴板。

/** 手机号元素（明文显示） */
const phoneEl = document.getElementById('phoneText');

/** 手机号显示文本（含分组空格，如 '153 7766 4773'） */
const phoneDisplay = phoneEl.textContent;

/** 手机号纯数字（复制到剪贴板的内容，便于直接拨号 / 粘贴表单） */
const phoneDigits = phoneDisplay.replace(/\s+/g, '');

// 点击手机号：复制纯数字并给出「已复制」反馈
phoneEl.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(phoneDigits);
    phoneEl.textContent = '✓ 已复制';
    // 1.5 秒后恢复显示手机号（始终恢复为初始明文，避免连点导致文本丢失）
    setTimeout(() => { phoneEl.textContent = phoneDisplay; }, 1500);
  } catch (err) {
    // 剪贴板 API 不可用（如非 HTTPS 环境）时：自动选中号码文本，方便手动复制
    const range = document.createRange();
    range.selectNodeContents(phoneEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    phoneEl.title = '请手动长按复制';
  }
});
