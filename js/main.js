/**
 * 个人线上简历 · 交互脚本（侧栏悬浮版）
 * 功能：中英文切换（默认英文） / 深浅色主题切换（默认亮色） / 侧栏菜单滚动高亮 / 手机号一键复制
 * 规范：ES6+，无外部依赖，全部中文注释
 * 更新：20261127 新增中英文切换（默认英文，按钮位于侧栏顶部）
 */

// ==================== 中英文文案表 ====================
// 页面静态文案通过 data-i18n="键名" 标记；含 HTML 结构的段落用 data-i18n-html。
// 默认英文：index.html 初始文案即为英文，切换语言时不刷新页面、不持久化（每次打开都默认英文）。
const I18N = {
  // ---------- 英文 ----------
  en: {
    // 页面元信息（title / description 由 PAGE_META 管理，此处不含）
    // 侧栏
    hello: 'Hello, I\'m',
    name: 'Yang Li',
    tagline: 'AI-driven development · Full-stack delivery across frontend, backend & DevOps',
    chipAI: 'AI Development Workflow',
    chipAgent: 'AI Coding · Agent Research',
    navAbout: 'About',
    navExperience: 'Experience',
    navProjects: 'Projects',
    navSkills: 'Tech Stack',
    navEducation: 'Education',
    labelBorn: 'Born',
    bornValue: 'June 1991',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    phoneTitle: 'Click to copy',
    linkScaffolding: 'Scaffolding Templates',
    themeAria: 'Toggle light/dark theme',
    avatarAlt: 'Yang Li avatar',
    // 关于我
    aboutTitle: 'About Me',
    aboutLead: 'Proven across projects in multiple industries. <strong>AI is embedded deeply across the entire R&amp;D lifecycle</strong> — requirement breakdown, solution design, AI-assisted coding, refactoring, debugging and performance tuning; I deliver independently across frontend, backend and DevOps. I turn complex business needs into practical technical solutions — a problem solver and a knowledge sharer.',
    advAI: 'AI Engineering',
    advAIDesc: 'AI embedded across requirement breakdown, coding, refactoring and debugging; hands-on with Agent research, LoRA fine-tuning, Open WebUI / RAG.',
    advFE: 'Frontend',
    advFEDesc: 'Proficient in Vue3 + TS; React, Angular and qiankun micro-frontends; in-house component libraries / scaffolding; uniapp cross-platform.',
    advBE: 'Backend',
    advBEDesc: '50+ standardized APIs delivered independently with Node.js / Python / Java; MySQL design and optimization.',
    advOps: 'DevOps & Security',
    advOpsDesc: 'Nginx / Linux deployment and multi-environment releases; RSA / XSS / MLPS security compliance.',
    advOther: 'Industry & More',
    advOtherDesc: 'Years of government & enterprise delivery; GIS visualization; managed teams of 3–6.',
    // 工作经历
    expTitle: 'Work Experience',
    job1Role: 'Frontend Lead',
    job1Org: '| Hubei Che\'anda Information Technology Co., Ltd.',
    job1b1: 'Led unified technical architecture governance for 10+ government & enterprise platforms; delivered the Vue3 + TS upgrade, coding standards and engineering system.',
    job1b2: 'Led the shared business component library: dynamic forms, permission selectors, org trees, batch import/export and other highly reusable modules.',
    job1b3: 'Built a security protection system: RSA dynamic public-key encryption, XSS protection and captcha improvements, meeting MLPS and government compliance requirements.',
    job1b4: 'Map performance initiative: fixed Baidu Map memory leaks, optimized marker clustering and track rendering, keeping 20+ regional sub-projects stable.',
    job1b5: 'Owned requirement reviews, task breakdown, risk control, production incident response and technical hiring.',
    job2Role: 'Senior Frontend Engineer',
    job2Org: '| Hubei Haichuang Zhiyun Technology Co., Ltd.',
    job2b1: 'Led the Vue3 + TS and micro-frontend architecture upgrade; built shared component library, utility library and scaffolding, unifying standards across 11 sub-projects.',
    job2b2: 'Drove end-to-end delivery of the H145 knowledge management system: 11 subsystems including task workflow, knowledge management and discussion center.',
    job2b3: 'Contributed to core R&D of the low-code platform, owning solution design for complex scenarios and tackling hard technical problems.',
    job2b4: 'Organized code reviews, tech sharing and onboarding; responsible for technical hiring.',
    job3Role: 'Web Frontend / Node Backend',
    job3Org: '| Jiangxi Yunyan Dashijie Technology Co., Ltd.',
    job3b1: 'Led the React + qiankun micro-frontend migration, splitting a monolith into 80+ micro-apps and building the host shell and shared dependency system.',
    job3b2: 'Built the npm shared library, business component library and Webpack build optimization, raising the team\'s engineering capability.',
    job3b3: 'Owned GIS maps, ECharts/D3 data visualization and big-data visualization platform R&D (structured analytics of faces / license plates).',
    job3b4: 'Independently handled uniapp mini-program development, integration, release and maintenance; developed 50+ Node.js server-side APIs.',
    job4Role: 'Web Frontend / Node Backend',
    job4Org: '| Shanghai Honglian Network Technology Co., Ltd.',
    job4b1: 'Developed and maintained browser plugins, Chrome extensions and the foundational service platform (licensing / updates / crash center).',
    job4b2: 'Built Node services for cloud storage upload, email alerts and crash log collection.',
    job4b3: 'Wrote Python automation scripts supporting on-site delivery of forensics projects.',
    // 项目经验
    projTitle: 'Projects',
    p1Title: 'Hubei Third-Party Monitoring Platform',
    p1Tag: 'Hubei Che\'anda · GIS Visualization',
    p1Desc: 'Video-based road monitoring platform (spun off into 20 regional projects including Huanggang, Jiangling and Guangxi).',
    p1b1: 'Owned overall architecture design, technology selection and standards, driving Vue3 + TS adoption.',
    p1b2: 'Implemented complex ECharts/D3 data visualization, big-data computation and rendering optimization.',
    p1b3: 'Deeply optimized AMap / Baidu Maps, solving memory leaks, lag and massive marker display issues.',
    p1b4: 'Coordinated requirements, scheduling, integration, release and production support, ensuring parallel delivery of multiple projects.',
    p1b5: 'Maintained and developed 6 WeChat mini-programs (uniapp).',
    p1b6: 'Completed secondary development of a backend admin project based on the RuoYi-Vue scaffold.',
    p1Stack: 'Vue3 · TS · ECharts/D3 · AMap/Baidu Maps · uniapp · RuoYi-Vue',
    p2Title: 'IoT Asset Management System',
    p2Tag: 'Hubei Che\'anda · IoT',
    p2Desc: 'An IoT device lifecycle management platform built on JeecgBoot + Vue2 + Ant Design Vue, covering 11 business modules including work orders, materials, inventory, finance, reporting, traceability and data auditing.',
    p2b1: 'Owned iteration and bug fixing for core modules: work orders, system settings, inventory and business documents.',
    p2b2: 'Designed core business logic including inventory ID numbering and work-order flow; implemented login security improvements; delivered 60+ feature developments and optimizations, ensuring a closed business loop.',
    p2b3: 'Owned global UI/UX improvements, including ICP filing compliance on the login page, view style standards, upload component stability rollback and remarks field limits, enhancing overall UX.',
    p2Stack: 'JeecgBoot · Vue2 · Ant Design Vue',
    p3Title: 'Knowledge Management System',
    p3Tag: 'Hubei Haichuang Zhiyun · Knowledge Management',
    p3Desc: 'A government & enterprise knowledge management project with 11 subsystems: task workflow, knowledge management, discussion center, sensitive-word management, knowledge center and more.',
    p3b1: 'Owned Vue3 project planning, task breakdown, progress control and quality assurance.',
    p3b2: 'Built the component library, utility library and project scaffolding, boosting team efficiency.',
    p3b3: 'Resolved key compatibility, performance and security issues; completed acceptance and delivery.',
    p3Stack: 'Vue3 · TS · Component Library · Scaffolding · Low-code Platform',
    p4Title: 'Video Big Data Platform',
    p4Tag: 'Yunyan Dashijie · Video Big Data · 2020.12 - 2022.09',
    p4Desc: 'An open professional video big-data analytics tool for public security users: mass video structured analytics, RFID / Wi-Fi multi-dimensional sensing data cleaning and aggregation, GIS-based visual retrieval, relationship inference, wanted-vehicle control and more — progressively providing big-data support for proactive prevention and control.',
    p4b1: 'Owned frontend technology selection and task assignment.',
    p4b2: 'Built resource situation, resource retrieval and O&M pages with Angular + TypeScript + NPGIS + Layer.',
    p4b3: 'Owned data configuration and rendering for all ECharts charts in the project.',
    p4b4: 'Initialized the map view, called NPGIS APIs to add layers and placed devices by coordinates.',
    p4b5: 'Used Node.js for data processing and exposed results to the frontend via APIs.',
    p4Stack: 'Angular · TypeScript · NPGIS · Layer · ECharts · Node.js',
    p5Title: 'Smart City Community',
    p5Tag: 'Yunyan Dashijie · Video Big Data',
    p5Desc: 'A video big-data analytics platform enabling visual analysis of structured face, pedestrian and license-plate data.',
    p5b1: 'Led the React + qiankun micro-frontend upgrade, building the host shell and shared component library.',
    p5b2: 'Split the monolith into 80+ micro-app modules and joined multi-version iterations.',
    p5b3: 'Developed and maintained WeChat mini-programs with uniapp + Vue.',
    p5Stack: 'React · qiankun · uniapp · Vue',
    p6Title: 'Contactless Device Platform',
    p6Tag: 'Yunyan Dashijie · Counter-Espionage',
    p6Desc: 'A counter-espionage device management platform supporting device onboarding, protocol restoration, data retention and query retrieval.',
    p6b1: 'Independently owned the full 0-to-1 development: requirement breakdown, prototyping and technical solution delivery.',
    p6b2: 'Built 10+ business pages with the Vue2 stack, implementing interactions and page maintenance.',
    p6b3: 'Built the backend with Node.js + Koa, encapsulating routing and interceptors, and developed 50+ standardized APIs.',
    p6b4: 'Designed and implemented a generic SQL query plugin, improving query efficiency and extensibility.',
    p6b5: 'Developed ECharts and D3 data visualization modules for multi-dimensional charts.',
    p6b6: 'Developed GIS map features with Leaflet and ArcGIS, covering marker rendering and layer interactions.',
    p6Stack: 'Vue2 · Node.js + Koa · ECharts/D3 · Leaflet · ArcGIS',
    p7Title: '4G Base Station Data Analytics Platform',
    p7Tag: 'Yunyan Dashijie · Telecom Big Data · 2017.07 - 2020.06',
    p7Desc: 'A 4G base-station data analytics platform for multi-dimensional computation, filtering and visual analysis of base-station data.',
    p7b1: 'Developed and maintained the map / chart modules.',
    p7b2: 'Built chart page modules with ECharts and D3.',
    p7b3: 'Built map page modules with Leaflet and ArcGIS.',
    p7b4: 'Performed relatively complex data computation, filtering and visualization.',
    p7b5: 'Fixed other frontend bugs and implemented new requirements.',
    p7Stack: 'ECharts · D3 · Leaflet · ArcGIS',
    p8Title: 'Foundational Services (Licensing / Update / Crash Center)',
    p8Tag: 'Shanghai Honglian · Foundational Services · 2014.07 - 2017.04',
    p8Desc: 'Company foundational service platform shared by ~10 software products: the licensing server manages users and is the login platform for all company software and websites; the update server delivers the latest versions; the crash center records crash logs and notifies the responsible developers.',
    p8b1: 'Refactored website code and developed new requirements.',
    p8b2: 'Implemented two upload modes for the update server: Qiniu cloud upload and local upload.',
    p8b3: 'Built the email module with multer to remind users before software licenses expire.',
    p8b4: 'Wrapped the Qiniu API with qiniu-sdk-node for upload and download.',
    p8b5: 'Added pages for uploading software packages and package charts, implementing package management.',
    p8b6: 'Built the full email sending module with multer, notifying responsible developers when software crashes.',
    p8Stack: 'Node.js · Express · multer · Qiniu SDK · Email Service',
    p9Title: 'Wangjing (Web Forensics Tool)',
    p9Tag: 'Shanghai Honglian · Forensics',
    p9Desc: 'An internet website forensics and preservation tool supporting webpage mirroring, screenshots, hash calculation and inspection report generation.',
    p9b1: 'Developed the browser plugin and wrote forensics scripts for webpage data capture.',
    p9b2: 'Customized scripts per customer needs and provided on-site technical support and delivery.',
    p9b3: 'Wrote automation scripts in Python.',
    p9Stack: 'Chrome Extension · Python · Data Scraping',
    // 技术栈
    skillsTitle: 'Tech Stack',
    sgAI: 'AI Capabilities',
    tAIWorkflow: 'AI Coding Workflow',
    tReqDesign: 'Requirement Breakdown & Solution Design',
    tRefactor: 'Refactoring / Debugging',
    tAgent: 'Agent Mechanism Research',
    tLoRA: 'LoRA Fine-tuning',
    sgFE: 'Frontend',
    tQiankun: 'qiankun Micro-frontends',
    tUniapp: 'uniapp Cross-platform',
    tComponents: 'In-house Component Library',
    sgBE: 'Backend',
    sgOps: 'DevOps & Security',
    tLinux: 'Linux Deployment',
    tMultiEnv: 'Multi-environment Release',
    tRSA: 'RSA Encryption',
    tXSS: 'XSS Protection',
    tMLPS: 'MLPS Compliance',
    sgViz: 'Visualization / GIS',
    tMap: 'AMap / Baidu Maps',
    tDashboard: 'Dashboard Visualization',
    sgEng: 'Engineering / Efficiency',
    tScaffold: 'In-house Scaffolding',
    tPerf: 'Performance Optimization',
    // 教育经历
    eduTitle: 'Education',
    edu1School: 'Zhongnan University of Economics and Law',
    edu1Major: '· Finance',
    edu1Degree: '· Bachelor\'s',
    edu2School: 'Three Gorges Electric Power Vocational College',
    edu2Major: '· CNC Technology',
    edu2Degree: '· Associate',
    // 页脚
    footerText: '© 2026 Yang Li · Personal Online Resume · Pure static build hosted on GitHub Pages · Open to opportunities in AI / GIS visualization / big data'
  },

  // ---------- 中文（原简历文案） ----------
  zh: {
    // 侧栏
    hello: '你好，我是',
    name: '李洋',
    tagline: 'AI 驱动研发 · 前端 / 后端 / 运维全链路交付',
    chipAI: 'AI 研发工作流',
    chipAgent: 'AI 编码 · Agent 研究',
    navAbout: '关于我',
    navExperience: '工作经历',
    navProjects: '项目经验',
    navSkills: '技术栈',
    navEducation: '教育经历',
    labelBorn: '出生',
    bornValue: '1991 年 6 月',
    labelEmail: '邮箱',
    labelPhone: '手机',
    phoneTitle: '点击复制',
    linkScaffolding: '脚手架集合',
    themeAria: '切换深浅色主题',
    avatarAlt: '李洋 头像',
    // 关于我
    aboutTitle: '关于我',
    aboutLead: '经历多行业项目历练。<strong>把 AI 深度融入研发全流程</strong>——需求拆解、方案设计、智能编码、代码重构、缺陷排查、性能调优；前端、后端、运维全链路独立交付。擅长把复杂业务拆成可落地的技术方案，是问题的解决者，也是知识的传播者。',
    advAI: 'AI 工程化应用',
    advAIDesc: 'AI 深度融入需求拆解、编码、重构、排障全流程；实践 Agent 研究、LoRA 微调、Open WebUI / RAG。',
    advFE: '前端研发',
    advFEDesc: '精通 Vue3+TS；React、Angular、qiankun 微前端；组件库 / 脚手架自研、uniapp 多端。',
    advBE: '后端研发',
    advBEDesc: 'Node.js / Python / Java 独立交付 50+ 标准化 API；MySQL 设计与优化。',
    advOps: '运维与安全',
    advOpsDesc: 'Nginx / Linux 部署、多环境发布；RSA / XSS / 等保安全建设。',
    advOther: '行业与其它',
    advOtherDesc: '多年政企行业交付经验；GIS 可视化；3-6 人团队管理。',
    // 工作经历
    expTitle: '工作经历',
    job1Role: '前端负责人',
    job1Org: '| 湖北车安达信息科技有限公司',
    job1b1: '统筹 10+ 政企平台技术架构统一治理，基于 Vue3+TS 完成技术升级、编码规范与工程化体系落地。',
    job1b2: '主导通用业务组件库建设：动态表单、权限选择器、组织树、批量导入导出等高复用模块。',
    job1b3: '搭建安全防护体系：RSA 动态公钥加密、XSS 防护、验证码优化，满足等保与政企合规要求。',
    job1b4: '地图性能专项：解决百度地图内存泄漏，优化点位聚合与轨迹渲染，保障 20+ 区域子项目稳定运行。',
    job1b5: '负责需求评审、任务拆解、风险把控、线上故障兜底与技术岗位招聘。',
    job2Role: '高级前端工程师',
    job2Org: '| 湖北海创知芸科技有限公司',
    job2b1: '主导 Vue3+TS + 微前端架构升级，搭建公共组件库、工具库、脚手架，统一 11 个子项目技术标准。',
    job2b2: '牵头 H145 知识管理系统整体交付：任务流程、知识管理、研讨中心等 11 个子系统。',
    job2b3: '参与低代码平台核心研发，负责复杂场景方案设计与技术难点攻坚。',
    job2b4: '组织 CodeReview、技术分享、新人培训，负责技术岗位招聘。',
    job3Role: 'WEB 前端 / Node 后端',
    job3Org: '| 江西省云眼大视界科技有限公司',
    job3b1: '主导 React+qiankun 微前端改造，单体应用拆分为 80+ 微应用，搭建基座与公共依赖体系。',
    job3b2: '建设 npm 公共库、业务组件库与 Webpack 构建优化方案，提升团队工程化能力。',
    job3b3: '负责 GIS 地图、ECharts/D3 数据可视化、大数据可视化平台研发（人脸 / 车牌结构化研判）。',
    job3b4: '独立负责 uniapp 小程序开发、联调、发布与维护；Node.js 服务端 50+ API 开发。',
    job4Role: 'WEB 前端 / Node 后端',
    job4Org: '| 上海弘连网络科技有限公司',
    job4b1: '负责浏览器插件、Chrome 扩展、基础服务平台开发与维护（授权 / 更新 / 崩溃中心）。',
    job4b2: '基于 Node 实现云存储上传、邮件告警、崩溃日志收集等服务。',
    job4b3: '编写 Python 自动化脚本，支撑取证业务现场交付。',
    // 项目经验
    projTitle: '项目经验',
    p1Title: '湖北第三方监测平台',
    p1Tag: '湖北车安达 · GIS 可视化',
    p1Desc: '视频道路监控平台（衍生交付黄冈、江陵、广西等 20 个区域项目）。',
    p1b1: '负责整体架构设计、技术选型与规范制定，推动 Vue3+TS 体系落地。',
    p1b2: '实现 ECharts/D3 复杂数据可视化、大数据计算与渲染优化。',
    p1b3: '深度优化高德 / 百度地图，解决内存泄漏、卡顿、海量点位展示问题。',
    p1b4: '统筹需求、排期、联调、上线与线上问题处理，保障多项目并行交付。',
    p1b5: '6 个微信小程序的维护和开发（uniapp 框架）。',
    p1b6: '基于 RuoYi-Vue 脚手架完成一个后台管理项目的二次开发。',
    p1Stack: 'Vue3 · TS · ECharts/D3 · 高德/百度地图 · uniapp · RuoYi-Vue',
    p2Title: '物联网资产管理系统',
    p2Tag: '湖北车安达 · 物联网',
    p2Desc: '基于 JeecgBoot + Vue2 + Ant Design Vue 的物联网设备全生命周期管理平台，涵盖工单管理、物料管理、进销存、财务管理、报表中心、溯源追踪、数据审核等 11 个业务模块。',
    p2b1: '负责工单管理、系统设置、进销存、业务单据等核心模块的功能迭代与缺陷修复。',
    p2b2: '设计进销存 ID 编号、工单流转等核心业务逻辑，落实登录安全相关改造，累计完成 60+ 项业务功能开发优化，保障业务流程闭环。',
    p2b3: '负责项目全局 UI/UX 优化，包括登录页备案合规、查看样式规范、上传组件稳定性回退、备注字段限制等，提升系统整体用户体验。',
    p2Stack: 'JeecgBoot · Vue2 · Ant Design Vue',
    p3Title: '知识管理系统',
    p3Tag: '湖北海创知芸 · 知识管理',
    p3Desc: '政企知识管理项目，涵盖任务流程、知识管理、研讨中心、敏感词管理、知识中心等 11 个子系统。',
    p3b1: '负责 Vue3 项目整体规划、任务拆解、进度管控与质量保障。',
    p3b2: '搭建组件库、工具库与项目脚手架，提升团队开发效率。',
    p3b3: '攻克兼容、性能、安全等关键问题，完成项目验收交付。',
    p3Stack: 'Vue3 · TS · 组件库 · 脚手架 · 低代码平台',
    p4Title: '视频大数据平台',
    p4Tag: '云眼大视界 · 视频大数据 · 2020.12 - 2022.09',
    p4Desc: '面向公安多个行业用户的开放式专业视频大数据分析工具：提供海量视频结构化分析、RFID / Wi-Fi 多维感知数据清洗汇聚、基于 GIS 的可视化检索、关系推演分析、缉查布控等功能，逐步向事前预警防控提供大数据服务支撑。',
    p4b1: '负责前端项目技术选型与工作任务分配。',
    p4b2: '使用 Angular + TypeScript + NPGIS + Layer 完成资源态势、资源检索、运维管理等界面的构建与交互实现。',
    p4b3: '负责项目中所有 ECharts 图表的数据配置与展示。',
    p4b4: '初始化地图界面，调用 NPGIS 接口新增图层，根据坐标位置添加设备展示。',
    p4b5: '使用 Node 完成数据处理，通过接口返回给前端。',
    p4Stack: 'Angular · TypeScript · NPGIS · Layer · ECharts · Node.js',
    p5Title: '智慧城市社区',
    p5Tag: '云眼大视界 · 视频大数据',
    p5Desc: '视频大数据分析平台，实现人脸、人体、车牌结构化数据可视化研判。',
    p5b1: '负责 React + qiankun 微前端架构升级，搭建基座与公共组件库。',
    p5b2: '完成单体应用拆分为 80+ 微应用模块，参与多版本迭代开发。',
    p5b3: '负责 uniapp + Vue 微信小程序开发与维护。',
    p5Stack: 'React · qiankun · uniapp · Vue',
    p6Title: '非接设备',
    p6Tag: '云眼大视界 · 反窃密',
    p6Desc: '反窃密设备管理平台，支持设备接入、协议还原、数据留存与查询检索。',
    p6b1: '独立负责项目从 0 到 1 全流程开发，完成需求拆解、原型设计与技术方案落地。',
    p6b2: '基于 Vue2 全家桶开发 10+ 业务页面，实现交互逻辑与页面维护。',
    p6b3: '使用 Node.js + Koa 搭建后端工程，封装路由、拦截器，开发 50+ 标准化 API 接口。',
    p6b4: '设计并实现通用 SQL 查询插件，优化数据查询效率与业务扩展能力。',
    p6b5: '负责 ECharts、D3 数据可视化模块开发，实现多维数据图表展示。',
    p6b6: '基于 Leaflet、ArcGIS 开发 GIS 地图功能，完成点位渲染与图层交互。',
    p6Stack: 'Vue2 · Node.js + Koa · ECharts/D3 · Leaflet · ArcGIS',
    p7Title: '4G 基站数据分析平台',
    p7Tag: '云眼大视界 · 通信大数据 · 2017.07 - 2020.06',
    p7Desc: '4G 基站数据分析平台，对基站数据进行多维计算、过滤与可视化分析。',
    p7b1: '负责地图 / 图表模块的开发与维护。',
    p7b2: '使用 ECharts 和 D3 开发项目中的图表页面模块。',
    p7b3: '使用 Leaflet 和 ArcGIS 开发相关地图页面模块。',
    p7b4: '对数据进行较复杂的计算、过滤与可视化处理。',
    p7b5: '其他前端页面 Bug 修改与需求新增。',
    p7Stack: 'ECharts · D3 · Leaflet · ArcGIS',
    p8Title: '基础服务项目（授权 / 更新 / 崩溃中心）',
    p8Tag: '上海弘连 · 基础服务 · 2014.07 - 2017.04',
    p8Desc: '公司基础服务平台（10 个左右软件产品共用）：授权服务器是用户管理平台，公司所有软件以及网站的登录平台；更新服务器负责所有软件的最新版本更新；崩溃中心记录所有软件崩溃日志并发送信息给对应开发者。',
    p8b1: '负责网站代码重构以及新增需求开发。',
    p8b2: '对更新服务器上传功能分为七牛上传和本地上传两种方式。',
    p8b3: '使用 multer 编写邮件模块，软件快到期时给用户发送提醒邮件。',
    p8b4: '使用 qiniu-sdk-node 封装七牛 API，实现上传、下载等功能。',
    p8b5: '新增上传不同软件包以及软件包图表的页面，实现软件包管理功能。',
    p8b6: '使用 multer 编写整个邮件发送模块，软件崩溃时发送邮件到对应开发人员邮箱。',
    p8Stack: 'Node.js · Express · multer · 七牛 SDK · 邮件服务',
    p9Title: '网镜',
    p9Tag: '上海弘连 · 取证',
    p9Desc: '互联网网站取证固定工具，支持网页镜像、截图、哈希计算、勘验报告生成。',
    p9b1: '负责浏览器插件开发，编写取证脚本实现网页数据抓取。',
    p9b2: '根据客户需求定制脚本，提供现场技术支持与交付。',
    p9b3: '使用 Python 编写自动化处理脚本。',
    p9Stack: 'Chrome 插件 · Python · 数据抓取',
    // 技术栈
    skillsTitle: '技术栈',
    sgAI: 'AI 能力',
    tAIWorkflow: 'AI 编码工作流',
    tReqDesign: '需求拆解与方案设计',
    tRefactor: '代码重构 / 缺陷排查',
    tAgent: 'Agent 机制研究',
    tLoRA: 'LoRA 微调',
    sgFE: '前端开发',
    tQiankun: 'qiankun 微前端',
    tUniapp: 'uniapp 多端',
    tComponents: '自研组件库',
    sgBE: '后端开发',
    sgOps: '运维与安全',
    tLinux: 'Linux 部署',
    tMultiEnv: '多环境发布',
    tRSA: 'RSA 加密',
    tXSS: 'XSS 防护',
    tMLPS: '等保合规',
    sgViz: '可视化 / GIS',
    tMap: '高德 / 百度地图',
    tDashboard: '大屏可视化',
    sgEng: '工程化 / 效能',
    tScaffold: '脚手架自研',
    tPerf: '性能优化',
    // 教育经历
    eduTitle: '教育经历',
    edu1School: '中南财经政法大学',
    edu1Major: '· 金融学',
    edu1Degree: '· 本科',
    edu2School: '三峡电力职业学院',
    edu2Major: '· 数控技术',
    edu2Degree: '· 大专',
    // 页脚
    footerText: '© 2026 李洋 · 个人线上简历 · 纯静态构建，托管于 GitHub Pages · 欢迎交流 AI / GIS 可视化 / 大数据相关机会'
  }
};

// 页面级元信息（标题 / SEO 描述）：切换语言时同步更新
const PAGE_META = {
  en: {
    title: 'Yang Li · Resume',
    description: 'Yang Li — AI-driven R&D practice: AI tools deeply integrated into requirement breakdown, coding and troubleshooting; full-stack delivery across frontend, backend and DevOps; strong in GIS visualization and government/enterprise delivery.',
    lang: 'en'
  },
  zh: {
    title: '李洋 · 个人简历',
    description: '李洋，AI 驱动研发实践：AI 工具深度融入需求拆解、编码、排障；前端 / 后端 / 运维全链路交付，擅长 GIS 可视化与政企行业交付。',
    lang: 'zh-CN'
  }
};

// 各语言下界面操作提示文案（复制反馈 / 语言按钮 / 剪贴板降级提示）
const UI_TEXT = {
  en: {
    copied: '✓ Copied',
    copyFailed: 'Please copy manually',
    langButton: '中文',
    langAria: 'Switch to Chinese',
    langTitle: '切换到中文'
  },
  zh: {
    copied: '✓ 已复制',
    copyFailed: '请手动长按复制',
    langButton: 'English',
    langAria: 'Switch to English',
    langTitle: 'Switch to English'
  }
};

// 当前语言：默认英文（每次打开都是英文，不做持久化）
let currentLang = 'en';

// ==================== 语言切换 ====================
// 语言切换按钮（位于侧栏顶部）
const langToggle = document.getElementById('langToggle');

// 手机号元素（提前声明：applyLanguage 初始化时需同步其 title 提示）
const phoneEl = document.getElementById('phoneText');

/**
 * 应用指定语言：批量替换 data-i18n 文案 / 更新页面元信息 / 同步按钮与无障碍属性
 * @param {string} lang 语言标识：'en' | 'zh'
 */
const applyLanguage = (lang) => {
  currentLang = lang;
  const dict = I18N[lang];
  const meta = PAGE_META[lang];
  const ui = UI_TEXT[lang];

  // 1. 纯文本节点：直接替换 textContent（避免 HTML 注入）
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // 2. 含内联标签的段落（如 <strong>）：替换 innerHTML（文案表为可信自有内容）
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // 3. 无障碍 / 提示属性：aria-label、title、alt
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] !== undefined) el.setAttribute('title', dict[key]);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.getAttribute('data-i18n-alt');
    if (dict[key] !== undefined) el.setAttribute('alt', dict[key]);
  });

  // 4. 页面语言标记 / 标题 / SEO 描述
  document.documentElement.setAttribute('lang', meta.lang);
  document.title = meta.title;

  // SEO 描述
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', meta.description);

  // 社交分享卡片（Open Graph）
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', meta.description);

  // 5. 语言按钮：英文界面显示「中文」，中文界面显示「English」
  langToggle.textContent = ui.langButton;
  langToggle.setAttribute('aria-label', ui.langAria);
  langToggle.setAttribute('title', ui.langTitle);

  // 6. 手机号按钮提示同步为当前语言的「点击复制」
  phoneEl.setAttribute('title', dict.phoneTitle);
};

// 点击语言按钮：英文 ↔ 中文 互换
langToggle.addEventListener('click', () => {
  applyLanguage(currentLang === 'en' ? 'zh' : 'en');
});

// 初始化：默认英文（HTML 初始文案本身即英文，此处保证按钮/元信息状态一致）
applyLanguage('en');

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

/** 手机号显示文本（含分组空格，如 '153 7766 4773'） */
const phoneDisplay = phoneEl.textContent;

/** 手机号纯数字（复制到剪贴板的内容，便于直接拨号 / 粘贴表单） */
const phoneDigits = phoneDisplay.replace(/\s+/g, '');

// 点击手机号：复制纯数字并给出「已复制」反馈（反馈文案跟随当前语言）
phoneEl.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(phoneDigits);
    phoneEl.textContent = UI_TEXT[currentLang].copied;
    // 1.5 秒后恢复显示手机号（始终恢复为初始明文，避免连点导致文本丢失）
    setTimeout(() => { phoneEl.textContent = phoneDisplay; }, 1500);
  } catch (err) {
    // 剪贴板 API 不可用（如非 HTTPS 环境）时：自动选中号码文本，方便手动复制
    const range = document.createRange();
    range.selectNodeContents(phoneEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    phoneEl.title = UI_TEXT[currentLang].copyFailed;
  }
});
