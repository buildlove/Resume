/**
 * 个人线上简历 · 交互脚本（侧栏悬浮版）
 * 功能：深浅色主题切换 / 侧栏菜单滚动高亮 / 联系方式防爬渲染与一键复制
 * 规范：ES6+，无外部依赖，全部中文注释
 * 更新：20261119 13:20:13
 */

// ==================== 深浅色主题切换 ====================

/** 从 localStorage 读取用户历史选择的主题 */
const savedTheme = localStorage.getItem('resume-theme');

/** 主题切换按钮点击：在 深色 / 浅色 之间切换并持久化 */
const themeToggle = document.getElementById('themeToggle');

// 页面加载时先应用历史主题（没有则跟随系统，由 CSS 的 prefers-color-scheme 处理）
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  // 当前是暗色就切亮色，否则切暗色
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    || (!document.documentElement.getAttribute('data-theme')
      && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const nextTheme = isDark ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('resume-theme', nextTheme);
  themeToggle.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
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

// ==================== 联系方式防爬渲染 ====================
// 说明：手机号不在 HTML 里写明文，用字符编码数组在运行时还原，
// 可挡住绝大多数只抓静态 HTML 的爬虫（防骚扰电话）；邮箱 / GitHub 按需求明文直出。

/** 手机号字符编码数组：[49,53,51,...] → '153...' */
const PHONE_CODES = [49, 53, 51, 55, 55, 54, 54, 52, 55, 55, 51];

/**
 * 把字符编码数组还原成字符串
 * @param {number[]} codes - 字符编码数组
 * @returns {string} 还原后的文本
 */
const decodeText = (codes) => codes.map((code) => String.fromCharCode(code)).join('');

/**
 * 绑定"点击显示 → 再点击复制"的联系方式按钮
 * @param {string} buttonId - 按钮元素 id
 * @param {number[]} codes - 联系方式的字符编码数组
 */
const bindContactButton = (buttonId, codes) => {
  const button = document.getElementById(buttonId);
  const text = decodeText(codes);
  let revealed = false;

  button.addEventListener('click', async () => {
    // 第一次点击：显示明文
    if (!revealed) {
      button.textContent = text;
      button.title = '点击复制';
      revealed = true;
      return;
    }
    // 之后点击：复制到剪贴板并给出反馈
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = '✓ 已复制';
      setTimeout(() => { button.textContent = original; }, 1500);
    } catch (err) {
      // 剪贴板 API 不可用（如非 HTTPS 环境）时降级为提示
      button.textContent = text;
      button.title = '请手动长按复制';
    }
  });
};

// 初始化手机号按钮（邮箱 / GitHub 为明文链接，无需绑定）
bindContactButton('phoneText', PHONE_CODES);
