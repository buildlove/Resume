# Personal Online Resume (Static · Floating Sidebar)

**English** | [简体中文](./README.zh-CN.md)

Yang Li's personal online resume — **zero external dependencies, pure HTML/CSS/JS**, ready to publish on GitHub Pages.
Layout: **fixed left sidebar** (profile + navigation + contact, always visible while scrolling) + full-width main content (Work Experience → Projects → Tech Stack → Education → About Me).

> The page is **bilingual (English / Chinese)**. It opens in **English by default**; click the **中文** pill at the top of the sidebar to switch to Chinese, and the button becomes **English** to switch back.

## Directory Structure

```
线上简历项目/
├── index.html        # Resume main page (English copy is the default markup)
├── css/style.css     # Styles (floating sidebar / light & dark themes / responsive / print)
├── js/main.js        # Interactions (EN/ZH switch / theme switch / scroll spy / phone copy) + I18N dictionary
├── favicon.svg       # Site icon
├── showTime/         # Personal works showcase (standalone site, linked from the sidebar)
│   ├── index.html    #   Works index page
│   ├── js/works-config.js  # ★ Works config (edit here to add / remove works)
│   └── works/        #   Local packaged works
└── README.md         # This document (English); README.zh-CN.md is the Chinese version
```

> Once published to GitHub Pages: resume = repository root, works showcase = `https://<username>.github.io/<repo>/showTime/`.

## Local Preview

Just double-click `index.html` in a browser; or start a local server:

```bash
# Run inside the "线上简历项目" directory
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

## Publish to GitHub Pages (Option A: repository named <username>.github.io)

Using your GitHub account `buildlove` as an example:

1. Create a new GitHub repository named **`buildlove.github.io`** (Public)
2. Push all files in this directory:

```bash
# Run inside the "线上简历项目" directory
git init
git add .
git commit -m "Initial personal online resume"
git branch -M main
git remote add origin https://github.com/buildlove/buildlove.github.io.git
git push -u origin main
```

3. Open `https://buildlove.github.io` — that's your online resume, **no build step required**.

## Option B: Any repository name + enable Pages

1. Create a repository such as `resume`, push the same way (change the remote URL to `.../resume.git`)
2. Repository **Settings → Pages → Source**, choose the `main` branch `/ (root)` and save
3. Visit `https://buildlove.github.io/resume/`

## Content Maintenance

- **Text (EN / ZH)**: edit the `I18N` dictionary in `js/main.js`. `index.html` marks each translatable node with `data-i18n="key"` (or `data-i18n-html` for copy containing inline markup). English is the default markup, so the page renders correctly even before JS runs.
- **Meta title / description**: edit `PAGE_META` in `js/main.js` (switching language also updates `<title>`, `meta description` and Open Graph tags).
- **Colors**: edit the `--primary` and other variables in the `:root` block at the top of `css/style.css`.
- **Contact details**: edit the plaintext values in the sidebar's contact area in `index.html` (phone / email / GitHub / Scaffolding Templates are all shown in plaintext; clicking the phone number copies the digits).
- **Export to PDF**: `Cmd/Ctrl + P` in the browser — print styles are built in (navigation and toggles are hidden automatically).
- **Cache busting**: `css/style.css` and `js/main.js` are loaded with a `?v=` query in `index.html`. After editing either file, bump the version (e.g. `?v=202611271342`) so browsers and the GitHub Pages CDN fetch the latest copy instead of a stale cached one.

## Features

- ✅ Zero external dependencies (no CDN, no web fonts) — fast access
- ✅ Bilingual EN / ZH with a toggle at the top of the sidebar; **English by default**
- ✅ Light theme by default (one-click dark mode, choice remembered)
- ✅ Responsive (mobile / tablet / desktop)
- ✅ Contact details in plaintext (click the phone number to copy)
- ✅ Print-friendly (print directly to PDF for applications)
- ✅ Basic SEO (description / Open Graph / JSON-LD)
