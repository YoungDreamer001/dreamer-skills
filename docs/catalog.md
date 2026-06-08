# Skill Catalog（技能目录）

> 由 `./bin/hk-skill catalog` 自动生成并翻译整理。技能按**使用场景**分组，同时标注启用状态。
> 状态说明：✅ 项目 = 项目级启用　|　✅ 全局 = 全局启用　|　❌ = 未启用

---

## 内容创作

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| article-analyzer | ✅ 项目 | 文章/论文/报告深度分析，输出结构化理解与洞察 | the user asks for article analysis, 深度分析, 分析这篇文章, 拆解观点, 论文速读... |
| baoyu-danger-x-to-markdown | ✅ 项目 | X/Twitter 推文/文章转 Markdown | user mentions "X to markdown", "tweet to markdown", "save tweet", or provides x |
| baoyu-format-markdown | ✅ 项目 | Markdown 自动排版与格式化 | user asks to "format markdown", "beautify article", "add formatting"... |
| baoyu-translate | ✅ 项目 | 多语言翻译，支持快翻/标准/精翻与术语表 | This skill should be used when the user asks to "translate", "翻译", "精翻", "transl... |
| baoyu-url-to-markdown | ✅ 项目 | 任意网页保存为 Markdown | user wants to save a webpage as markdown |
| baoyu-youtube-transcript | ✅ 项目 | YouTube 字幕/封面下载与翻译 | user asks to "get YouTube transcript", "download subtitles", "get captions"... |
| blog-checker | ✅ 全局 | 中文技术博客文章质量审阅与评估 | 审阅和评估中文技术博客文章的质量。当用户要求审阅、检查或评估技术文章、博客、技术写作时使用。 不用于翻译、重写、创作新文章，也不用于非技术类内容（如小说、散文、... |
| concept-fable | ✅ 全局 | 提取高级领域概念，隐藏于三段式寓言后揭示映射 | the user asks for 概念寓言, 三段式寓言, 用寓言解释领域概念, story-based concept explanation... |
| merge-drafts | ✅ 项目 | 多份草稿合并为一篇高质量文章 | Merges multiple draft documents into a single high-quality article... |
| prompt-optimizer | ✅ 全局 | 将模糊需求编译为工业级结构化提示词 | Compile ambiguous user requirements into industrial-grade, structured prompts... |
| session-achieve | ✅ 全局 | 复盘多轮对话，提取纠偏逻辑并沉淀黄金提示词 | 复盘当前多轮对话，提取纠偏逻辑并沉淀黄金提示词。当用户输入"复盘对话"、"总结这次对话"、"session review"、"review this sessi... |
| subtext-article | ✅ 项目 | 字幕/转写文本转为可发布长文章 | the user asks to turn subtitles, subtext, transcript, video captions... |
| edit-article | ❌ | 文章编辑与润色（结构调整与文笔优化） | user wants to edit, revise, or improve an article draft |
| internal-comms | ❌ | 内部沟通文案（状态报告/领导力更新/FAQ/事故报告） | A set of resources to help me write all kinds of internal communications, using ... |
| ljg-read | ❌ | 伴读助手（翻译/结构批注/跨域洞察） | user says '伴读', '陪我读', '读这篇', 'read with me', 'companion read'... |

## 社交媒体

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| baoyu-post-to-wechat | ✅ 项目 | 微信公众号文章/贴图发布 | user mentions "发布公众号", "post to wechat", "微信公众号", or "贴图/图文/文章" |
| baoyu-post-to-weibo | ✅ 项目 | 微博发布（含头条文章） | user asks to "post to Weibo", "发微博", "发布微博", "publish to Weibo"... |
| baoyu-post-to-x | ✅ 项目 | X/Twitter 发布（含长文） | available and fall back to real Chrome CDP scripts only when allowed |
| guizang-social-card-skill | ✅ 项目 | 小红书/公众号社交卡片生成 | the user asks for 小红书图文, Rednote/Xiaohongshu images, social cards... |

## 图像处理

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| baoyu-article-illustrator | ✅ 项目 | 文章配图智能生成（Type × Style × Palette） | user asks to "illustrate article", "add images", "generate images for article"... |
| baoyu-comic | ✅ 项目 | 知识/教育漫画创作，支持多风格与分镜 | user asks to create "知识漫画", "教育漫画", "biography comic", "tutorial comic"... |
| baoyu-compress-image | ✅ 项目 | 图片压缩与格式转换（WebP/PNG） | user asks to "compress image", "optimize image", "convert to webp"... |
| baoyu-cover-image | ✅ 项目 | 文章封面图生成（11 色板 × 7 渲染风格） | user asks to "generate cover image", "create article cover", or "make cover" |
| baoyu-danger-gemini-web | ✅ 项目 | 通过逆向 Gemini Web API 生成图像与文本 | other skills need image generation backend, or when user requests "generate image with Gemini"... |
| baoyu-infographic | ✅ 项目 | 专业信息图生成（21 布局 × 22 风格） | user asks to create "infographic", "信息图", "visual summary", "可视化", or "高密度信息大图" |
| ian-xiaohei-illustrations | ✅ 项目 | Ian 小黑风格中文正文配图 | 生成 Ian 风格的中文正文配图。用于用户要求为中文文章、帖子、博客、Notion 文档、工作流文档、方法论、流程、结构、状态、隐喻或观点生成“怪诞”“小黑”“... |
| algorithmic-art | ❌ | 算法艺术（p5.js 生成艺术、流场、粒子系统） | Creating algorithmic art using p5.js with seeded randomness and interactive para... |
| brand-guidelines | ❌ | Anthropic 品牌配色与排版应用 | Applies Anthropic's official brand colors and typography to any sort of artifact... |
| canvas-design | ❌ | 视觉艺术设计（海报/艺术品，PNG/PDF 输出） | Create beautiful visual art in .png and .pdf documents using design philosophy... |
| ce-gemini-imagegen | ❌ | Gemini API 图像生成/编辑/风格迁移 | This skill should be used when generating and editing images using the Gemini AP... |
| gpt-image-2 | ❌ | GPT Image 2 图像生成/编辑（18 大类 80+ 模板） | 面向 GPT Image 2 的图像生成 / 编辑技能。可在 3 种环境下使用：(A) Garden 本地模式，通过 OpenAI 兼容接口直接出图并落盘；(B... |

## 网页设计

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| baoyu-markdown-to-html | ✅ 项目 | Markdown 转微信兼容 HTML | user asks for "markdown to html", "convert md to html", "md 转 html"... |
| web-design | ✅ 项目 | Web 视觉设计（PRD → DESIGN.md → 代码交付） | Web 视觉设计 SKILL。输入 PRD / 参考 URL / 截图 / 关键词（任意组合），先产出一份标准化 DESIGN... |
| baoyu-design | ❌ | UI 原型/线框图/落地页/仪表盘 HTML 设计 | Create polished design artifacts as self-contained HTML — UI mockups, interactiv... |
| frontend-design | ❌ | 高品质前端界面设计，避免通用 AI 审美 | Create distinctive, production-grade frontend interfaces with high design qualit... |
| frontend-ui-engineering | ❌ | 生产级 UI 构建（组件/布局/状态管理） | building or modifying user-facing interfaces |
| theme-factory | ❌ | 主题样式工具包（10 套预设主题） | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs,... |
| web-artifacts-builder | ❌ | 复杂多组件 Claude.ai HTML 工件 | Suite of tools for creating elaborate, multi-component claude... |
| web-design-engineer | ❌ | 浏览器可交互前端交付物（页面/仪表盘/原型/动画） | the user wants a browser-rendered, interactive, or presentational front-end deliverable... |
| web-design-guidelines | ❌ | Web 界面规范审查（可访问性/UX/最佳实践） | asked to "review my UI", "check accessibility", "audit design"... |

### Vercel 生态

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| deploy-to-vercel | ❌ | Vercel 应用部署（预览/生产） | the user requests deployment actions like "deploy my app", "deploy and give me the link"... |
| vercel-cli-with-tokens | ❌ | Vercel CLI Token 认证部署 | working with Vercel CLI using access tokens rather than interactive login — e |
| vercel-composition-patterns | ❌ | React 组合模式（Compound Components/Render Props/Context） | refactoring components with boolean prop proliferation, building flexible component libraries... |
| vercel-react-best-practices | ❌ | React/Next.js 性能优化最佳实践 | React and Next.js performance optimization guidelines from Vercel Engineering... |
| vercel-react-native-skills | ❌ | React Native/Expo 移动应用最佳实践 | building React Native components, optimizing list performance... |
| vercel-react-view-transitions | ❌ | React View Transition API 动画实现 | the user mentions view transitions, `startViewTransition`, `ViewTransition`... |

## PPT / 演示

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| baoyu-slide-deck | ✅ 项目 | 专业幻灯片图片生成 | user asks to "create slides", "make a presentation", "generate deck"... |
| guizang-ppt-skill | ✅ 项目 | 横向翻页网页 PPT（杂志风/瑞士国际主义） | 生成横向翻页网页 PPT（单 HTML 文件），含 WebGL 背景、章节幕封、数据大字报、图片网格等模板。提供两种风格：① "电子杂志 × 电子墨水"（衬线 ... |
| html-ppt | ✅ 项目 | HTML PPT Studio（多风格模板/键盘导航） | the user asks for a presentation, PPT, slides, keynote, deck... |
| ian-handdrawn-ppt | ❌ | 手绘技术风 PPT 配图 | the user asks to turn content into PPT/PPTX/slides/courseware/课件/演示稿/配图/效果图 in a refined Chinese han... |
| pptx | ❌ | PPTX 文件创建、读取、编辑与拆分 | deck, |
| visual-style-ppt | ❌ | 风格驱动图片版 PPTX（提炼/保存/复用风格） | the user asks for a "PPT Skill", "风格驱动 PPT", "提炼风格做 PPT", "调用某个风格做 PPT"... |
| web-video-presentation | ❌ | 文章/口播稿转点击驱动 16:9 网页演示（可选音频） | 把一篇文章或口播稿，做成"看起来像视频"的点击驱动 16:9 网页演示，可选合成口播音频。流程：原始文章 → **一次产出**口播稿 + outline 开发计... |

## 开发辅助

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| api-and-interface-design | ❌ | API 与接口设计指南（REST/GraphQL/类型契约） | designing APIs, module boundaries, or any public interface |
| ce-agent-native-architecture | ❌ | Agent-Native 应用架构设计（MCP/自修改系统） | Build applications where agents are first-class citizens. Use this skill when de... |
| ce-brainstorm | ❌ | 通过协作对话探索需求并产出需求文档 | the user says "let's brainstorm", "what should we build", or "help me think through X"... |
| ce-dhh-rails-style | ❌ | DHH/37signals 风格的 Ruby on Rails 开发 | This skill should be used when writing Ruby and Rails code in DHH's distinctive ... |
| ce-frontend-design | ❌ | 真正具备设计质量的 Web 界面构建 | Build web interfaces with genuine design quality, not AI slop... |
| ce-ideate | ❌ | 围绕主题生成并批判性评估落地想法 | asking what to improve, requesting idea generation, exploring surprising directions... |
| ce-plan | ❌ | 多步骤任务的结构化计划制定与深化 | the user says 'plan this', 'create a plan', 'how should we build'... |
| claude-api | ❌ | Claude API / Anthropic SDK 应用开发与优化 | Build, debug, and optimize Claude API / Anthropic SDK apps. Apps built with this... |
| context-engineering | ❌ | Agent 上下文优化配置 | starting a new session, when agent output quality degrades, when switching between tasks... |
| design-an-interface | ❌ | 并行生成多种接口设计方案对比 | user wants to design an API, explore interface options, compare module shapes... |
| idea-refine | ❌ | 想法发散与收敛精炼 | an idea is still vague, when you need to stress-test assumptions before committing to a plan... |
| incremental-implementation | ❌ | 增量式代码交付（避免一次性大量改动） | implementing any feature or change that touches more than one file |
| mcp-builder | ❌ | MCP（Model Context Protocol）服务器开发 | building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/Typ... |
| planning-and-task-breakdown | ❌ | 任务拆解与排期 | you have a spec or clear requirements and need to break work into implementable tasks... |
| scaffold-exercises | ❌ | 创建带章节/题目/解答/讲解的练习目录结构 | user wants to scaffold exercises, create exercise stubs, or set up a new course section... |
| source-driven-development | ❌ | 基于官方文档的权威实现 | you want authoritative, source-cited code free from outdated patterns |
| spec-driven-development | ❌ | 编码前先写规格说明 | starting a new project, feature, or significant change and no specification exists yet... |
| using-agent-skills | ❌ | Agent Skill 发现与调用的元技能 | starting a session or when you need to discover which skill applies to the current task... |

## 代码质量

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| browser-testing-with-devtools | ❌ | Chrome DevTools MCP 浏览器测试 | building or debugging anything that runs in a browser |
| ce-clean-gone-branches | ❌ | 清理远程已删除的本地分支及关联 worktree | the user says "clean up branches", "delete gone branches", "prune local branches"... |
| ce-code-review | ❌ | 结构化代码审查（多级 persona/置信度门禁/自动修复） | reviewing code changes before creating a PR |
| ce-debug | ❌ | 系统化根因定位与 Bug 修复 | debugging errors, investigating test failures, reproducing bugs from issue trackers (GitHub... |
| ce-dogfood-beta | ❌ | [BETA] 以 QA 工程师身份端到端 dogfood 当前分支 | you want a hands-off 'test everything we just built and make it actually work' pass before shipping... |
| ce-optimize | ❌ | 度量驱动的迭代优化循环（实验→评分→收敛） | optimizing clustering quality, search relevance, build performance... |
| ce-simplify-code | ❌ | 简化并精炼近期改动代码（清晰/复用/质量/效率） | Simplify and refine recently changed code for clarity, reuse, quality, and effic... |
| ce-test-browser | ❌ | 当前 PR 或分支影响页面的浏览器测试 | Run browser tests on pages affected by current PR or branch |
| ce-test-xcode | ❌ | XcodeBuildMCP 模拟器构建与 iOS 测试 | Build and test iOS apps on simulator using XcodeBuildMCP. Use after making iOS c... |
| ce-work | ❌ | 高效执行开发工作并保证质量完成功能 | Execute work efficiently while maintaining quality and finishing features |
| ce-work-beta | ❌ | [BETA] 带外部代理支持的 ce-work（实验性 Codex 委托） | [BETA] Execute work with external delegate support. Same as ce-work but includes... |
| ce-worktree | ❌ | 创建隔离的 git worktree 进行并行开发 | starting work that should not disturb the current checkout, or when `ce-work` or `ce-code-review` of... |
| code-review-and-quality | ❌ | 多维度代码审查（合并前评估） | reviewing code written by yourself, another agent, or a human |
| code-simplification | ❌ | 代码简化与清晰度重构 | refactoring code for clarity without changing behavior |
| debugging-and-error-recovery | ❌ | 系统化根因调试方法论 | tests fail, builds break, behavior doesn't match expectations... |
| diagnose | ❌ | 顽固 Bug 诊断循环（复现→最小化→假设→验证→修复） | user says "diagnose this" / "debug this", reports a bug, says something is broken/throwing/failing... |
| git-guardrails-claude-code | ❌ | Claude Code Git 安全钩子（阻止危险操作） | user wants to prevent destructive git operations, add git safety hooks... |
| git-workflow-and-versioning | ❌ | Git 工作流与版本管理 | making any code change |
| migrate-to-shoehorn | ❌ | TypeScript 测试 `as` 断言迁移至 shoehorn | user mentions shoehorn, wants to replace `as` in tests, or needs partial test data... |
| performance-optimization | ❌ | 应用性能优化（Core Web Vitals、加载时间） | performance requirements exist, when you suspect performance regressions... |
| security-and-hardening | ❌ | 安全加固与漏洞防护 | handling user input, authentication, data storage, or external integrations |
| setup-pre-commit | ❌ | Husky + lint-staged pre-commit 钩子配置 | user wants to add pre-commit hooks, set up Husky, configure lint-staged... |
| tdd | ❌ | 测试驱动开发（红绿重构循环） | user wants to build features or fix bugs using TDD, mentions "red-green-refactor"... |
| test-driven-development | ❌ | 测试驱动开发（证明代码正确性） | implementing any logic, fixing any bug, or changing any behavior |
| webapp-testing | ❌ | Playwright 本地 Web 应用测试与调试 | Toolkit for interacting with and testing local web applications using Playwright... |

## 文档沟通

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| caveman | ❌ | 极简压缩通信模式（节省约 75% Token） | user says "caveman mode", "talk like caveman", "use caveman"... |
| ce-demo-reel | ❌ | 为 PR 描述捕获视觉演示素材（GIF/录屏/截图） | shipping UI changes, CLI features, or any work with observable behavior that benefits from visual pr... |
| ce-doc-review | ❌ | 并行 persona 审阅需求或计划文档 | a requirements document or plan document exists and the user wants to improve it |
| ce-promote | ❌ | 为已发布功能撰写用户-facing 公告与营销文案 | the user says 'promote this', 'draft the announcement', 'write the launch copy'... |
| ce-proof | ❌ | 通过 Proof 进行 Markdown 人工回环审阅 | the user says "view this in proof", "share to proof", "HITL this doc"... |
| ce-release-notes | ❌ | 汇总 compound-engineering 插件近期发布变更 | the user types `/ce-release-notes` or asks "what changed in compound-engineering recently?" or "what... |
| ce-report-bug | ❌ | compound-engineering 插件 Bug 报告 | Report a bug in the compound-engineering plugin |
| ce-resolve-pr-feedback | ❌ | 并行评估并修复 PR 审查反馈 | addressing PR review comments, resolving review threads, or fixing code review feedback... |
| deprecation-and-migration | ❌ | 废弃与迁移管理 | removing old systems, APIs, or features |
| doc-coauthoring | ❌ | 文档协作共创流程（技术规格/决策文档） | user wants to write documentation, proposals, technical specs... |
| documentation-and-adrs | ❌ | 架构决策记录（ADR）与项目文档维护 | making architectural decisions, changing public APIs, shipping features... |
| grill-me | ❌ | 面试式拷问计划/设计直到达成共同理解 | user wants to stress-test a plan, get grilled on their design... |
| grill-with-docs | ❌ | 基于现有文档对计划进行压力测试 | user wants to stress-test a plan against their project's language and documented decisions... |
| qa | ❌ | 交互式 Bug 报告与 GitHub Issue 提交 | user wants to report bugs, do QA, file issues conversationally... |
| ubiquitous-language | ❌ | DDD 统一语言词典提取与术语规范化 | user wants to define domain terms, build a glossary, harden terminology... |

## 知识管理

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| ima-skill | ✅ 项目 | IMA 知识库与笔记管理（上传/搜索/创建/编辑） | 统一的 IMA OpenAPI 技能，支持笔记管理和知识库操作。 当用户提到知识库、资料库、笔记、备忘录、记事，或者想要上传文件、添加网页到知识库、 搜索知识库... |
| weread-skills | ✅ 项目 | 微信读书助手（搜索/书架/笔记/书评/统计/推荐） | 微信读书助手 — 搜索书籍、管理书架、查看笔记划线、浏览书评、阅读统计、发现推荐好书 |
| ce-compound | ❌ | 将刚解决的问题沉淀为团队知识或 CONCEPTS.md | Document a recently solved problem to compound your team's knowledge or CONCEPTS... |
| ce-compound-refresh | ❌ | 刷新 docs/solutions/ 下过时或漂移的学习文档 | the user asks to "refresh my learnings", "audit docs/solutions/"... |
| ce-sessions | ❌ | 跨 Claude Code/Codex/Cursor 搜索并追问会话历史 | asking what was worked on, what was tried before, how a problem was investigated across sessions... |
| ce-slack-research | ❌ | 搜索 Slack 并产出组织上下文综合研究报告 | the user says 'search slack for', 'what did we discuss about'... |
| ce-strategy | ❌ | 创建或维护 STRATEGY.md（产品方向/用户/指标/工作流） | starting a new product, updating direction, or when prompts like 'write our strategy'... |
| kb-retriever | ❌ | 本地知识库目录检索问答（PDF/Excel 渐进式检索） | 面向本地知识库目录的检索和问答助手。核心流程：(1)分层索引导航 (2)遇到PDF/Excel时必须先读取references学习处理方法 (3)处理文件后再检... |
| obsidian-vault | ❌ | Obsidian 笔记库搜索、创建与管理 | user wants to find, create, or organize notes in Obsidian |

## 图表与可视化

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| architecture-diagram | ✅ 项目 | 暗色主题架构图（HTML+SVG） | the user asks for system, infrastructure, cloud, security, or network topology diagrams... |
| baoyu-diagram | ✅ 项目 | 专业暗色主题 SVG 图表（流程图/时序图/思维导图等） | Create professional, dark-themed SVG diagrams of any type — architecture diagram... |

## 发布与运维

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| release-skills | ✅ 项目 | 通用发布工作流（Node/Python/Rust/GitHub Releases） | user says "release", "发布", "new version", "bump version", "push"... |
| ce-commit | ❌ | 创建信息清晰、价值导向的 git commit | the user says "commit", "commit this", "save my changes", "create a commit"... |
| ce-commit-push-pr | ❌ | 提交、推送并创建价值优先的 PR 描述 | the user says "commit and PR", "ship this", "create a PR", or "open a pull request"... |
| ce-product-pulse | ❌ | 生成产品体验与质量信号的时间窗口脉动报告 | the user says 'run a pulse', 'show me the pulse', 'how are we doing'... |
| ci-cd-and-automation | ❌ | CI/CD 流水线自动化 | setting up or modifying build and deployment pipelines |
| shipping-and-launch | ❌ | 生产发布准备（预发布检查清单/监控/灰度/回滚） | preparing to deploy to production |
| to-issues | ❌ | 计划/PRD 拆分为可执行 Issue（tracer-bullet 垂直切片） | user wants to convert a plan into issues, create implementation tickets... |
| to-prd | ❌ | 对话上下文生成 PRD 并发布至 Issue 追踪器 | user wants to create a PRD from the current context |

## Skill 管理与元技能

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| HeavySkill | ✅ 全局 | Agentic Harness 中的深度思考内功心法 | Heavy Thinking as the Inner Skill in Agentic Harness |
| skill-creator | ✅ 项目 | Skill 创建、修改、性能评估与触发优化 | users want to create a skill from scratch, edit, or optimize an existing skill... |
| ce-setup | ❌ | 诊断并配置 compound-engineering 环境 | troubleshooting missing tools, verifying setup, or before onboarding |
| ce-update | ❌ | 检查 compound-engineering 插件版本并推荐更新 | the user says "update compound engineering", "check compound engineering version"... |
| skill-installer | ❌ | 第三方 Skill 批量导入与本地适配 | a user asks to list candidate skills, stage a remote skill, or intake a GitHub-hosted skill for loca... |
| skill-optimizer | ❌ | Skill 审计评估、突变策略与自训练协议 | the user wants to optimize a skill, improve SKILL |
| write-a-skill | ❌ | Agent Skill 规范创建（渐进式披露+捆绑资源） | user wants to create, write, or build a new skill |

## 其他工具

| 技能名称 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|
| ce-agent-native-audit | ❌ | Agent-Native 架构综合评审与评分 | Run comprehensive agent-native architecture review with scored principles |
| ce-polish | ❌ | 启动 dev server，在浏览器中协同迭代打磨功能 | Start the dev server, open the feature in a browser, and iterate on improvements... |
| ce-riffrec-feedback-analysis | ❌ | Riffrec 产品反馈工作流（会话包分析） | Riffrec product-feedback workflow. ALWAYS load when the user posts a `riffrec-*... |
| docx | ❌ | Word 文档（.docx）创建、编辑与格式处理 | extracting or reorganizing content from |
| improve-codebase-architecture | ❌ | 代码库架构改进与重构机会发现 | the user wants to improve architecture, find refactoring opportunities... |
| lfg | ❌ | 端到端自主工程流水线（规划→开发→审查→测试→PR→CI） | Run the full autonomous engineering pipeline end-to-end (plan, work, code review... |
| pdf | ❌ | PDF 全面处理（阅读/合并/分割/OCR/表单/加密） | Use this skill whenever the user wants to do anything with PDF files... |
| slack-gif-creator | ❌ | Slack 优化 GIF 动画创建 | users request animated GIFs for Slack like "make me a GIF of X doing Y for Slack |
| xlsx | ❌ | 电子表格处理（.xlsx/.csv 读写、清洗、转换） | Use this skill any time a spreadsheet file is the primary input or output... |
| zoom-out | ❌ | 全局视角与高阶上下文 | you're unfamiliar with a section of code or need to understand how it fits into the bigger picture... |

---

## 🔗 实用工作流组合

以下是将多个技能串联使用的典型工作流。每个工作流按执行顺序排列，你可以按需裁剪步骤。

### 1. 内容创作与多平台发布流

适合将从素材收集到多平台分发的完整链路自动化。

```
素材采集 → 深度分析 → 内容创作 → 视觉包装 → 排版发布
```

| 步骤 | 推荐技能 | 作用 |
|---|---|---|
| ① 素材采集 | `baoyu-url-to-markdown` / `baoyu-youtube-transcript` | 将网页/视频转为可编辑的 Markdown |
| ② 深度分析 | `article-analyzer` | 对素材进行结构化拆解与洞察提取 |
| ③ 内容创作 | `merge-drafts` / `subtext-article` | 多素材合并成文章，或视频转写润色 |
| ④ 翻译润色 | `baoyu-translate` | 多语言翻译与术语统一 |
| ⑤ 视觉包装 | `baoyu-cover-image` / `baoyu-article-illustrator` | 生成封面图与正文配图 |
| ⑥ 排版转换 | `baoyu-markdown-to-html` | Markdown 转微信兼容 HTML |
| ⑦ 多平台发布 | `baoyu-post-to-wechat` / `baoyu-post-to-weibo` / `baoyu-post-to-x` | 一键发布至各平台 |

> 💡 如果你只有一篇原始素材想快速出稿，可以跳过 ①②，直接用 `article-analyzer` 提取要点后进入 ③。

### 2. 知识萃取与知识库归档流

适合将碎片化信息（视频、播客、文章）沉淀为结构化知识资产。

```
原始内容 → 转写/提取 → 分析重构 → 翻译整理 → 知识库归档
```

| 步骤 | 推荐技能 | 作用 |
|---|---|---|
| ① 原始内容 | `baoyu-youtube-transcript` / `baoyu-url-to-markdown` | 获取视频字幕或网页原文 |
| ② 转写重构 | `subtext-article` | 将字幕/ASR 转写转为可读文章 |
| ③ 深度分析 | `article-analyzer` | 提取核心论点、框架与可行动洞察 |
| ④ 概念寓言化 | `concept-fable` | 将复杂概念转为三段式寓言故事（可选） |
| ⑤ 翻译整理 | `baoyu-translate` | 外文内容精翻，统一术语 |
| ⑥ 知识库归档 | `ima-skill` | 上传至 IMA 知识库，建立个人/团队知识索引 |

> 💡 配合 `weread-skills` 可将微信读书笔记同步纳入知识管理体系。

### 3. 演示文稿快速制作流

适合从大纲到成品的幻灯片/网页演示制作。

```
主题定义 → 内容生成 → 图表配图 → 幻灯片制作 → 封面收尾
```

| 步骤 | 推荐技能 | 作用 |
|---|---|---|
| ① 主题定义 | `prompt-optimizer` | 将模糊需求编译为结构化 prompt |
| ② 内容生成 | `HeavySkill` / `article-analyzer` | 深度思考生成大纲与逐页内容 |
| ③ 图表配图 | `baoyu-diagram` / `baoyu-infographic` | 生成流程图、架构图或信息图 |
| ④ 幻灯片制作 | `html-ppt` / `guizang-ppt-skill` / `baoyu-slide-deck` | 生成网页 PPT 或图片版幻灯片 |
| ⑤ 封面收尾 | `baoyu-cover-image` | 生成演示封面与章节过渡页 |
| ⑥ 品牌统一 | `theme-factory` | 应用统一主题配色与排版风格 |

> 💡 若需要技术类演示，可额外使用 `architecture-diagram` 生成深色架构图。

### 4. 产品研发与发布流

适合从需求到上线的完整开发周期。

```
需求澄清 → 规格定义 → 增量开发 → 代码审查 → 质量保障 → 部署发布
```

| 步骤 | 推荐技能 | 作用 |
|---|---|---|
| ① 需求澄清 | `to-prd` / `idea-refine` | 对话生成 PRD，或压力测试假设 |
| ② 规格定义 | `spec-driven-development` | 编码前先写规范文档与接口契约 |
| ③ 增量开发 | `incremental-implementation` / `tdd` | 大任务拆分，测试驱动逐步落地 |
| ④ 代码审查 | `code-review-and-quality` | 多维度审查，合并前质量把关 |
| ⑤ 质量保障 | `setup-pre-commit` / `webapp-testing` | 配置提交钩子与自动化测试 |
| ⑥ 部署发布 | `deploy-to-vercel` / `release-skills` | 一键部署，自动检测版本与 changelog |

> 💡 如需 API 设计，可在 ② 阶段加入 `api-and-interface-design` 或 `design-an-interface`。

### 5. 社交媒体内容运营流

适合将优质外部内容改编为自有社交媒体素材。

```
热点捕捉 → 内容改编 → 视觉设计 → 一键分发
```

| 步骤 | 推荐技能 | 作用 |
|---|---|---|
| ① 热点捕捉 | `baoyu-x-to-markdown` / `baoyu-url-to-markdown` | 保存推文/文章为 Markdown |
| ② 内容改编 | `merge-drafts` / `blog-checker` | 合稿并评估文章质量 |
| ③ 视觉设计 | `guizang-social-card-skill` / `baoyu-infographic` | 生成小红书图文、信息图等 |
| ④ 一键分发 | `baoyu-post-to-x` / `baoyu-post-to-weibo` / `baoyu-post-to-wechat` | 多平台同步发布 |

> 💡 运营小红书时，`guizang-social-card-skill` 的 3:4 封面模板可直接使用。

### 6. 长文精读与复盘沉淀流

适合对高质量长文进行深度阅读并沉淀为个人方法论。

```
长文输入 → 伴读分析 → 复盘提取 → 提示词沉淀
```

| 步骤 | 推荐技能 | 作用 |
|---|---|---|
| ① 长文输入 | `baoyu-url-to-markdown` | 将长文转为本地 Markdown |
| ② 伴读分析 | `article-analyzer` / `HeavySkill` | 结构化拆解与深度思考 |
| ③ 复盘提取 | `session-achieve` | 从阅读/对话中提取纠偏逻辑与关键洞察 |
| ④ 提示词沉淀 | `prompt-optimizer` | 将个人阅读方法论固化为可复用 prompt |
| ⑤ 归档管理 | `ima-skill` | 存入知识库，建立阅读索引 |

> 💡 配合 `weread-skills` 可将微信读书中的划线与书评纳入同一复盘流程。

