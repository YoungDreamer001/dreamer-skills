# 技能目录

本目录按**使用场景**分类，便于快速找到合适的 Agent Skill。每个技能保留英文名称，关键触发词采用中英双语标注。

- ✅ = 已启用（可在当前项目或全局使用）
- ⬜ = 未启用（已安装但尚未关联到任何项目）
- ⛔ = 已弃用（当前目录中暂无）

---

## 内容创作

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `subtext-article` | ✅ | 将字幕、播客转写、ASR 输出等口语化文本整理成结构完整的中文长文。 | subtitle / transcript / 视频字幕 / 播客转写 / ASR转写 |
| `article-analyzer` | ✅ | 深度分析文章、论文、报告、笔记等长文本，输出结构化理解。 | 深度分析 / 分析这篇文章 / 论文速读 / paper scan / 思想精炼 / 认知升级 |
| `ljg-writes` | ⬜ | 像手术刀一样逐层剖开一个观点，生成 1000–1500 字中文文章。 | ljg-writes / 写作 |
| `edit-article` | ⬜ | 编辑、重构并润色文章草稿，提升清晰度与表达力度。 | edit article / 修改文章 / 润色文章 |
| `blog-checker` | ✅ | 审阅并评估中文技术博客文章质量。 | 审阅 / 检查文章 / 技术博客质量 |
| `merge-drafts` | ✅ | 将多个草稿合并成一篇高质量定稿。 | merge drafts / 合并稿子 / 合稿 / combine drafts |
| `concept-fable` | ✅ | 用三段式寓言包裹一个高阶领域概念，最后揭示并映射理论。 | 概念寓言 / 三段式寓言 / story-based concept explanation / Concept Reveal |

## 社交媒体与发布

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `baoyu-post-to-wechat` | ✅ | 发布内容到微信公众号（文章 / 贴图 / 图文）。 | 发布公众号 / post to wechat / 微信公众号 |
| `baoyu-post-to-weibo` | ✅ | 发布微博内容或头条文章。 | 发微博 / 发布微博 / post to Weibo / 微博头条文章 |
| `baoyu-post-to-x` | ✅ | 发布推文或长文到 X（Twitter）。 | post to X / tweet / publish to Twitter |
| `baoyu-danger-x-to-markdown` | ✅ | 将 X（Twitter）推文与文章转换为带 YAML front matter 的 Markdown。 | X to markdown / tweet to markdown / save tweet |

## 图像与视觉

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `baoyu-cover-image` | ✅ | 为文章生成封面图，支持多种画幅与风格维度。 | generate cover image / create article cover / make cover |
| `baoyu-compress-image` | ✅ | 将图片压缩为 WebP/PNG，自动选择工具。 | compress image / optimize image / convert to webp |
| `baoyu-infographic` | ✅ | 基于内容生成专业信息图，支持 21 种版式 × 22 种视觉风格。 | infographic / 信息图 / visual summary / 可视化 |
| `baoyu-article-illustrator` | ✅ | 分析文章结构并为文章配图。 | illustrate article / add images / 为文章配图 |
| `baoyu-comic` | ✅ | 创作知识漫画、教育漫画等多种风格。 | 知识漫画 / 教育漫画 / biography comic / tutorial comic |
| `baoyu-slide-deck` | ✅ | 从内容生成专业幻灯片图片。 | create slides / make a presentation / slide deck / PPT |
| `ian-xiaohei-illustrations` | ✅ | 生成 Ian「小黑」风格的中文正文配图。 | 小黑 / 手绘 / 正文配图 / 文章插图 |
| `ian-handdrawn-ppt` | ⬜ | 将文章/讲稿转为手绘风格的中文技术 PPT 页面图。 | PPT / slides / courseware / 课件 / 配图 / 效果图 |
| `visual-style-ppt` | ⬜ | 用 Image 2 生成纯图 PPT 页面并支持风格库存储复用。 | PPT Skill / 风格驱动 PPT / 图片版 PPT |
| `canvas-design` | ⬜ | 使用设计哲学创作 .png / .pdf 静态视觉艺术作品。 | poster / art / design / 海报设计 |
| `gpt-image-2` | ⬜ | 面向 GPT Image 2 的图像生成与编辑，覆盖海报/UI/产品/信息图等 80+ 模板。 | GPT Image 2 / 图像生成 / 图像编辑 |
| `ce-gemini-imagegen` | ⬜ | 使用 Gemini API 生成和编辑图像，支持文生图、图编辑、风格迁移等。 | Gemini image / image editing / logo generation |

## 网页与前端设计

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `web-design` | ✅ | 输入 PRD / 参考 URL / 截图，先输出 DESIGN.md，再生成达标网页。 | 帮我做个网站 / landing page / 设计一个页面 |
| `web-design-engineer` | ⬜ | 构建精美的 HTML/CSS/JS/React 网页、仪表盘、原型、动效等前端产物。 | web artifact / frontend deliverable / 网页开发 |
| `web-design-guidelines` | ⬜ | 审查 UI 代码是否符合 Web Interface Guidelines。 | review my UI / audit design / check accessibility |
| `frontend-design` | ⬜ | 打造具有真实设计感的前端界面，避免 AI 塑料感。 | frontend / landing page / dashboard / web app |
| `frontend-ui-engineering` | ⬜ | 构建生产级 UI 组件与界面。 | production UI / component / layout |
| `ce-frontend-design` | ⬜ | 同 `frontend-design`（compound-engineering 版本）。 | frontend / UI / dashboard |
| `baoyu-design` | ⬜ | 生成自包含 HTML 的 UI 原型、线框图、落地页、仪表盘等。 | design / mockup / prototype / landing page |
| `baoyu-diagram` | ✅ | 生成深色主题 SVG 架构图、流程图、时序图等。 | 画个图 / diagram / flowchart / sequence diagram |
| `architecture-diagram` | ✅ | 生成深色主题的系统/云/安全/网络架构图（HTML+SVG）。 | system diagram / infrastructure diagram / network topology |
| `html-ppt` | ✅ | 生成键盘可导航的静态 HTML 幻灯片，支持多种风格与布局。 | presentation / PPT / slides / deck / 幻灯片 / 演讲稿 |
| `guizang-ppt-skill` | ✅ | 生成横向翻页网页 PPT，含杂志风与瑞士国际主义两种风格。 | 杂志风 PPT / 瑞士风 PPT / horizontal swipe deck |
| `guizang-social-card-skill` | ✅ | 从文章/截图生成「归藏」风格社交媒体卡片与公众号封面。 | 小红书图文 / social cards / 微信公众号封面 / Swiss Style |

## 文档、演示与沟通

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `doc-coauthoring` | ⬜ | 引导用户协作编写技术文档、提案、决策记录等结构化内容。 | write documentation / draft spec / 写文档 |
| `documentation-and-adrs` | ⬜ | 记录架构决策与变更上下文，生成 ADR。 | architectural decision / ADR / 架构决策 |
| `internal-comms` | ⬜ | 撰写公司内部沟通材料（状态报告、领导更新、FAQ 等）。 | internal comms / status report / company newsletter |
| `ce-strategy` | ⬜ | 创建或维护 STRATEGY.md（目标问题、方案、用户、指标、工作线）。 | write strategy / roadmap / 战略文档 |
| `ubiquitous-language` | ⬜ | 从对话中提取 DDD 通用语言词汇表并保存。 | ubiquitous language / DDD / domain model / 领域术语 |
| `ce-compound` | ⬜ | 将刚解决的问题沉淀为团队知识或 docs/solutions/ 文档。 | compound knowledge / 沉淀知识 |
| `ce-compound-refresh` | ⬜ | 审查并更新过时的 docs/solutions/ 学习文档。 | refresh learnings / audit docs/solutions |
| `docx` | ⬜ | 创建、读取、编辑 Word 文档（.docx）。 | Word doc / .docx / 报告 / 备忘录 |
| `pptx` | ⬜ | 创建、读取、编辑 PowerPoint 演示文稿（.pptx）。 | deck / slides / presentation / .pptx |
| `web-video-presentation` | ⬜ | 将文章或口播稿做成「看起来像视频」的点击驱动网页演示。 | 视频演示 / 口播稿 / 网页视频 |

## 格式转换与文件处理

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `baoyu-markdown-to-html` | ✅ | 将 Markdown 转换为带微信主题样式的 HTML。 | markdown to html / md 转 html / 微信外链转底部引用 |
| `baoyu-url-to-markdown` | ✅ | 抓取任意 URL 并转换为 Markdown。 | save webpage as markdown / 网页转 markdown |
| `baoyu-format-markdown` | ✅ | 格式化 Markdown 文件，补齐 frontmatter、标题、列表等。 | format markdown / beautify article / 美化文章 |
| `baoyu-translate` | ✅ | 中英多模式翻译（快速/标准/精翻），支持术语表。 | translate / 翻译 / 精翻 / localize / 本地化 |
| `baoyu-youtube-transcript` | ✅ | 下载 YouTube 字幕/封面，支持多语言、翻译、章节。 | YouTube transcript / 字幕 / 视频封面 |
| `pdf` | ⬜ | 处理 PDF：读取、合并、拆分、旋转、填表、OCR 等。 | PDF / 合并 PDF / 拆分 PDF / OCR |
| `xlsx` | ⬜ | 处理电子表格：读取、编辑、清洗、转换、建表。 | xlsx / spreadsheet / 表格 / CSV |

## 开发辅助与工程工作流

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `ce-work` | ⬜ | 高效执行任务并保持质量，完成特性开发。 | ce-work / 执行工作 |
| `ce-work-beta` | ⬜ | ce-work 实验版，含 Codex 委派模式。 | ce-work-beta |
| `ce-plan` | ⬜ | 为软件特性、研究流程等创建结构化计划。 | plan this / create a plan / 制定计划 |
| `ce-brainstorm` | ⬜ | 通过协作对话探索需求并产出需求文档。 | let's brainstorm / what should we build / 头脑风暴 |
| `ce-ideate` | ⬜ | 针对话题生成并批判性评估落地想法。 | ideate / give me ideas / surprise me |
| `ce-debug` | ⬜ | 系统性定位并修复 bug。 | debug this / fix this bug / trace error / 调试 |
| `diagnose` | ⬜ |  disciplined 诊断循环：复现 → 最小化 → 假设 → 修复 → 回归测试。 | diagnose this / 诊断 / performance regression |
| `debugging-and-error-recovery` | ⬜ | 系统性根因调试指南。 | tests fail / build breaks /  unexpected error |
| `incremental-implementation` | ⬜ | 将触及多文件的改动分增量交付。 | incremental / 分步实现 |
| `planning-and-task-breakdown` | ⬜ | 将工作拆分为可执行的有序任务。 | task breakdown / 拆分任务 |
| `spec-driven-development` | ⬜ | 在编码前先创建规格文档。 | spec-driven / 写规格 |
| `source-driven-development` | ⬜ | 基于官方文档做权威、带引用的实现决策。 | source-cited / 官方文档 |
| `tdd` | ⬜ | 测试驱动开发，red-green-refactor 循环。 | TDD / red-green-refactor / test-first |
| `test-driven-development` | ⬜ | 用测试驱动任何逻辑、bug 修复或行为变更。 | write tests / test-driven |
| `mcp-builder` | ⬜ | 创建高质量 MCP 服务器，集成外部 API 或服务。 | MCP server / FastMCP / MCP SDK |
| `claude-api` | ⬜ | 构建、调试和优化 Claude API / Anthropic SDK 应用。 | Claude API / Anthropic SDK / prompt caching |
| `api-and-interface-design` | ⬜ | 指导稳定的 API 与模块接口设计。 | API design / REST / GraphQL / interface design |
| `design-an-interface` | ⬜ | 用并行子代理生成多种迥异的接口设计方案。 | design it twice / 接口方案 |
| `scaffold-exercises` | ⬜ | 创建带章节、题目、解答和讲解的练习目录结构。 | scaffold exercises / 练习模板 |
| `migrate-to-shoehorn` | ⬜ | 将测试中的 `as` 断言迁移到 @total-typescript/shoehorn。 | shoehorn / replace `as` |
| `ce-agent-native-architecture` | ⬜ | 构建以 Agent 为一等公民的应用。 | agent-native / MCP tools / self-modifying systems |
| `ce-agent-native-audit` | ⬜ | 对 agent-native 架构进行评分式全面审查。 | agent-native audit |

## 代码质量与 Git 工作流

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `ce-code-review` | ⬜ | 结构化代码审查，应用安全修复并提交。 | code review / 代码审查 |
| `ce-resolve-pr-feedback` | ⬜ | 评估并修复 PR 审查反馈。 | resolve PR feedback / 处理 review |
| `ce-simplify-code` | ⬜ | 简化最近修改的代码，提升清晰度和可维护性。 | simplify code / 简化代码 |
| `code-review-and-quality` | ⬜ | 多维度代码审查，合并前使用。 | code review / 代码质量 |
| `code-simplification` | ⬜ | 在不改变行为的前提下重构代码以提升清晰度。 | refactor for clarity / 简化代码 |
| `improve-codebase-architecture` | ⬜ | 基于 CONTEXT.md 与 ADR 发现架构深化机会。 | improve architecture / 架构优化 |
| `setup-pre-commit` | ⬜ | 配置 Husky + lint-staged 的 pre-commit hooks。 | pre-commit / Husky / lint-staged |
| `git-workflow-and-versioning` | ⬜ | 规范 git 分支、提交与冲突处理流程。 | git workflow / branch / commit |
| `git-guardrails-claude-code` | ⬜ | 设置 Claude Code hooks 拦截危险 git 操作。 | git safety hooks / block git push |
| `ce-clean-gone-branches` | ⬜ | 清理远程已不存在但本地仍保留的分支。 | clean up branches / prune local branches |
| `ce-commit` | ⬜ | 创建信息清晰、价值明确的 git commit。 | commit / create a commit / 提交 |
| `ce-commit-push-pr` | ⬜ | 提交、推送并打开 PR，生成价值优先的描述。 | commit and PR / create a PR / ship this |
| `ce-worktree` | ⬜ | 创建隔离的 git worktree 进行并行开发或审查。 | git worktree / 并行工作 |

## 测试与浏览器

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `webapp-testing` | ⬜ | 使用 Playwright 与本地 Web 应用交互并测试。 | Playwright / browser testing / 前端测试 |
| `ce-test-browser` | ⬜ | 针对当前 PR 或分支影响的页面运行浏览器测试。 | browser tests / 浏览器测试 |
| `ce-test-xcode` | ⬜ | 在 iOS 模拟器上构建并测试应用。 | Xcode / iOS test / simulator |
| `browser-testing-with-devtools` | ⬜ | 通过 Chrome DevTools MCP 在真实浏览器中测试与调试。 | browser debugging / DevTools / DOM inspect |
| `ce-dogfood-beta` | ⬜ | [BETA] 以 QA 视角端到端自测当前分支并修复问题。 | dogfood / QA pass / test everything |
| `ce-demo-reel` | ⬜ | 为 PR 生成演示 GIF、终端录屏或截图。 | demo reel / GIF / screenshot / 演示 |

## 部署、运维与发布

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `deploy-to-vercel` | ⬜ | 部署应用到 Vercel 并返回预览链接。 | deploy to Vercel / 部署 / preview |
| `vercel-cli-with-tokens` | ⬜ | 使用 token 认证通过 Vercel CLI 部署与管理项目。 | vercel CLI / access token |
| `shipping-and-launch` | ⬜ | 准备生产上线，提供清单、监控、分阶段发布与回滚策略。 | production launch / 上线准备 |
| `ci-cd-and-automation` | ⬜ | 自动化 CI/CD 流水线设置。 | CI/CD / pipeline / 自动化部署 |
| `release-skills` | ✅ | 通用发布工作流，支持 Node/Python/Rust/Claude Plugin 等。 | release / 发布 / bump version / GitHub Release |
| `ce-promote` | ⬜ | 为刚发布的功能撰写用户公告与营销文案。 | promote this / launch copy / 发布公告 |
| `ce-product-pulse` | ⬜ | 生成时间窗口内的产品脉搏报告（用量、质量、错误）。 | run a pulse / weekly recap / launch-day check |
| `deprecation-and-migration` | ⬜ | 管理旧系统、API 或功能的弃用与迁移。 | deprecation / migration / 迁移 |

## React / Next.js / Vercel 最佳实践

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `vercel-react-best-practices` | ⬜ | Vercel Engineering 的 React / Next.js 性能优化指南。 | React / Next.js / performance |
| `vercel-composition-patterns` | ⬜ | 解决 boolean prop 泛滥等 React 组合模式。 | compound components / render props / composition |
| `vercel-react-native-skills` | ⬜ | React Native / Expo 高性能移动应用最佳实践。 | React Native / Expo / mobile performance |
| `vercel-react-view-transitions` | ⬜ | 使用 React View Transition API 实现原生感动画。 | ViewTransition / page transition / shared element |

## 性能、安全与可靠性

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `performance-optimization` | ⬜ | 优化应用性能，改善 Core Web Vitals 与加载时间。 | performance / Core Web Vitals / 性能优化 |
| `security-and-hardening` | ⬜ | 加固代码以抵御常见漏洞。 | security / authentication / 安全加固 |
| `ce-report-bug` | ⬜ | 向 compound-engineering 插件报告 bug。 | report bug / 报告 bug |
| `ce-release-notes` | ⬜ | 汇总 compound-engineering 插件近期发布说明。 | /ce-release-notes / what changed |
| `ce-update` | ⬜ | 检查 compound-engineering 插件是否为最新版。 | update compound engineering / ce update |

## 算法艺术与创意编程

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `algorithmic-art` | ⬜ | 使用 p5.js 创作算法艺术、生成艺术与粒子系统。 | generative art / algorithmic art / flow fields |

## 投资与研究

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `serenity-skill` | ⬜ | 以供应链瓶颈猎人视角进行投资/产业研究。 | Serenity / 深度调研 / 产业链 / 供应链 / 卡点 / rank candidates |
| `ljg-invest` | ⬜ | 生成以「秩序创造机器」为核心的深度投资分析报告。 | 投资报告 / 投资分析 / investment report / invest analysis |

## 阅读、学习与知识管理

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `ljg-read` | ⬜ | 伴读任意文本，提供翻译、结构批注与跨领域洞察。 | 伴读 / 陪我读 / read with me / companion read |
| `ljg-book` | ⬜ | 以「问题—零点—位移—落点—行囊」五件事拆读一本书。 | 拆书 / 分析这本书 / book / 压缩一本书 |
| `ljg-paper` | ⬜ | 以故事化方式向非学术读者讲解论文。 | 读论文 / 讲论文 / paper / analyze research paper |
| `ljg-paper-flow` | ⬜ | 读论文 + 自动生成视觉笔记卡片。 | 论文流 / paper flow / 论文卡片 |
| `ljg-paper-river` | ⬜ | 论文倒读法：追溯学术脉络与问题演化史。 | 倒读 / paper river / 论文溯源 / 论文演化 |
| `ljg-learn` | ⬜ | 从 8 个维度深度解剖任意概念。 | 解剖概念 / explain concept / learn concept / /ljg-learn |
| `ljg-word` | ⬜ | 深度拆解单个英文单词的核心语义。 | explain word / master word / 单词 |
| `ljg-word-flow` | ⬜ | 单词深度解析 + 信息图卡片一键生成。 | 词卡 / word card / word flow |
| `weread-skills` | ✅ | 微信读书助手：搜索书籍、管理书架、查看笔记与书评。 | 微信读书 / 书架 / 笔记 / 书评 |
| `obsidian-vault` | ⬜ | 在 Obsidian 知识库中搜索、创建与管理笔记。 | Obsidian / 笔记 / knowledge base |
| `ima-skill` | ✅ | 统一的 IMA OpenAPI 技能，管理笔记与知识库。 | 知识库 / 笔记 / 资料库 / 收藏网页 |
| `kb-retriever` | ⬜ | 面向本地知识库目录的检索与问答，支持 PDF/Excel 渐进式处理。 | 知识库检索 / 查资料 / 本地文档问答 |

## 思维、分析与对话

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `ljg-think` | ⬜ | 纵向深钻思维工具，追到一个观点不可再分的本质。 | 想透 / 追本 / 本质 / think deep / drill down |
| `ljg-rank` | ⬜ | 将一个领域的现象降秩到不可再少的基础生成器。 | 降秩 / 找秩 / 这个领域靠什么撑着 |
| `ljg-qa` | ⬜ | 将文章/论文/书核心观点抽取为环环相扣的 Q&A。 | 问答 / Q&A / 抽取问题 / /ljg-qa |
| `ljg-relationship` | ⬜ | 结合结构诊断与精神分析深度分析人际关系问题。 | 关系分析 / relationship / 人际关系 |
| `ljg-roundtable` | ⬜ | 组织多方代表围绕话题进行结构化圆桌辩论。 | 圆桌讨论 / roundtable / 辩论 |
| `idea-refine` | ⬜ | 通过发散与收敛思维将粗糙想法打磨为可执行概念。 | ideate / refine idea / stress-test plan |
| `grill-me` | ⬜ | 就计划或设计进行 relentlessly 追问，直到达成共同理解。 | grill me / stress-test / 拷问一下 |
| `grill-with-docs` | ⬜ | 对照领域模型与文档对计划进行挑战并更新文档。 | grill with docs / stress-test plan |
| `zoom-out` | ⬜ | 获得更宏观的上下文视角，理解代码在整体中的位置。 | zoom out / 全局视角 / bigger picture |

## 旅行与生活

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `ljg-travel` | ⬜ | 博物馆与古建筑的深度旅行研究，生成知识文档与便携参考卡。 | 旅行研究 / 博物馆功课 / 古建功课 / travel research |

## 提示词、技能与元工具

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `prompt-optimizer` | ✅ | 将模糊需求编译为工业级结构化提示词。 | optimize prompt / 优化提示词 / 写 prompt |
| `session-achieve` | ✅ | 复盘多轮对话，提取纠偏逻辑并沉淀黄金提示词。 | 复盘对话 / session review / 生成复盘报告 |
| `skill-creator` | ✅ | 创建、修改、评估与优化 Agent Skill。 | create skill / 创建技能 / eval skill / benchmark |
| `write-a-skill` | ⬜ | 按规范创建新的 Agent Skill。 | write a skill / build a skill |
| `skill-installer` | ⬜ | 将第三方技能拉取到 remote/ 并适配进 skills/。 | stage skill / install remote skill |
| `skill-optimizer` | ⬜ | 审计、评估并优化 Agent Skill。 | optimize skill / improve SKILL.md / eval skill |
| `using-agent-skills` | ⬜ | 发现并调用其他 Agent Skill 的元技能。 | discover skills / 发现技能 |
| `HeavySkill` | ✅ | 将「重思考」作为 Agent 工作内力的元能力。 | Heavy Thinking / 重思考 |
| `caveman` | ⬜ | 极简沟通模式，降低约 75% token 消耗。 | caveman mode / less tokens / be brief |

## 协作与项目管理

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `to-issues` | ⬜ | 将计划/规格拆分为可独立抓取的 issue。 | convert to issues / create tickets |
| `to-prd` | ⬜ | 将当前对话上下文转为 PRD 并发布到 issue tracker。 | create PRD / 写 PRD |
| `ce-sessions` | ⬜ | 跨 Claude Code / Codex / Cursor 搜索历史会话。 | session history / 历史会话 |
| `ce-slack-research` | ⬜ | 搜索 Slack 并生成组织上下文综合研究报告。 | search slack / slack context |
| `slack-gif-creator` | ⬜ | 创建适合 Slack 的优化动图。 | Slack GIF / animated GIF |
| `ce-proof` | ⬜ | 通过 Proof 进行 markdown 人工在环审阅。 | view in proof / HITL / share to proof |
| `qa` | ⬜ | 以对话方式报告 bug 并由 Agent 代为提交 GitHub issue。 | QA session / report bug / 提交 issue |
| `ce-riffrec-feedback-analysis` | ⬜ | Riffrec 产品反馈会话分析工作流。 | riffrec / product feedback |
| `context-engineering` | ⬜ | 优化 Agent 上下文配置，提升输出质量。 | context setup / rules files / 上下文配置 |
| `ce-setup` | ⬜ | 诊断并配置 compound-engineering 环境。 | setup / 环境配置 / 安装工具 |
| `ce-polish` | ⬜ | 启动开发服务器，在浏览器中迭代打磨功能。 | /ce-polish / polish feature |
| `lfg` | ⬜ | 端到端自主工程流水线（规划、开发、审查、测试、提交、PR、CI）。 | LFG / autonomous pipeline |

## 品牌与设计系统

| 技能名称 | 状态 | 中文说明 | 触发关键词 |
| --- | --- | --- | --- |
| `brand-guidelines` | ⬜ | 将 Anthropic 官方品牌色与字体应用到各种产物。 | brand guidelines / 品牌规范 |
| `theme-factory` | ⬜ | 为幻灯片、文档、落地页等应用或生成主题样式。 | theme / styling / 主题 |

## 已启用技能汇总（按项目）

| 技能名称 | 启用范围 |
| --- | --- |
| `article-analyzer` | 项目: kane_echoes, my-reports, kane_vault |
| `blog-checker` | 全局 |
| `concept-fable` | 全局 |
| `HeavySkill` | 全局 |
| `merge-drafts` | 项目: kane_echoes |
| `prompt-optimizer` | 全局 |
| `session-achieve` | 全局 |
| `subtext-article` | 项目: kane_echoes |
| `architecture-diagram` | 项目: kane_echoes |
| `baoyu-article-illustrator` | 项目: kane_echoes |
| `baoyu-comic` | 项目: kane_echoes |
| `baoyu-compress-image` | 项目: kane_echoes |
| `baoyu-cover-image` | 项目: kane_echoes |
| `baoyu-danger-gemini-web` | 项目: kane_echoes |
| `baoyu-danger-x-to-markdown` | 项目: kane_echoes |
| `baoyu-diagram` | 项目: kane_echoes, my-reports |
| `baoyu-format-markdown` | 项目: kane_echoes |
| `baoyu-infographic` | 项目: kane_echoes |
| `baoyu-markdown-to-html` | 项目: kane_echoes |
| `baoyu-post-to-wechat` | 项目: kane_echoes |
| `baoyu-post-to-weibo` | 项目: kane_echoes |
| `baoyu-post-to-x` | 项目: kane_echoes |
| `baoyu-slide-deck` | 项目: kane_echoes |
| `baoyu-translate` | 项目: kane_echoes |
| `baoyu-url-to-markdown` | 项目: kane_echoes |
| `baoyu-youtube-transcript` | 项目: kane_vault, kane_echoes |
| `guizang-ppt-skill` | 项目: kane_echoes |
| `guizang-social-card-skill` | 项目: kane_echoes |
| `html-ppt` | 项目: kane_echoes |
| `ian-handdrawn-ppt` | 项目: kane_echoes |
| `ian-xiaohei-illustrations` | 项目: kane_echoes |
| `ima-skill` | 项目: kane_echoes, kane_vault |
| `release-skills` | 项目: kane_echoes |
| `skill-creator` | 项目: hk-skills |
| `web-design` | 项目: kane_echoes, my-reports |
| `weread-skills` | 项目: kane_echoes, kane_vault |

---

*最后生成时间：2026-06-12*
