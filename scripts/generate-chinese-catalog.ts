/**
 * 生成中文用户-facing 技能目录。
 * 工作流：
 * 1. 先运行 `./bin/hk-skill catalog` 生成英文原始目录（docs/catalog.md）。
 * 2. 运行本脚本读取原始目录，按场景分类并翻译成中文，写回 docs/catalog.md。
 * 3. 运行 `bun warehouse/adapted/baoyu-format-markdown/scripts/main.ts docs/catalog.md` 做排版。
 * 4. 运行 `bun run build:catalog` 生成 docs/catalog.html。
 */
import fs from 'fs';
import path from 'path';

const catalogPath = '/Users/kanehua/project/hk-skills/docs/catalog.md';
const listOutput = `/Users/kanehua/project/hk-skills/.tmp-skill-list.txt`;

// Generate skill list if not present
if (!fs.existsSync(listOutput)) {
  const { execSync } = require('child_process');
  const output = execSync('./bin/hk-skill list', { cwd: '/Users/kanehua/project/hk-skills', encoding: 'utf8' });
  fs.writeFileSync(listOutput, output);
}

// Parse catalog.md
const catalogContent = fs.readFileSync(catalogPath, 'utf8');
if (catalogContent.includes('## 内容创作')) {
  console.error('Error: docs/catalog.md 已经是中文目录。请先运行 `./bin/hk-skill catalog` 重新生成英文原始目录。');
  process.exit(1);
}
const sections = catalogContent.split(/^## /m).slice(1);
const skills: any[] = [];
for (const section of sections) {
  const lines = section.split('\n');
  const sectionName = lines[0].trim();
  const tableLines = lines.filter(l => l.startsWith('|') && !l.startsWith('| ---') && !l.startsWith('| 名称 '));
  for (const line of tableLines) {
    const cols = line.split('|').map(c => c.trim()).filter(c => c);
    if (cols.length >= 5) {
      skills.push({
        section: sectionName,
        name: cols[0],
        source: cols[1],
        status: cols[2],
        description: cols[3],
        triggers: cols[4]
      });
    }
  }
}

// Parse list output
const listContent = fs.readFileSync(listOutput, 'utf8');
const enabledMap: Record<string, boolean> = {};
for (const line of listContent.split('\n')) {
  const parts = line.trim().split(/\s+/);
  if (parts.length >= 4) {
    const name = parts[0];
    const enabled = parts[3];
    enabledMap[name] = enabled !== 'no';
  }
}

// Category mapping with Chinese descriptions
const categoryMap: Record<string, { category: string; desc: string; triggers?: string }> = {
  // 内容创作
  'article-analyzer': { category: '内容创作', desc: '对文章、论文、博客、报告等进行结构化深度分析，输出多模块 Markdown 理解文档。' },
  'blog-checker': { category: '内容创作', desc: '审阅并评估中文技术博客文章质量。' },
  'concept-fable': { category: '内容创作', desc: '用三段式寓言故事解释一个高阶领域概念，最后揭示并映射理论。' },
  'merge-drafts': { category: '内容创作', desc: '将多份草稿合并为一篇高质量文章。' },
  'subtext-article': { category: '内容创作', desc: '将字幕、转写稿、播客文稿等转写为忠实的长篇中文文章。' },
  'edit-article': { category: '内容创作', desc: '通过重组结构与润色语言来编辑和改进文章草稿。' },
  'ljg-read': { category: '内容创作', desc: '伴读任意文本，提供翻译、结构批注、深度提问与跨域洞察。' },
  'ljg-writes': { category: '内容创作', desc: '像手术刀一样逐层剖开观点，输出 1000-1500 字中文文章。' },
  'douban-dice-review': { category: '内容创作', desc: '用六个理论骰子为电影生成豆瓣风格中文影评。' },
  'ljg-book': { category: '内容创作', desc: '以问题为核心拆解一本书，输出结构分析、位移与预测。' },
  'ljg-paper': { category: '内容创作', desc: '用七幕故事线把学术论文讲给非学术读者听。' },
  'ljg-paper-flow': { category: '内容创作', desc: '读论文并一键生成分析文档与视觉笔记卡片。' },
  'ljg-paper-river': { category: '内容创作', desc: '递归追溯论文的引用脉络与学术演化史。' },
  'ljg-qa': { category: '内容创作', desc: '把文章/论文/书的核心观点抽取成要害 Q-A 对。' },
  'ljg-think': { category: '内容创作', desc: '纵向深钻一个观点、现象或问题，追到不可再分的本质。' },
  'ljg-rank': { category: '内容创作', desc: '给一个领域降维，找出支撑它的几根独立生成器。' },
  'ljg-learn': { category: '内容创作', desc: '从八个维度解剖一个概念，压缩成顿悟式理解。' },
  'ljg-word': { category: '内容创作', desc: '深度拆解一个英语单词的核心语义与用法。' },
  'ljg-word-flow': { category: '内容创作', desc: '英语单词深度分析 + 信息图卡片一键生成。' },
  'ljg-plain': { category: '内容创作', desc: '（ljg-skills 占位 skill）' },
  'writing-shape': { category: '内容创作', desc: '将 raw material 逐段塑造成一篇完整文章。' },
  'writing-beats': { category: '内容创作', desc: '把原始素材组装成一段有节奏的内容旅程。' },
  'writing-fragments': { category: '内容创作', desc: '从原始素材中挖掘碎片化灵感，暂不结构化。' },
  'idea-refine': { category: '内容创作', desc: '用发散与收敛思维把模糊想法打磨成清晰可执行概念。' },
  'grill-me': { category: '内容创作', desc: '通过犀利问答打磨计划或设计。' },
  'grill-with-docs': { category: '内容创作', desc: '在打磨计划的同时生成 ADR 与术语表文档。' },
  'grilling': { category: '内容创作', desc: '对用户计划或设计进行无情追问与压力测试。' },
  'prototype': { category: '内容创作', desc: '为设计问题快速搭建可丢弃的原型。' },
  'implement': { category: '内容创作', desc: '基于 PRD 或 issue 集实现一段具体工作。' },
  'planning-and-task-breakdown': { category: '内容创作', desc: '把明确需求拆分为可执行的有序任务。' },
  'ce-brainstorm': { category: '内容创作', desc: '通过协作对话探索需求与方案，输出合适体量的需求文档。' },
  'ce-ideate': { category: '内容创作', desc: '针对主题生成并批判性地评估扎根想法。' },
  'ce-plan': { category: '内容创作', desc: '为多步骤任务创建结构化计划，并可深化已有计划。' },
  'ce-strategy': { category: '内容创作', desc: '创建或维护 STRATEGY.md，明确产品目标、打法与关键指标。' },

  // 社交媒体
  'baoyu-post-to-wechat': { category: '社交媒体', desc: '通过 API 或 Chrome CDP 发布微信公众号文章/贴图。' },
  'baoyu-post-to-weibo': { category: '社交媒体', desc: '发微博、头条文章与多媒体内容。' },
  'baoyu-post-to-x': { category: '社交媒体', desc: '发布 X/Twitter 帖子与长文。' },
  'baoyu-youtube-transcript': { category: '社交媒体', desc: '下载 YouTube 字幕、翻译、章节与封面。' },
  'guizang-social-card-skill': { category: '社交媒体', desc: '从文章/脚本生成小红书图文与公众号封面套图。' },
  'ljg-card': { category: '社交媒体', desc: '把内容铸造成多种版式的 PNG 视觉卡片（阅读卡片、信息图、漫画、白板、小红书大字图等）。' },
  'ljg-present': { category: '社交媒体', desc: '按 outline 层级 1:1 生成色块大字风格的演讲 HTML。' },
  'ian-handdrawn-ppt': { category: '社交媒体', desc: '把文章/脚本/PDF 转成中文手绘技术讲解风格 PPT 图片。' },
  'visual-style-ppt': { category: '社交媒体', desc: '用 Image 2 生成风格驱动的图片版 PPTX。' },
  'pptx': { category: '社交媒体', desc: '创建、读取、编辑任何 .pptx 文件。' },
  'slack-gif-creator': { category: '社交媒体', desc: '创建适合 Slack 使用的动画 GIF。' },
  'internal-comms': { category: '社交媒体', desc: '撰写公司内部沟通文档（状态报告、领导更新、FAQ 等）。' },

  // 图像处理
  'baoyu-article-illustrator': { category: '图像处理', desc: '分析文章结构并为文章生成 Type × Style × Palette 三维配图。' },
  'baoyu-comic': { category: '图像处理', desc: '生成多种风格与调性的知识教育漫画。' },
  'baoyu-cover-image': { category: '图像处理', desc: '生成文章封面图，支持 5 维度组合与多种画幅。' },
  'baoyu-danger-gemini-web': { category: '图像处理', desc: '通过逆向工程 Gemini Web API 生成图像与文本，支持多轮对话。' },
  'baoyu-infographic': { category: '图像处理', desc: '用 21 种布局 × 22 种视觉风格生成专业信息图。' },
  'baoyu-compress-image': { category: '图像处理', desc: '将图片压缩为 WebP/PNG 并自动选择工具。' },
  'baoyu-diagram': { category: '图像处理', desc: '创建专业深色 SVG 架构图、流程图、时序图、思维导图等。' },
  'baoyu-design': { category: '图像处理', desc: '生成 UI 原型、落地页、Dashboard、PPT 等自包含 HTML 设计稿。' },
  'algorithmic-art': { category: '图像处理', desc: '用 p5.js 创作算法艺术、粒子系统与流场。' },
  'brand-guidelines': { category: '图像处理', desc: '将 Anthropic 品牌色与字体应用到各类视觉产物。' },
  'canvas-design': { category: '图像处理', desc: '用设计哲学创作 PNG/PDF 静态视觉作品。' },
  'comic-ip-onboarder': { category: '图像处理', desc: '把照片/玩偶/头像接入简约漫画信息图体系，生成 IP DNA 档案。' },
  'gpt-image-2': { category: '图像处理', desc: '面向 GPT Image 2 的图像生成/编辑技能，覆盖 18 大类 80+ 模板。' },
  'ce-gemini-imagegen': { category: '图像处理', desc: '用 Gemini API 生成与编辑图像，支持文生图、图编辑、风格迁移。' },
  'ian-xiaohei-illustrations': { category: '图像处理', desc: '生成 Ian「小黑」风格的中文正文配图。' },
  'ian-xiaohei-scenes': { category: '图像处理', desc: '生成「小黑 + 真实物件 + 物理动作」的中文场景配图或长卷故事图。' },
  'architecture-diagram': { category: '图像处理', desc: '创建深色主题的自包含 HTML+SVG 架构图。' },
  'lanshu-animated-architecture-diagram': { category: '图像处理', desc: '创建岚叔风格手绘动态架构/流程 GIF，附带可编辑 .excalidraw 与静态预览。' },
  'pixel2motion': { category: '图像处理', desc: '将栅格 logo 转为极简 SVG 并生成迪士尼原则驱动的 logo 动画 HTML。' },
  'theme-factory': { category: '图像处理', desc: '为幻灯片、文档、落地页等产物应用或生成主题。' },

  // 网页设计
  'web-design': { category: '网页设计', desc: '从 PRD/参考 URL/截图生成 DESIGN.md 并据此产出达标 web 代码。' },
  'web-design-engineer': { category: '网页设计', desc: '用 HTML/CSS/JS/React 构建精致的可视化 web 产物。' },
  'web-design-guidelines': { category: '网页设计', desc: '审查 UI 代码是否符合 Web Interface Guidelines。' },
  'frontend-ui-engineering': { category: '网页设计', desc: '构建生产级用户界面组件与布局。' },
  'frontend-design': { category: '网页设计', desc: '为新建或重塑 UI 提供有辨识度的视觉设计指导。' },
  'ce-frontend-design': { category: '网页设计', desc: '打造有真实设计品质的网页界面，并用截图验证结果。' },
  'html-ppt': { category: '网页设计', desc: '用模板驱动生成多种风格、可键盘导航的静态 HTML 演示稿。' },
  'guizang-ppt-skill': { category: '网页设计', desc: '生成横向翻页网页 PPT，含 WebGL 背景与杂志/瑞士风两种风格。' },
  'baoyu-slide-deck': { category: '网页设计', desc: '从内容生成专业幻灯片图片。' },
  'baoyu-markdown-to-html': { category: '网页设计', desc: '将 Markdown 转换为带微信兼容主题的样式化 HTML。' },
  'web-artifacts-builder': { category: '网页设计', desc: '用 React、Tailwind、shadcn/ui 创建复杂多组件 Claude artifacts。' },
  'web-video-presentation': { category: '网页设计', desc: '把文章/口播稿做成点击驱动的 16:9 网页演示，可合成音频。' },
  'webapp-testing': { category: '网页设计', desc: '用 Playwright 与本地 web 应用交互、截图、调试与验证。' },

  // 开发辅助
  'using-agent-skills': { category: '开发辅助', desc: '发现与调用当前可用的 Agent Skills（元技能）。' },
  'skill-creator': { category: '开发辅助', desc: '创建、修改、优化 Skills 并运行评测。' },
  'mcp-builder': { category: '开发辅助', desc: '创建高质量 MCP Server 以让 LLM 调用外部服务。' },
  'ce-agent-native-architecture': { category: '开发辅助', desc: '设计 Agent 作为一等公民的应用架构。' },
  'ce-agent-native-audit': { category: '开发辅助', desc: '对 Agent-Native 架构进行评分式全面审查。' },
  'ce-work': { category: '开发辅助', desc: '高效执行开发任务并保证质量、完成功能。' },
  'ce-work-beta': { category: '开发辅助', desc: 'ce-work 实验版，支持外部代理委托以节省 token。' },
  'ce-setup': { category: '开发辅助', desc: '诊断并配置 compound-engineering 环境依赖。' },
  'ce-update': { category: '开发辅助', desc: '检查 compound-engineering 插件是否需要更新。' },
  'lfg': { category: '开发辅助', desc: '端到端自主工程流水线：计划、实现、Review、测试、提交、PR、CI 看守。' },
  'ce-commit': { category: '开发辅助', desc: '用清晰、价值导向的信息创建 git commit。' },
  'ce-commit-push-pr': { category: '开发辅助', desc: '提交、推送并打开价值优先的自适应 PR。' },
  'ce-clean-gone-branches': { category: '开发辅助', desc: '清理远程已不存在的本地分支及其 worktree。' },
  'ce-worktree': { category: '开发辅助', desc: '确保工作在隔离的 git worktree 中不干扰当前 checkout。' },
  'ce-demo-reel': { category: '开发辅助', desc: '为 PR 描述捕获 GIF、终端录屏或截图形式的演示证据。' },
  'ce-product-pulse': { category: '开发辅助', desc: '生成时间窗口内的产品使用与质量脉搏报告。' },
  'ce-slack-research': { category: '开发辅助', desc: '搜索 Slack 并产出组织上下文合成研究报告。' },
  'ce-sessions': { category: '开发辅助', desc: '跨 Claude Code/Codex/Cursor 搜索历史会话并回答问题。' },
  'ce-riffrec-feedback-analysis': { category: '开发辅助', desc: '处理 Riffrec 产品反馈包（录屏+事件+json）。' },
  'ce-compound': { category: '开发辅助', desc: '将最近解决的问题沉淀为团队知识或 CONCEPTS.md 词条。' },
  'ce-compound-refresh': { category: '开发辅助', desc: '审查 docs/solutions/ 下的学习文档并更新/合并/删除漂移内容。' },
  'ce-proof': { category: '开发辅助', desc: '通过 Proof API 发布、查看、评论与编辑 Markdown。' },
  'ce-release-notes': { category: '开发辅助', desc: '汇总 compound-engineering 插件近期发布说明。' },
  'ce-report-bug': { category: '开发辅助', desc: '向 compound-engineering 插件报告 bug。' },
  'ask-matt': { category: '开发辅助', desc: '判断当前情境适合调用哪个 skill 的路由器。' },
  'handoff': { category: '开发辅助', desc: '将当前对话压缩为交接文档供其他代理继续。' },
  'teach': { category: '开发辅助', desc: '在工作空间内教会用户一项新技能或概念。' },
  'release-skills': { category: '开发辅助', desc: '通用发布工作流，支持版本号、Changelog、GitHub Release 等。' },
  'shipping-and-launch': { category: '开发辅助', desc: '准备生产发布，提供预发布检查单、监控与回滚策略。' },
  'skill-installer': { category: '开发辅助', desc: '将第三方远程 skill 暂存到 remote/ 区域并适配到 skills/。' },
  'skill-optimizer': { category: '开发辅助', desc: '审计、评估并改进 Agent Skill。' },
  'skill-evaluator': { category: '开发辅助', desc: '为 Agent Skill 建立运行时测评体系（用例、评分、基线、报告）。' },
  'it-system-skill-distiller': { category: '开发辅助', desc: '将 IT 业务系统/源码/API 逆向蒸馏为 AI 可调用的 Skills 技能包。' },
  'request-refactor-plan': { category: '开发辅助', desc: '通过用户访谈生成详细重构计划并提交为 GitHub issue。' },
  'HeavySkill': { category: '开发辅助', desc: '（占位 skill，暂无描述）' },

  // 代码质量
  'code-review-and-quality': { category: '代码质量', desc: '在合并前进行多维度代码审查。' },
  'code-simplification': { category: '代码质量', desc: '在不改变行为的前提下简化代码提升可读性。' },
  'debugging-and-error-recovery': { category: '代码质量', desc: '系统性地定位并修复错误根因。' },
  'test-driven-development': { category: '代码质量', desc: '在实现逻辑、修复 bug、变更行为时以测试驱动开发。' },
  'tdd': { category: '代码质量', desc: '测试驱动开发与集成测试。' },
  'incremental-implementation': { category: '代码质量', desc: '将跨多文件的改动增量交付。' },
  'performance-optimization': { category: '代码质量', desc: '优化应用性能与 Core Web Vitals。' },
  'security-and-hardening': { category: '代码质量', desc: '加固代码以防御用户输入、认证、数据存储等风险。' },
  'git-workflow-and-versioning': { category: '代码质量', desc: '规范 commit、分支、冲突与并行工作流。' },
  'git-guardrails-claude-code': { category: '代码质量', desc: '为 Claude Code 设置危险 git 命令拦截钩子。' },
  'setup-pre-commit': { category: '代码质量', desc: '配置 Husky + lint-staged 预提交钩子。' },
  'migrate-to-shoehorn': { category: '代码质量', desc: '将测试中的 `as` 断言迁移到 @total-typescript/shoehorn。' },
  'ci-cd-and-automation': { category: '代码质量', desc: '自动化 CI/CD 流水线与部署策略。' },
  'browser-testing-with-devtools': { category: '代码质量', desc: '通过 Chrome DevTools MCP 在真实浏览器中测试与调试。' },
  'ce-debug': { category: '代码质量', desc: '系统化定位根因并修复 bug。' },
  'ce-code-review': { category: '代码质量', desc: '用分层人格代理做结构化代码审查并自动应用安全修复。' },
  'ce-dhh-rails-style': { category: '代码质量', desc: '以 DHH/37signals 风格编写 Ruby on Rails 代码。' },
  'ce-resolve-pr-feedback': { category: '代码质量', desc: '评估并并行修复 PR 审查反馈。' },
  'ce-simplify-code': { category: '代码质量', desc: '简化近期改动代码以提升清晰度、复用与效率。' },
  'ce-test-browser': { category: '代码质量', desc: '针对当前 PR 或分支运行浏览器测试。' },
  'ce-test-xcode': { category: '代码质量', desc: '在模拟器上构建并测试 iOS 应用。' },
  'ce-dogfood-beta': { category: '代码质量', desc: '[BETA] 以 QA 视角端到端 dogfood 当前分支并修复问题。' },
  'ce-optimize': { category: '代码质量', desc: '定义可测目标、并行实验、择优收敛的迭代优化循环。' },
  'api-and-interface-design': { category: '代码质量', desc: '指导稳定的 API 与模块接口设计。' },
  'design-an-interface': { category: '代码质量', desc: '用并行子代理为一个模块生成多种截然不同的接口设计。' },
  'codebase-design': { category: '代码质量', desc: '为深度模块设计提供共享词汇与指导。' },
  'domain-modeling': { category: '代码质量', desc: '构建并打磨项目的领域模型与统一语言。' },
  'diagnosing-bugs': { category: '代码质量', desc: '针对棘手 bug 与性能回退的诊断循环。' },
  'resolving-merge-conflicts': { category: '代码质量', desc: '解决进行中的 git merge/rebase 冲突。' },
  'scaffold-exercises': { category: '代码质量', desc: '创建带章节、题目、解答与讲解的习题目录结构。' },
  'setup-matt-pocock-skills': { category: '代码质量', desc: '为工程 skills 配置 issue tracker、标签与领域文档布局。' },
  'triage': { category: '代码质量', desc: '将 issue 与外部 PR 按分类、验证、grill、brief 状态机推进。' },
  'decision-mapping': { category: '代码质量', desc: '把松散想法变成可依次推进的调查 ticket 地图。' },
  'review': { category: '代码质量', desc: '从固定基准点Review 改动的 Standards 与 Spec 两个维度。' },
  'deprecation-and-migration': { category: '代码质量', desc: '管理旧系统、API 与功能的弃用和迁移。' },
  'source-driven-development': { category: '代码质量', desc: '以官方文档为依据做实现决策。' },
  'spec-driven-development': { category: '代码质量', desc: '在启动新项目/功能前创建规范。' },
  'context-engineering': { category: '代码质量', desc: '优化 Agent 上下文配置与规则文件。' },
  'claude-api': { category: '代码质量', desc: 'Claude API / Anthropic SDK 参考。' },
  'qa': { category: '代码质量', desc: '以对话方式报告 bug 并自动创建 GitHub issue。' },
  'improve-codebase-architecture': { category: '代码质量', desc: '扫描代码库中的深化机会并生成可视化 HTML 报告。' },
  'ce-doc-review': { category: '代码质量', desc: '用并行人格代理审查需求或计划文档。' },
  'ce-polish': { category: '代码质量', desc: '启动 dev server 并在浏览器中迭代打磨功能。' },
  'to-issues': { category: '代码质量', desc: '将计划/规范拆分为可独立领取的 tracer-bullet issue。' },
  'to-prd': { category: '代码质量', desc: '将当前对话合成为 PRD 并发布到项目 issue tracker。' },
  'ubiquitous-language': { category: '代码质量', desc: '从对话中提取 DDD 统一语言词汇表并保存。' },

  // 文档沟通
  'doc-coauthoring': { category: '文档沟通', desc: '引导用户完成文档/提案/技术规范的协作撰写。' },
  'documentation-and-adrs': { category: '文档沟通', desc: '记录架构决策、公共 API 变更与功能上下文。' },
  'docx': { category: '文档沟通', desc: '创建、读取、编辑 Word 文档（.docx）。' },
  'xlsx': { category: '文档沟通', desc: '创建、读取、编辑电子表格（.xlsx/.csv/.tsv）。' },
  'pdf': { category: '文档沟通', desc: '读取、合并、拆分、旋转、OCR、填表等任意 PDF 操作。' },
  'baoyu-translate': { category: '文档沟通', desc: '多模式（快/标准/精翻）中英翻译，支持术语表。' },
  'baoyu-url-to-markdown': { category: '文档沟通', desc: '抓取任意 URL 并转换为 Markdown。' },
  'baoyu-format-markdown': { category: '文档沟通', desc: '为 Markdown 添加 frontmatter、标题、加粗、列表与代码块格式。' },
  'prompt-optimizer': { category: '文档沟通', desc: '将模糊需求编译成工业级结构化 prompt。' },
  'baoyu-danger-x-to-markdown': { category: '文档沟通', desc: '将 X/Twitter 推文与文章转换为带 YAML frontmatter 的 Markdown。' },
  'baoyu-markdown-to-html': { category: '文档沟通', desc: '将 Markdown 转为带微信兼容主题的样式化 HTML。' },
  'internal-comms': { category: '文档沟通', desc: '撰写公司内部沟通文档。' },
  'ce-promote': { category: '文档沟通', desc: '为新功能起草面向用户的公告与营销文案。' },
  'ce-release-notes': { category: '文档沟通', desc: '汇总 compound-engineering 插件近期发布说明。' },
  'writing-great-skills': { category: '文档沟通', desc: '编写与编辑高质量 Skills 的参考指南。' },

  // 知识管理
  'obsidian-vault': { category: '知识管理', desc: '在 Obsidian 知识库中搜索、创建与管理笔记。' },
  'kb-retriever': { category: '知识管理', desc: '面向本地知识库目录的渐进式检索与问答。' },
  'ima-skill': { category: '知识管理', desc: '通过 IMA OpenAPI 管理笔记与知识库。' },
  'weread-skills': { category: '知识管理', desc: '微信读书助手：搜书、书架、笔记、书评、阅读统计。' },
  'ljg-skill-map': { category: '知识管理', desc: '（ljg-skills 占位 skill）' },
  'ljg-push': { category: '知识管理', desc: '将本地 ljg-* skills 同步到 GitHub repo 的 master/md 分支。' },
  'ljg-relationship': { category: '知识管理', desc: '用结构诊断与精神分析深度理解人际关系问题。' },
  'ljg-roundtable': { category: '知识管理', desc: '组织多视角结构化圆桌辩论探索话题。' },
  'ljg-travel': { category: '知识管理', desc: '为城市生成博物馆与古建深度旅行研究文档与参考卡片。' },
  'ljg-invest': { category: '知识管理', desc: '生成以「秩序创造机器」为核心的深度投资分析报告。' },
  'session-achieve': { category: '知识管理', desc: '复盘多轮对话，提取纠偏逻辑并沉淀黄金提示词。' },
  'serenity-skill': { category: '知识管理', desc: '把投资代理变成供应链瓶颈猎人，做溯源研究与股票筛选。' },

  // Vercel 生态
  'deploy-to-vercel': { category: 'Vercel 生态', desc: '将应用与网站部署到 Vercel。' },
  'vercel-cli-with-tokens': { category: 'Vercel 生态', desc: '用 Token 认证通过 Vercel CLI 部署与管理项目。' },
  'vercel-composition-patterns': { category: 'Vercel 生态', desc: 'React 组合模式与组件库设计。' },
  'vercel-react-best-practices': { category: 'Vercel 生态', desc: 'React 与 Next.js 性能优化最佳实践。' },
  'vercel-react-native-skills': { category: 'Vercel 生态', desc: 'React Native 与 Expo 高性能移动开发最佳实践。' },
  'vercel-react-view-transitions': { category: 'Vercel 生态', desc: '使用 React View Transition API 实现原生感页面/元素动画。' },
};

const categoriesOrder = [
  '内容创作',
  '社交媒体',
  '图像处理',
  '网页设计',
  '开发辅助',
  '代码质量',
  '文档沟通',
  '知识管理',
  'Vercel 生态'
];

// Build grouped structure
const grouped: Record<string, any[]> = {};
for (const cat of categoriesOrder) grouped[cat] = [];
const uncategorized: any[] = [];

for (const skill of skills) {
  const info = categoryMap[skill.name];
  if (!info) {
    uncategorized.push(skill);
    continue;
  }
  const enabled = enabledMap[skill.name] ?? false;
  const sourceLabel = skill.section === 'Local' ? '本地' : '远程';
  grouped[info.category].push({
    ...skill,
    chineseDesc: info.desc,
    sourceLabel,
    enabled
  });
}

if (uncategorized.length) {
  console.warn('Uncategorized skills:', uncategorized.map(s => s.name).join(', '));
}

// Generate markdown
let md = `---
title: "HK-Skills 技能目录"
description: "按使用场景整理的中文技能目录，保留英文触发关键词。"
---

# HK-Skills 技能目录

> 本目录按实际使用场景重新组织，每个技能保留英文触发关键词，便于 Agent 匹配。  
> 状态说明：**✅ 已启用** | **⏸️ 未启用**

`;

for (const cat of categoriesOrder) {
  const items = grouped[cat];
  if (!items.length) continue;
  items.sort((a, b) => {
    if (a.enabled !== b.enabled) return a.enabled ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  md += `## ${cat}\n\n`;
  md += '| 状态 | 技能名称 | 来源 | 说明 | 触发关键词 |\n';
  md += '| --- | --- | --- | --- | --- |\n';
  for (const item of items) {
    const status = item.enabled ? '✅' : '⏸️';
    const triggers = item.triggers.replace(/\|/g, '\\|').substring(0, 120);
    const desc = item.chineseDesc.replace(/\|/g, '\\|');
    md += `| ${status} | ${item.name} | ${item.sourceLabel} | ${desc} | ${triggers} |\n`;
  }
  md += '\n';
}

if (uncategorized.length) {
  md += '## 未分类\n\n';
  md += '| 状态 | 技能名称 | 来源 | 说明 | 触发关键词 |\n';
  md += '| --- | --- | --- | --- | --- |\n';
  for (const item of uncategorized) {
    const enabled = enabledMap[item.name] ?? false;
    const status = enabled ? '✅' : '⏸️';
    const sourceLabel = item.section === 'Local' ? '本地' : '远程';
    const desc = item.description.replace(/\|/g, '\\|').substring(0, 100);
    const triggers = item.triggers.replace(/\|/g, '\\|').substring(0, 120);
    md += `| ${status} | ${item.name} | ${sourceLabel} | ${desc} | ${triggers} |\n`;
  }
  md += '\n';
}

fs.writeFileSync(catalogPath, md);
console.log(`Wrote Chinese catalog to ${catalogPath}`);
console.log(`Total skills: ${skills.length}`);
console.log('Categories:', Object.entries(grouped).map(([k, v]) => `${k}: ${v.length}`).join(', '));
