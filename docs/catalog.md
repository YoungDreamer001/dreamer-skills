# Skill Catalog（技能目录）

> 由 `./bin/hk-skill catalog` 自动生成并翻译整理。技能按**使用场景**分组，可点击技能名称查看详情与推荐组合。

---

## 内容创作

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| article-analyzer | warehouse/local/article-analyzer | adapted | 文章/论文/报告深度分析，输出结构化理解与洞察 | the user asks for article analysis, 深度分析, 分析这篇文章, 拆解观点, 论文速读... |
| baoyu-danger-x-to-markdown | https://github.com/JimLiu/baoyu-skills | adapted | X/Twitter 推文/文章转 Markdown | user mentions "X to markdown", "tweet to markdown", "save tweet", or provides x |
| baoyu-format-markdown | https://github.com/JimLiu/baoyu-skills | adapted | Markdown 自动排版与格式化 | user asks to "format markdown", "beautify article", "add formatting"... |
| baoyu-translate | https://github.com/JimLiu/baoyu-skills | adapted | 多语言翻译，支持快翻/标准/精翻与术语表 | This skill should be used when the user asks to "translate", "翻译", "精翻", "transl... |
| baoyu-url-to-markdown | https://github.com/JimLiu/baoyu-skills | adapted | 任意网页保存为 Markdown | user wants to save a webpage as markdown |
| baoyu-youtube-transcript | https://github.com/JimLiu/baoyu-skills | adapted | YouTube 字幕/封面下载与翻译 | user asks to "get YouTube transcript", "download subtitles", "get captions"... |
| blog-checker | warehouse/local/blog-checker | adapted | 中文技术博客文章质量审阅与评估 | 审阅和评估中文技术博客文章的质量。当用户要求审阅、检查或评估技术文章、博客、技术写作时使用。 不用于翻译、重写、创作新文章，也不用于非技术类内容（如小说、散文、... |
| concept-fable | warehouse/local/concept-fable | adapted | 提取高级领域概念，隐藏于三段式寓言后揭示映射 | the user asks for 概念寓言, 三段式寓言, 用寓言解释领域概念, story-based concept explanation... |
| edit-article | https://github.com/mattpocock/skills | adapted | 文章编辑与润色（结构调整与文笔优化） | user wants to edit, revise, or improve an article draft |
| internal-comms | https://github.com/anthropics/skills | adapted | 内部沟通文案（状态报告/领导力更新/FAQ/事故报告） | A set of resources to help me write all kinds of internal communications, using ... |
| ljg-read | https://github.com/lijigang/ljg-skills | adapted | 伴读助手（翻译/结构批注/跨域洞察） | user says '伴读', '陪我读', '读这篇', 'read with me', 'companion read'... |
| merge-drafts | warehouse/local/merge-drafts | adapted | 多份草稿合并为一篇高质量文章 | Merges multiple draft documents into a single high-quality article... |
| prompt-optimizer | warehouse/local/prompt-optimizer | adapted | 将模糊需求编译为工业级结构化提示词 | Compile ambiguous user requirements into industrial-grade, structured prompts... |
| session-achieve | warehouse/local/session-achieve | adapted | 复盘多轮对话，提取纠偏逻辑并沉淀黄金提示词 | 复盘当前多轮对话，提取纠偏逻辑并沉淀黄金提示词。当用户输入"复盘对话"、"总结这次对话"、"session review"、"review this sessi... |
| subtext-article | warehouse/local/subtext-article | adapted | 字幕/转写文本转为可发布长文章 | the user asks to turn subtitles, subtext, transcript, video captions... |

## 社交媒体

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| baoyu-post-to-wechat | https://github.com/JimLiu/baoyu-skills | adapted | 微信公众号文章/贴图发布 | user mentions "发布公众号", "post to wechat", "微信公众号", or "贴图/图文/文章" |
| baoyu-post-to-weibo | https://github.com/JimLiu/baoyu-skills | adapted | 微博发布（含头条文章） | user asks to "post to Weibo", "发微博", "发布微博", "publish to Weibo"... |
| baoyu-post-to-x | https://github.com/JimLiu/baoyu-skills | adapted | X/Twitter 发布（含长文） | available and fall back to real Chrome CDP scripts only when allowed |
| guizang-social-card-skill | https://github.com/op7418/guizang-social-card-skill | adapted | 小红书/公众号社交卡片生成 | the user asks for 小红书图文, Rednote/Xiaohongshu images, social cards... |

## 图像处理

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| algorithmic-art | https://github.com/anthropics/skills | adapted | 算法艺术（p5.js 生成艺术、流场、粒子系统） | Creating algorithmic art using p5.js with seeded randomness and interactive para... |
| baoyu-article-illustrator | https://github.com/JimLiu/baoyu-skills | adapted | 文章配图智能生成（Type × Style × Palette） | user asks to "illustrate article", "add images", "generate images for article"... |
| baoyu-comic | https://github.com/JimLiu/baoyu-skills | adapted | 知识/教育漫画创作，支持多风格与分镜 | user asks to create "知识漫画", "教育漫画", "biography comic", "tutorial comic"... |
| baoyu-compress-image | https://github.com/JimLiu/baoyu-skills | adapted | 图片压缩与格式转换（WebP/PNG） | user asks to "compress image", "optimize image", "convert to webp"... |
| baoyu-cover-image | https://github.com/JimLiu/baoyu-skills | adapted | 文章封面图生成（11 色板 × 7 渲染风格） | user asks to "generate cover image", "create article cover", or "make cover" |
| baoyu-danger-gemini-web | https://github.com/JimLiu/baoyu-skills | adapted | 通过逆向 Gemini Web API 生成图像与文本 | other skills need image generation backend, or when user requests "generate image with Gemini"... |
| baoyu-infographic | https://github.com/JimLiu/baoyu-skills | adapted | 专业信息图生成（21 布局 × 22 风格） | user asks to create "infographic", "信息图", "visual summary", "可视化", or "高密度信息大图" |
| brand-guidelines | https://github.com/anthropics/skills | adapted | Anthropic 品牌配色与排版应用 | Applies Anthropic's official brand colors and typography to any sort of artifact... |
| canvas-design | https://github.com/anthropics/skills | adapted | 视觉艺术设计（海报/艺术品，PNG/PDF 输出） | Create beautiful visual art in .png and .pdf documents using design philosophy... |
| ce-gemini-imagegen | https://github.com/EveryInc/compound-engineering-plugin | adapted | Gemini API 图像生成/编辑/风格迁移 | This skill should be used when generating and editing images using the Gemini AP... |
| gpt-image-2 | https://github.com/ConardLi/garden-skills | adapted | GPT Image 2 图像生成/编辑（18 大类 80+ 模板） | 面向 GPT Image 2 的图像生成 / 编辑技能。可在 3 种环境下使用：(A) Garden 本地模式，通过 OpenAI 兼容接口直接出图并落盘；(B... |
| ian-xiaohei-illustrations | https://github.com/helloianneo/ian-xiaohei-illustrations.git | adapted | Ian 小黑风格中文正文配图 | 生成 Ian 风格的中文正文配图。用于用户要求为中文文章、帖子、博客、Notion 文档、工作流文档、方法论、流程、结构、状态、隐喻或观点生成“怪诞”“小黑”“... |

## 网页设计

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| baoyu-design | https://github.com/JimLiu/baoyu-design | adapted | UI 原型/线框图/落地页/仪表盘 HTML 设计 | Create polished design artifacts as self-contained HTML — UI mockups, interactiv... |
| baoyu-markdown-to-html | https://github.com/JimLiu/baoyu-skills | adapted | Markdown 转微信兼容 HTML | user asks for "markdown to html", "convert md to html", "md 转 html"... |
| frontend-design | https://github.com/anthropics/skills | adapted | 高品质前端界面设计，避免通用 AI 审美 | Create distinctive, production-grade frontend interfaces with high design qualit... |
| frontend-ui-engineering | https://github.com/addyosmani/agent-skills | adapted | 生产级 UI 构建（组件/布局/状态管理） | building or modifying user-facing interfaces |
| theme-factory | https://github.com/anthropics/skills | adapted | 主题样式工具包（10 套预设主题） | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs,... |
| web-artifacts-builder | https://github.com/anthropics/skills | adapted | 复杂多组件 Claude.ai HTML 工件 | Suite of tools for creating elaborate, multi-component claude... |
| web-design | https://github.com/KAOPU-XiaoPu/web-design | adapted | Web 视觉设计（PRD → DESIGN.md → 代码交付） | Web 视觉设计 SKILL。输入 PRD / 参考 URL / 截图 / 关键词（任意组合），先产出一份标准化 DESIGN... |
| web-design-engineer | https://github.com/ConardLi/garden-skills | adapted | 浏览器可交互前端交付物（页面/仪表盘/原型/动画） | the user wants a browser-rendered, interactive, or presentational front-end deliverable... |
| web-design-guidelines | https://github.com/vercel-labs/agent-skills | adapted | Web 界面规范审查（可访问性/UX/最佳实践） | asked to "review my UI", "check accessibility", "audit design"... |

### Vercel 生态

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| deploy-to-vercel | https://github.com/vercel-labs/agent-skills | adapted | Vercel 应用部署（预览/生产） | the user requests deployment actions like "deploy my app", "deploy and give me the link"... |
| vercel-cli-with-tokens | https://github.com/vercel-labs/agent-skills | adapted | Vercel CLI Token 认证部署 | working with Vercel CLI using access tokens rather than interactive login — e |
| vercel-composition-patterns | https://github.com/vercel-labs/agent-skills | adapted | React 组合模式（Compound Components/Render Props/Context） | refactoring components with boolean prop proliferation, building flexible component libraries... |
| vercel-react-best-practices | https://github.com/vercel-labs/agent-skills | adapted | React/Next.js 性能优化最佳实践 | React and Next.js performance optimization guidelines from Vercel Engineering... |
| vercel-react-native-skills | https://github.com/vercel-labs/agent-skills | adapted | React Native/Expo 移动应用最佳实践 | building React Native components, optimizing list performance... |
| vercel-react-view-transitions | https://github.com/vercel-labs/agent-skills | adapted | React View Transition API 动画实现 | the user mentions view transitions, `startViewTransition`, `ViewTransition`... |

## PPT / 演示

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| baoyu-slide-deck | https://github.com/JimLiu/baoyu-skills | adapted | 专业幻灯片图片生成 | user asks to "create slides", "make a presentation", "generate deck"... |
| guizang-ppt-skill | https://github.com/op7418/guizang-ppt-skill | adapted | 横向翻页网页 PPT（杂志风/瑞士国际主义） | 生成横向翻页网页 PPT（单 HTML 文件），含 WebGL 背景、章节幕封、数据大字报、图片网格等模板。提供两种风格：① "电子杂志 × 电子墨水"（衬线 ... |
| html-ppt | https://github.com/lewislulu/html-ppt-skill | adapted | HTML PPT Studio（多风格模板/键盘导航） | the user asks for a presentation, PPT, slides, keynote, deck... |
| ian-handdrawn-ppt | https://github.com/helloianneo/ian-handdrawn-ppt | adapted | 手绘技术风 PPT 配图 | the user asks to turn content into PPT/PPTX/slides/courseware/课件/演示稿/配图/效果图 in a refined Chinese han... |
| pptx | https://github.com/anthropics/skills | adapted | PPTX 文件创建、读取、编辑与拆分 | deck, |
| visual-style-ppt | https://github.com/irenerachel/visual-style-ppt-skill | adapted | 风格驱动图片版 PPTX（提炼/保存/复用风格） | the user asks for a "PPT Skill", "风格驱动 PPT", "提炼风格做 PPT", "调用某个风格做 PPT"... |
| web-video-presentation | https://github.com/ConardLi/garden-skills | adapted | 文章/口播稿转点击驱动 16:9 网页演示（可选音频） | 把一篇文章或口播稿，做成"看起来像视频"的点击驱动 16:9 网页演示，可选合成口播音频。流程：原始文章 → **一次产出**口播稿 + outline 开发计... |

## 开发辅助

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| api-and-interface-design | https://github.com/addyosmani/agent-skills | adapted | API 与接口设计指南（REST/GraphQL/类型契约） | designing APIs, module boundaries, or any public interface |
| ce-agent-native-architecture | https://github.com/EveryInc/compound-engineering-plugin | adapted | Agent-Native 应用架构设计（MCP/自修改系统） | Build applications where agents are first-class citizens. Use this skill when de... |
| ce-brainstorm | https://github.com/EveryInc/compound-engineering-plugin | adapted | 通过协作对话探索需求并产出需求文档 | the user says "let's brainstorm", "what should we build", or "help me think through X"... |
| ce-dhh-rails-style | https://github.com/EveryInc/compound-engineering-plugin | adapted | DHH/37signals 风格的 Ruby on Rails 开发 | This skill should be used when writing Ruby and Rails code in DHH's distinctive ... |
| ce-frontend-design | https://github.com/EveryInc/compound-engineering-plugin | adapted | 真正具备设计质量的 Web 界面构建 | Build web interfaces with genuine design quality, not AI slop... |
| ce-ideate | https://github.com/EveryInc/compound-engineering-plugin | adapted | 围绕主题生成并批判性评估落地想法 | asking what to improve, requesting idea generation, exploring surprising directions... |
| ce-plan | https://github.com/EveryInc/compound-engineering-plugin | adapted | 多步骤任务的结构化计划制定与深化 | the user says 'plan this', 'create a plan', 'how should we build'... |
| claude-api | https://github.com/anthropics/skills | adapted | Claude API / Anthropic SDK 应用开发与优化 | Build, debug, and optimize Claude API / Anthropic SDK apps. Apps built with this... |
| context-engineering | https://github.com/addyosmani/agent-skills | adapted | Agent 上下文优化配置 | starting a new session, when agent output quality degrades, when switching between tasks... |
| design-an-interface | https://github.com/mattpocock/skills | adapted | 并行生成多种接口设计方案对比 | user wants to design an API, explore interface options, compare module shapes... |
| idea-refine | https://github.com/addyosmani/agent-skills | adapted | 想法发散与收敛精炼 | an idea is still vague, when you need to stress-test assumptions before committing to a plan... |
| incremental-implementation | https://github.com/addyosmani/agent-skills | adapted | 增量式代码交付（避免一次性大量改动） | implementing any feature or change that touches more than one file |
| mcp-builder | https://github.com/anthropics/skills | adapted | MCP（Model Context Protocol）服务器开发 | building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/Typ... |
| planning-and-task-breakdown | https://github.com/addyosmani/agent-skills | adapted | 任务拆解与排期 | you have a spec or clear requirements and need to break work into implementable tasks... |
| scaffold-exercises | https://github.com/mattpocock/skills | adapted | 创建带章节/题目/解答/讲解的练习目录结构 | user wants to scaffold exercises, create exercise stubs, or set up a new course section... |
| source-driven-development | https://github.com/addyosmani/agent-skills | adapted | 基于官方文档的权威实现 | you want authoritative, source-cited code free from outdated patterns |
| spec-driven-development | https://github.com/addyosmani/agent-skills | adapted | 编码前先写规格说明 | starting a new project, feature, or significant change and no specification exists yet... |
| using-agent-skills | https://github.com/addyosmani/agent-skills | adapted | Agent Skill 发现与调用的元技能 | starting a session or when you need to discover which skill applies to the current task... |

## 代码质量

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| browser-testing-with-devtools | https://github.com/addyosmani/agent-skills | adapted | Chrome DevTools MCP 浏览器测试 | building or debugging anything that runs in a browser |
| ce-clean-gone-branches | https://github.com/EveryInc/compound-engineering-plugin | adapted | 清理远程已删除的本地分支及关联 worktree | the user says "clean up branches", "delete gone branches", "prune local branches"... |
| ce-code-review | https://github.com/EveryInc/compound-engineering-plugin | adapted | 结构化代码审查（多级 persona/置信度门禁/自动修复） | reviewing code changes before creating a PR |
| ce-debug | https://github.com/EveryInc/compound-engineering-plugin | adapted | 系统化根因定位与 Bug 修复 | debugging errors, investigating test failures, reproducing bugs from issue trackers (GitHub... |
| ce-dogfood-beta | https://github.com/EveryInc/compound-engineering-plugin | adapted | [BETA] 以 QA 工程师身份端到端 dogfood 当前分支 | you want a hands-off 'test everything we just built and make it actually work' pass before shipping... |
| ce-optimize | https://github.com/EveryInc/compound-engineering-plugin | adapted | 度量驱动的迭代优化循环（实验→评分→收敛） | optimizing clustering quality, search relevance, build performance... |
| ce-simplify-code | https://github.com/EveryInc/compound-engineering-plugin | adapted | 简化并精炼近期改动代码（清晰/复用/质量/效率） | Simplify and refine recently changed code for clarity, reuse, quality, and effic... |
| ce-test-browser | https://github.com/EveryInc/compound-engineering-plugin | adapted | 当前 PR 或分支影响页面的浏览器测试 | Run browser tests on pages affected by current PR or branch |
| ce-test-xcode | https://github.com/EveryInc/compound-engineering-plugin | adapted | XcodeBuildMCP 模拟器构建与 iOS 测试 | Build and test iOS apps on simulator using XcodeBuildMCP. Use after making iOS c... |
| ce-work | https://github.com/EveryInc/compound-engineering-plugin | adapted | 高效执行开发工作并保证质量完成功能 | Execute work efficiently while maintaining quality and finishing features |
| ce-work-beta | https://github.com/EveryInc/compound-engineering-plugin | adapted | [BETA] 带外部代理支持的 ce-work（实验性 Codex 委托） | [BETA] Execute work with external delegate support. Same as ce-work but includes... |
| ce-worktree | https://github.com/EveryInc/compound-engineering-plugin | adapted | 创建隔离的 git worktree 进行并行开发 | starting work that should not disturb the current checkout, or when `ce-work` or `ce-code-review` of... |
| code-review-and-quality | https://github.com/addyosmani/agent-skills | adapted | 多维度代码审查（合并前评估） | reviewing code written by yourself, another agent, or a human |
| code-simplification | https://github.com/addyosmani/agent-skills | adapted | 代码简化与清晰度重构 | refactoring code for clarity without changing behavior |
| debugging-and-error-recovery | https://github.com/addyosmani/agent-skills | adapted | 系统化根因调试方法论 | tests fail, builds break, behavior doesn't match expectations... |
| diagnose | https://github.com/mattpocock/skills | adapted | 顽固 Bug 诊断循环（复现→最小化→假设→验证→修复） | user says "diagnose this" / "debug this", reports a bug, says something is broken/throwing/failing... |
| git-guardrails-claude-code | https://github.com/mattpocock/skills | adapted | Claude Code Git 安全钩子（阻止危险操作） | user wants to prevent destructive git operations, add git safety hooks... |
| git-workflow-and-versioning | https://github.com/addyosmani/agent-skills | adapted | Git 工作流与版本管理 | making any code change |
| migrate-to-shoehorn | https://github.com/mattpocock/skills | adapted | TypeScript 测试 `as` 断言迁移至 shoehorn | user mentions shoehorn, wants to replace `as` in tests, or needs partial test data... |
| performance-optimization | https://github.com/addyosmani/agent-skills | adapted | 应用性能优化（Core Web Vitals、加载时间） | performance requirements exist, when you suspect performance regressions... |
| security-and-hardening | https://github.com/addyosmani/agent-skills | adapted | 安全加固与漏洞防护 | handling user input, authentication, data storage, or external integrations |
| setup-pre-commit | https://github.com/mattpocock/skills | adapted | Husky + lint-staged pre-commit 钩子配置 | user wants to add pre-commit hooks, set up Husky, configure lint-staged... |
| tdd | https://github.com/mattpocock/skills | adapted | 测试驱动开发（红绿重构循环） | user wants to build features or fix bugs using TDD, mentions "red-green-refactor"... |
| test-driven-development | https://github.com/addyosmani/agent-skills | adapted | 测试驱动开发（证明代码正确性） | implementing any logic, fixing any bug, or changing any behavior |
| webapp-testing | https://github.com/anthropics/skills | adapted | Playwright 本地 Web 应用测试与调试 | Toolkit for interacting with and testing local web applications using Playwright... |

## 文档沟通

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| caveman | https://github.com/mattpocock/skills | adapted | 极简压缩通信模式（节省约 75% Token） | user says "caveman mode", "talk like caveman", "use caveman"... |
| ce-demo-reel | https://github.com/EveryInc/compound-engineering-plugin | adapted | 为 PR 描述捕获视觉演示素材（GIF/录屏/截图） | shipping UI changes, CLI features, or any work with observable behavior that benefits from visual pr... |
| ce-doc-review | https://github.com/EveryInc/compound-engineering-plugin | adapted | 并行 persona 审阅需求或计划文档 | a requirements document or plan document exists and the user wants to improve it |
| ce-promote | https://github.com/EveryInc/compound-engineering-plugin | adapted | 为已发布功能撰写用户-facing 公告与营销文案 | the user says 'promote this', 'draft the announcement', 'write the launch copy'... |
| ce-proof | https://github.com/EveryInc/compound-engineering-plugin | adapted | 通过 Proof 进行 Markdown 人工回环审阅 | the user says "view this in proof", "share to proof", "HITL this doc"... |
| ce-release-notes | https://github.com/EveryInc/compound-engineering-plugin | adapted | 汇总 compound-engineering 插件近期发布变更 | the user types `/ce-release-notes` or asks "what changed in compound-engineering recently?" or "what... |
| ce-report-bug | https://github.com/EveryInc/compound-engineering-plugin | adapted | compound-engineering 插件 Bug 报告 | Report a bug in the compound-engineering plugin |
| ce-resolve-pr-feedback | https://github.com/EveryInc/compound-engineering-plugin | adapted | 并行评估并修复 PR 审查反馈 | addressing PR review comments, resolving review threads, or fixing code review feedback... |
| deprecation-and-migration | https://github.com/addyosmani/agent-skills | adapted | 废弃与迁移管理 | removing old systems, APIs, or features |
| doc-coauthoring | https://github.com/anthropics/skills | adapted | 文档协作共创流程（技术规格/决策文档） | user wants to write documentation, proposals, technical specs... |
| documentation-and-adrs | https://github.com/addyosmani/agent-skills | adapted | 架构决策记录（ADR）与项目文档维护 | making architectural decisions, changing public APIs, shipping features... |
| grill-me | https://github.com/mattpocock/skills | adapted | 面试式拷问计划/设计直到达成共同理解 | user wants to stress-test a plan, get grilled on their design... |
| grill-with-docs | https://github.com/mattpocock/skills | adapted | 基于现有文档对计划进行压力测试 | user wants to stress-test a plan against their project's language and documented decisions... |
| qa | https://github.com/mattpocock/skills | adapted | 交互式 Bug 报告与 GitHub Issue 提交 | user wants to report bugs, do QA, file issues conversationally... |
| ubiquitous-language | https://github.com/mattpocock/skills | adapted | DDD 统一语言词典提取与术语规范化 | user wants to define domain terms, build a glossary, harden terminology... |

## 知识管理

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| ce-compound | https://github.com/EveryInc/compound-engineering-plugin | adapted | 将刚解决的问题沉淀为团队知识或 CONCEPTS.md | Document a recently solved problem to compound your team's knowledge or CONCEPTS... |
| ce-compound-refresh | https://github.com/EveryInc/compound-engineering-plugin | adapted | 刷新 docs/solutions/ 下过时或漂移的学习文档 | the user asks to "refresh my learnings", "audit docs/solutions/"... |
| ce-sessions | https://github.com/EveryInc/compound-engineering-plugin | adapted | 跨 Claude Code/Codex/Cursor 搜索并追问会话历史 | asking what was worked on, what was tried before, how a problem was investigated across sessions... |
| ce-slack-research | https://github.com/EveryInc/compound-engineering-plugin | adapted | 搜索 Slack 并产出组织上下文综合研究报告 | the user says 'search slack for', 'what did we discuss about'... |
| ce-strategy | https://github.com/EveryInc/compound-engineering-plugin | adapted | 创建或维护 STRATEGY.md（产品方向/用户/指标/工作线） | starting a new product, updating direction, or when prompts like 'write our strategy'... |
| ima-skill | https://app-dl.ima.qq.com/skills/ima-skills-1.1.7.zip | adapted | IMA 知识库与笔记管理（上传/搜索/创建/编辑） | 统一的 IMA OpenAPI 技能，支持笔记管理和知识库操作。 当用户提到知识库、资料库、笔记、备忘录、记事，或者想要上传文件、添加网页到知识库、 搜索知识库... |
| kb-retriever | https://github.com/ConardLi/garden-skills | adapted | 本地知识库目录检索问答（PDF/Excel 渐进式检索） | 面向本地知识库目录的检索和问答助手。核心流程：(1)分层索引导航 (2)遇到PDF/Excel时必须先读取references学习处理方法 (3)处理文件后再检... |
| obsidian-vault | https://github.com/mattpocock/skills | adapted | Obsidian 笔记库搜索、创建与管理 | user wants to find, create, or organize notes in Obsidian |
| weread-skills | https://cdn.weread.qq.com/skills/weread-skills.zip | adapted | 微信读书助手（搜索/书架/笔记/书评/统计/推荐） | 微信读书助手 — 搜索书籍、管理书架、查看笔记划线、浏览书评、阅读统计、发现推荐好书 |

## 图表与可视化

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| architecture-diagram | https://github.com/Cocoon-AI/architecture-diagram-generator | adapted | 暗色主题架构图（HTML+SVG） | the user asks for system, infrastructure, cloud, security, or network topology diagrams... |
| baoyu-diagram | https://github.com/JimLiu/baoyu-skills | adapted | 专业暗色主题 SVG 图表（流程图/时序图/思维导图等） | Create professional, dark-themed SVG diagrams of any type — architecture diagram... |

## 发布与运维

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| ce-commit | https://github.com/EveryInc/compound-engineering-plugin | adapted | 创建信息清晰、价值导向的 git commit | the user says "commit", "commit this", "save my changes", "create a commit"... |
| ce-commit-push-pr | https://github.com/EveryInc/compound-engineering-plugin | adapted | 提交、推送并创建价值优先的 PR 描述 | the user says "commit and PR", "ship this", "create a PR", or "open a pull request"... |
| ce-product-pulse | https://github.com/EveryInc/compound-engineering-plugin | adapted | 生成产品体验与质量信号的时间窗口脉动报告 | the user says 'run a pulse', 'show me the pulse', 'how are we doing'... |
| ci-cd-and-automation | https://github.com/addyosmani/agent-skills | adapted | CI/CD 流水线自动化 | setting up or modifying build and deployment pipelines |
| release-skills | https://github.com/JimLiu/baoyu-skills | adapted | 通用发布工作流（Node/Python/Rust/GitHub Releases） | user says "release", "发布", "new version", "bump version", "push"... |
| shipping-and-launch | https://github.com/addyosmani/agent-skills | adapted | 生产发布准备（预发布检查清单/监控/灰度/回滚） | preparing to deploy to production |
| to-issues | https://github.com/mattpocock/skills | adapted | 计划/PRD 拆分为可执行 Issue（tracer-bullet 垂直切片） | user wants to convert a plan into issues, create implementation tickets... |
| to-prd | https://github.com/mattpocock/skills | adapted | 对话上下文生成 PRD 并发布至 Issue 追踪器 | user wants to create a PRD from the current context |

## Skill 管理与元技能

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| ce-setup | https://github.com/EveryInc/compound-engineering-plugin | adapted | 诊断并配置 compound-engineering 环境 | troubleshooting missing tools, verifying setup, or before onboarding |
| ce-update | https://github.com/EveryInc/compound-engineering-plugin | adapted | 检查 compound-engineering 插件版本并推荐更新 | the user says "update compound engineering", "check compound engineering version"... |
| HeavySkill | warehouse/local/heavyskill-adapted | adapted | Agentic Harness 中的深度思考内功心法 | - |
| skill-creator | https://github.com/anthropics/skills | adapted | Skill 创建、修改、性能评估与触发优化 | users want to create a skill from scratch, edit, or optimize an existing skill... |
| skill-installer | warehouse/local/skill-installer | adapted | 第三方 Skill 批量导入与本地适配 | a user asks to list candidate skills, stage a remote skill, or intake a GitHub-hosted skill for loca... |
| skill-optimizer | warehouse/local/skill-optimizer | adapted | Skill 审计评估、突变策略与自训练协议 | the user wants to optimize a skill, improve SKILL |
| write-a-skill | https://github.com/mattpocock/skills | adapted | Agent Skill 规范创建（渐进式披露+捆绑资源） | user wants to create, write, or build a new skill |

## 其他工具

| 技能名称 | 源地址 | 状态 | 描述 | 触发关键词 |
|---|---|---|---|---|
| ce-agent-native-audit | https://github.com/EveryInc/compound-engineering-plugin | adapted | Agent-Native 架构综合评审与评分 | Run comprehensive agent-native architecture review with scored principles |
| ce-polish | https://github.com/EveryInc/compound-engineering-plugin | adapted | 启动 dev server，在浏览器中协同迭代打磨功能 | Start the dev server, open the feature in a browser, and iterate on improvements... |
| ce-riffrec-feedback-analysis | https://github.com/EveryInc/compound-engineering-plugin | adapted | Riffrec 产品反馈工作流（会话包分析） | Riffrec product-feedback workflow. ALWAYS load when the user posts a `riffrec-*... |
| docx | https://github.com/anthropics/skills | adapted | Word 文档（.docx）创建、编辑与格式处理 | extracting or reorganizing content from |
| improve-codebase-architecture | https://github.com/mattpocock/skills | adapted | 代码库架构改进与重构机会发现 | the user wants to improve architecture, find refactoring opportunities... |
| lfg | https://github.com/EveryInc/compound-engineering-plugin | adapted | 端到端自主工程流水线（规划→开发→审查→测试→PR→CI） | Run the full autonomous engineering pipeline end-to-end (plan, work, code review... |
| ljg-book | https://github.com/lijigang/ljg-skills | adapted | 拆一本书，以「问题」为轴心走一条线。五件事：作者在答什么问题（问题），这个问题之前各流派/社会共识怎么答（零点），作者带来什么独特洞见——公式/理论框架/模型/概念四选一——相对共识挪动了什么（位移/... | user says '拆书', '拆这本', '分析这本书', '这本书在讲什么', '上帝之眼看这本书', '压缩一本书'... |
| ljg-card | https://github.com/lijigang/ljg-skills | adapted | Content caster (铸). Transforms content into PNG visuals. Seven molds: -l (default) long reading card... | user says '铸', 'cast', '做成图', '做成卡片', '做成信息图', '做成海报', '视觉笔记'... |
| ljg-invest | https://github.com/lijigang/ljg-skills | adapted | 投资分析, 生成一份深度投资分析报告。不做传统投资分析——核心判断是项目是否是一台「秩序创造机器」。Use when user says '投资报告', '投资分析', '分析这个项目', '写投资报... | user says '投资报告', '投资分析', '分析这个项目', '写投资报告', 'investment report'... |
| ljg-learn | https://github.com/lijigang/ljg-skills | adapted | Deep concept anatomist that deconstructs any concept through 8 exploration dimensions (history, dial... | user asks to explain, dissect, or deeply understand a concept, term, or idea |
| ljg-paper | https://github.com/lijigang/ljg-skills | adapted | Paper reader for non-academics. Reads a paper and tells it back as one continuous story to someone w... | user shares an arxiv link, paper URL, PDF, or asks to analyze a research paper |
| ljg-paper-flow | https://github.com/lijigang/ljg-skills | adapted | Paper workflow: read papers + cast cards in one go. Takes one or more arxiv links, paper URLs, PDFs, or paper names. | user says '论文流', 'paper flow', '读论文并做卡片', '论文卡片', or provides multiple papers wanting both analysis ... |
| ljg-paper-river | https://github.com/lijigang/ljg-skills | adapted | 论文倒读法：给一篇论文，递归找出它批判和改进的前序论文（最多5层），再找它之后的最新进展，从源头正向讲述问题演化史。以问题为轴，费曼式讲解每篇论文看到的问题和解法创新。Use when user sh... | user shares a paper and wants to understand its intellectual lineage... |
| ljg-plain | https://github.com/lijigang/ljg-skills | adapted | - | - |
| ljg-present | https://github.com/lijigang/ljg-skills | adapted | 演讲铸造器（Outline-Faithful）。基于 orgmode/markdown outline 层级 1:1 视觉化呈现——色块大字、ultra-bold 错位，原文不动只做美化。三档主题色 ... | 演讲铸造器（Outline-Faithful）。基于 orgmode/markdown outline 层级 1:1 视觉化呈现——色块大字、ultra-bol... |
| ljg-push | https://github.com/lijigang/ljg-skills | adapted | 把 ~/.claude/skills/ljg-* 里所有更新过的 skills 同步到 github repo (ljg-skills)，先推 master 分支（org-mode 输出风格），再切 ... | user says '/ljg-push', 'push skills', '推送 skills', '同步 skills'... |
| ljg-qa | https://github.com/lijigang/ljg-skills | adapted | 信息提问机。给一篇文章/论文/书，把核心观点抽成 Q-A 对——Question 切要害，不教科书；Answer 简洁清晰，有形式化收口，逻辑链完整。读者顺 Q 链走过，每个 A 砸下一枚钉子，复现作... | user says '问答', 'Q&A', 'QA', '提问', '抽取问题', '/ljg-qa', or shares an article/paper/book and asks for Q... |
| ljg-rank | https://github.com/lijigang/ljg-skills | adapted | 给一个领域，找出背后真正撑着它的几根独立的力。十几个现象砍到不可再少的生成器——砍完能把现象一个个生回来，才算数。Use when user says '降秩', '找秩', '秩是什么', '这个领... | user says '降秩', '找秩', '秩是什么', '这个领域靠什么撑着', '背后是什么', or wants to decompose any domain to its irreduci... |
| ljg-relationship | https://github.com/lijigang/ljg-skills | adapted | Relationship analyst combining structural diagnostics (5-layer framework) with psychoanalytic depth ... | user says "关系分析", "分析关系", "relationship", "人际关系", or describes a specific relationship problem they ... |
| ljg-roundtable | https://github.com/lijigang/ljg-skills | adapted | Structured roundtable discussion framework with a truth-seeking moderator who invites representative... | user says "圆桌讨论", "圆桌", "roundtable", "辩论", or wants to explore a topic through multi-perspective st... |
| ljg-skill-map | https://github.com/lijigang/ljg-skills | adapted | - | - |
| ljg-think | https://github.com/lijigang/ljg-skills | adapted | 追本之箭——纵向深钻思维工具。给一个观点、现象或问题，像箭一样一路向下钻到不可再分的本质。Use when user says '想透', '追本', '本质是什么', '为什么会这样', '深挖',... | user says '想透', '追本', '本质是什么', '为什么会这样', '深挖', '钻到底', 'think deep'... |
| ljg-travel | https://github.com/lijigang/ljg-skills | adapted | Deep travel research workflow for museums and ancient architecture. Input a city name, auto-generate... | user says '旅行研究', '博物馆功课', '古建功课', 'travel research', '出发前功课'... |
| ljg-word | https://github.com/lijigang/ljg-skills | adapted | Deep-dive English word mastery tool. Deconstructs a single English word into core semantics and epiphany. | user asks to explain/master a specific English word |
| ljg-word-flow | https://github.com/lijigang/ljg-skills | adapted | Word flow: deep-dive word analysis + infograph card in one go. Takes one or more English words, runs... | user says '词卡', 'word card', 'word flow', or provides English words wanting both analysis and visual... |
| ljg-writes | https://github.com/lijigang/ljg-skills | adapted | 写作引擎。像手术刀剖开一个观点，一层层剥到底。1000-1500 字。 | 写作引擎。像手术刀剖开一个观点，一层层剥到底。1000-1500 字。 |
| pdf | https://github.com/anthropics/skills | adapted | PDF 全面处理（阅读/合并/分割/OCR/表单/加密） | Use this skill whenever the user wants to do anything with PDF files... |
| serenity-skill | https://github.com/muxuuu/serenity-skill | adapted | Turn an investment agent into a supply-chain bottleneck hunter. Use this skill for source-backed inv... | Turn an investment agent into a supply-chain bottleneck hunter... |
| slack-gif-creator | https://github.com/anthropics/skills | adapted | Slack 优化 GIF 动画创建 | users request animated GIFs for Slack like "make me a GIF of X doing Y for Slack |
| xlsx | https://github.com/anthropics/skills | adapted | 电子表格处理（.xlsx/.csv 读写、清洗、转换） | Use this skill any time a spreadsheet file is the primary input or output... |
| zoom-out | https://github.com/mattpocock/skills | adapted | 全局视角与高阶上下文 | you're unfamiliar with a section of code or need to understand how it fits into the bigger picture... |

