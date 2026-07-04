---
title: "HK-Skills 技能目录"
description: "按使用场景整理的中文技能目录，保留英文触发关键词。"
---

# HK-Skills 技能目录

> 本目录按实际使用场景重新组织，每个技能保留英文触发关键词，便于 Agent 匹配。\
> 状态说明：**✅ 已启用** | **⏸️ 未启用**

## 内容创作

| 状态 | 技能名称                        | 来源 | 说明                                          | 触发关键词                                                                                                                    |
| -- | --------------------------- | -- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ✅  | article-analyzer            | 本地 | 对文章、论文、博客、报告等进行结构化深度分析，输出多模块 Markdown 理解文档。 | the user asks for article analysis, 深度分析，分析这篇文章，拆解观点，论文速读，paper scan, 分析这篇论文，thought refinement, 思想精炼，提炼主线，高密度表达，        |
| ✅  | ce-brainstorm               | 远程 | 通过协作对话探索需求与方案，输出合适体量的需求文档。                  | the user says "let's brainstorm", "what should we build", or "help me think through X", presents a vague or ambitious fe |
| ✅  | ce-ideate                   | 远程 | 针对主题生成并批判性地评估扎根想法。                          | asking what to improve, requesting idea generation, exploring surprising directions, or wanting the AI to proactively su |
| ✅  | ce-plan                     | 远程 | 为多步骤任务创建结构化计划，并可深化已有计划。                     | the user says 'plan this', 'create a plan', 'how should we build', 'break this down', or when a brainstorm doc is ready  |
| ✅  | ce-strategy                 | 远程 | 创建或维护 STRATEGY.md，明确产品目标、打法与关键指标。           | starting a new product, updating direction, or when prompts like 'write our strategy', 'update the roadmap', 'what are w |
| ✅  | concept-fable               | 本地 | 用三段式寓言故事解释一个高阶领域概念，最后揭示并映射理论。               | the user asks for 概念寓言，三段式寓言，用寓言解释领域概念，story-based concept explanation, Concept Reveal, or asks to turn a domain into    |
| ✅  | douban-dice-review          | 本地 | 用六个理论骰子为电影生成豆瓣风格中文影评。                       | 用 6 个理论骰子为电影生成豆瓣风格中文影评。当用户要求写影评、生成影评、豆瓣影评、用骰子写影评、六个骰子写影评、为某部电影输出多份影评，尤其要求先检索电影信息...                                      |
| ✅  | edit-article                | 远程 | 通过重组结构与润色语言来编辑和改进文章草稿。                      | user wants to edit, revise, or improve an article draft                                                                  |
| ✅  | grill-me                    | 远程 | 通过犀利问答打磨计划或设计。                              | A relentless interview to sharpen a plan or design.                                                                      |
| ✅  | idea-refine                 | 远程 | 用发散与收敛思维把模糊想法打磨成清晰可执行概念。                    | an idea is still vague, when you need to stress-test assumptions before committing to a plan, or when you want to expand |
| ✅  | ljg-book                    | 远程 | 以问题为核心拆解一本书，输出结构分析、位移与预测。                   | user says '拆书', '拆这本', '分析这本书', '这本书在讲什么', '上帝之眼看这本书', '压缩一本书', 'book', or shares a book name wanting structural analysi |
| ✅  | ljg-learn                   | 远程 | 从八个维度解剖一个概念，压缩成顿悟式理解。                       | user asks to explain, dissect, or deeply understand a concept, term, or idea                                             |
| ✅  | ljg-paper                   | 远程 | 用七幕故事线把学术论文讲给非学术读者听。                        | user shares an arxiv link, paper URL, PDF, or asks to analyze a research paper                                           |
| ✅  | ljg-paper-flow              | 远程 | 读论文并一键生成分析文档与视觉笔记卡片。                        | user says '论文流', 'paper flow', '读论文并做卡片', '论文卡片', or provides multiple papers wanting both analysis and cards            |
| ✅  | ljg-paper-river             | 远程 | 递归追溯论文的引用脉络与学术演化史。                          | user shares a paper and wants to understand its intellectual lineage, citation chain, problem evolution, or says '倒读', ' |
| ✅  | ljg-plain                   | 远程 | （ljg-skills 占位 skill）                       | -                                                                                                                        |
| ✅  | ljg-qa                      | 远程 | 把文章/论文/书的核心观点抽取成要害 Q-A 对。                   | user says '问答', 'Q\&A', 'QA', '提问', '抽取问题', '/ljg-qa', or shares an article/paper/book and asks for Q-A extraction       |
| ✅  | ljg-rank                    | 远程 | 给一个领域降维，找出支撑它的几根独立生成器。                      | user says '降秩', '找秩', '秩是什么', '这个领域靠什么撑着', '背后是什么', or wants to decompose any domain to its irreducible generators       |
| ✅  | ljg-read                    | 远程 | 伴读任意文本，提供翻译、结构批注、深度提问与跨域洞察。                 | user says '伴读', '陪我读', '读这篇', 'read with me', 'companion read', or shares a text/URL wanting guided reading              |
| ✅  | ljg-think                   | 远程 | 纵向深钻一个观点、现象或问题，追到不可再分的本质。                   | user says '想透', '追本', '本质是什么', '为什么会这样', '深挖', '钻到底', 'think deep', 'drill down', or wants to trace any idea/phenomenon  |
| ✅  | ljg-word                    | 远程 | 深度拆解一个英语单词的核心语义与用法。                         | user asks to explain/master a specific English word                                                                      |
| ✅  | ljg-word-flow               | 远程 | 英语单词深度分析 + 信息图卡片一键生成。                       | user says '词卡', 'word card', 'word flow', or provides English words wanting both analysis and visual card                |
| ✅  | ljg-writes                  | 远程 | 像手术刀一样逐层剖开观点，输出 1000-1500 字中文文章。            | 写作引擎。像手术刀剖开一个观点，一层层剥到底。1000-1500 字。                                                                                      |
| ✅  | merge-drafts                | 本地 | 将多份草稿合并为一篇高质量文章。                            | Merges multiple draft documents into a single high-quality article. Reads all dr...                                      |
| ✅  | planning-and-task-breakdown | 远程 | 把明确需求拆分为可执行的有序任务。                           | you have a spec or clear requirements and need to break work into implementable tasks                                    |
| ✅  | subtext-article             | 本地 | 将字幕、转写稿、播客文稿等转写为忠实的长篇中文文章。                  | the user asks to turn subtitles, subtext, transcript, video captions, B 站字幕，YouTube 字幕，ASR 转写，口语稿，播客转写，or 视频文稿 into a    |
| ✅  | writing-shape               | 远程 | 将 raw material 逐段塑造成一篇完整文章。                 | Writing, exploit — shape raw material into an article, paragraph by paragraph.                                           |
| ⏸️ | grill-with-docs             | 远程 | 在打磨计划的同时生成 ADR 与术语表文档。                      | A relentless interview to sharpen a plan or design, which also creates docs (ADR...                                      |
| ⏸️ | grilling                    | 远程 | 对用户计划或设计进行无情追问与压力测试。                        | the user wants to stress-test a plan before building, or uses any 'grill' trigger phrases                                |
| ⏸️ | implement                   | 远程 | 基于 PRD 或 issue 集实现一段具体工作。                   | Implement a piece of work based on a PRD or set of issues.                                                               |
| ⏸️ | prototype                   | 远程 | 为设计问题快速搭建可丢弃的原型。                            | Build a throwaway prototype to flesh out a design — a runnable terminal app for ...                                      |
| ⏸️ | writing-beats               | 远程 | 把原始素材组装成一段有节奏的内容旅程。                         | Writing, exploit — assemble raw material into a journey of beats, grounding each...                                      |
| ⏸️ | writing-fragments           | 远程 | 从原始素材中挖掘碎片化灵感，暂不结构化。                        | Writing, explore — mine raw fragments, no structure yet.                                                                 |
| ✅  | blog-checker                | 远程 | 审阅和评估中文技术博客文章的质量，仅用于技术类内容。                  | 用户要求审阅、检查、评估中文技术博客/技术文章/技术写作时触发。                                                                                         |
| ⏸️ | jianying-editor             | 远程 | 剪映 AI 自动化剪辑的高级封装，支持录屏、素材导入、字幕生成与项目导出。       | 用户提到剪映、JianYing、视频剪辑、自动化剪辑、字幕生成、项目导出时触发。                                                                                 |

## 社交媒体

| 状态 | 技能名称                      | 来源 | 说明                                            | 触发关键词                                                                                                                      |
| -- | ------------------------- | -- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ✅  | baoyu-post-to-wechat      | 远程 | 通过 API 或 Chrome CDP 发布微信公众号文章/贴图。             | user mentions "发布公众号", "post to wechat", "微信公众号", or "贴图/图文/文章"                                                            |
| ✅  | baoyu-post-to-weibo       | 远程 | 发微博、头条文章与多媒体内容。                               | user asks to "post to Weibo", "发微博", "发布微博", "publish to Weibo", "share on Weibo", "写微博", or "微博头条文章"                      |
| ✅  | baoyu-post-to-x           | 远程 | 发布 X/Twitter 帖子与长文。                           | available and fall back to real Chrome CDP scripts only when allowed                                                       |
| ✅  | baoyu-youtube-transcript  | 远程 | 下载 YouTube 字幕、翻译、章节与封面。                       | user asks to "get YouTube transcript", "download subtitles", "get captions", "YouTube 字幕", "YouTube 封面", "视频封面", "video th |
| ✅  | guizang-social-card-skill | 远程 | 从文章/脚本生成小红书图文与公众号封面套图。                        | the user asks for 小红书图文，Rednote/Xiaohongshu images, social cards, carousel images, 3:4 covers, 微信公众号封面，WeChat 21:9 + 1     |
| ✅  | ljg-card                  | 远程 | 把内容铸造成多种版式的 PNG 视觉卡片（阅读卡片、信息图、漫画、白板、小红书大字图等）。 | user says '铸', 'cast', '做成图', '做成卡片', '做成信息图', '做成海报', '视觉笔记', 'sketchnote', '杂志', 'editorial', '漫画', 'comic', 'manga',    |
| ✅  | ljg-present               | 远程 | 按 outline 层级 1:1 生成色块大字风格的演讲 HTML。            | 演讲铸造器（Outline-Faithful）。基于 orgmode/markdown outline 层级 1:1 视觉化呈现——色块大字、ultra-bol...                                        |
| ⏸️ | pptx                      | 远程 | 创建、读取、编辑任何 .pptx 文件。                          | deck,                                                                                                                      |
| ⏸️ | slack-gif-creator         | 远程 | 创建适合 Slack 使用的动画 GIF。                         | users request animated GIFs for Slack like "make me a GIF of X doing Y for Slack                                           |
| ⏸️ | visual-style-ppt          | 远程 | 用 Image 2 生成风格驱动的图片版 PPTX。                    | the user asks for a "PPT Skill", "风格驱动 PPT", "提炼风格做 PPT", "调用某个风格做 PPT", "图片版 PPT", "保存 PPT 风格", "列出 PPT 风格", "文档生成 PPT"   |

## 图像处理

| 状态 | 技能名称                                 | 来源 | 说明                                           | 触发关键词                                                                                                                    |
| -- | ------------------------------------ | -- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ✅  | architecture-diagram                 | 远程 | 创建深色主题的自包含 HTML+SVG 架构图。                     | the user asks for system, infrastructure, cloud, security, or network topology diagrams                                  |
| ✅  | baoyu-article-illustrator            | 远程 | 分析文章结构并为文章生成 Type × Style × Palette 三维配图。    | user asks to "illustrate article", "add images", "generate images for article", or "为文章配图"                               |
| ✅  | baoyu-comic                          | 远程 | 生成多种风格与调性的知识教育漫画。                            | user asks to create "知识漫画", "教育漫画", "biography comic", "tutorial comic", or "Logicomix-style comic"                      |
| ✅  | baoyu-compress-image                 | 远程 | 将图片压缩为 WebP/PNG 并自动选择工具。                     | user asks to "compress image", "optimize image", "convert to webp", or reduce image file size                            |
| ✅  | baoyu-cover-image                    | 远程 | 生成文章封面图，支持 5 维度组合与多种画幅。                      | user asks to "generate cover image", "create article cover", or "make cover"                                             |
| ✅  | baoyu-danger-gemini-web              | 远程 | 通过逆向工程 Gemini Web API 生成图像与文本，支持多轮对话。        | other skills need image generation backend, or when user requests "generate image with Gemini", "Gemini text generation" |
| ✅  | baoyu-design                         | 远程 | 生成 UI 原型、落地页、Dashboard、PPT 等自包含 HTML 设计稿。    | ever the user asks to design, mock up, prototype, wireframe, visualize, explore, or make a PPT/deck for an interface, pr |
| ✅  | baoyu-diagram                        | 远程 | 创建专业深色 SVG 架构图、流程图、时序图、思维导图等。                | Create professional, dark-themed SVG diagrams of any type — architecture diagram...                                      |
| ✅  | baoyu-infographic                    | 远程 | 用 21 种布局 × 22 种视觉风格生成专业信息图。                  | user asks to create "infographic", "信息图", "visual summary", "可视化", or "高密度信息大图"                                          |
| ✅  | comic-ip-onboarder                   | 远程 | 把照片/玩偶/头像接入简约漫画信息图体系，生成 IP DNA 档案。           | 把用户自己的照片、玩偶、头像、角色设定或品牌吉祥物接入简约漫画信息图体系时使用。用于新 IP 入驻、IP DNA 分析、把照片转成扁平手绘漫画角色、生成正面全身...                                      |
| ⏸️ | algorithmic-art                      | 远程 | 用 p5.js 创作算法艺术、粒子系统与流场。                      | Creating algorithmic art using p5.js with seeded randomness and interactive para...                                      |
| ⏸️ | brand-guidelines                     | 远程 | 将 Anthropic 品牌色与字体应用到各类视觉产物。                 | Applies Anthropic's official brand colors and typography to any sort of artifact...                                      |
| ⏸️ | canvas-design                        | 远程 | 用设计哲学创作 PNG/PDF 静态视觉作品。                      | Create beautiful visual art in .png and .pdf documents using design philosophy. ...                                      |
| ⏸️ | ce-gemini-imagegen                   | 远程 | 用 Gemini API 生成与编辑图像，支持文生图、图编辑、风格迁移。         | This skill should be used when generating and editing images using the Gemini AP...                                      |
| ⏸️ | gpt-image-2                          | 远程 | 面向 GPT Image 2 的图像生成/编辑技能，覆盖 18 大类 80+ 模板。   | 面向 GPT Image 2 的图像生成 / 编辑技能。可在 3 种环境下使用：(A) Garden 本地模式，通过 OpenAI 兼容接口直接出图并落盘；(B...                                      |
| ⏸️ | lanshu-animated-architecture-diagram | 远程 | 创建岚叔风格手绘动态架构/流程 GIF，附带可编辑 .excalidraw 与静态预览。 | Create premium hand-drawn architecture and process diagrams in the Lanshu animat...                                      |
| ⏸️ | pixel2motion                         | 远程 | 将栅格 logo 转为极简 SVG 并生成迪士尼原则驱动的 logo 动画 HTML。  | asked to animate a logo, build a logo reveal / splash screen / brand intro, convert a logo image into animated SVG or HT |
| ⏸️ | theme-factory                        | 远程 | 为幻灯片、文档、落地页等产物应用或生成主题。                       | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs,...                                      |

## 网页设计

| 状态 | 技能名称                    | 来源 | 说明                                                   | 触发关键词                                                                                                                    |
| -- | ----------------------- | -- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ✅  | baoyu-slide-deck        | 远程 | 从内容生成专业幻灯片图片。                                        | user asks to "create slides", "make a presentation", "generate deck", "slide deck", or "PPT"                             |
| ✅  | ce-frontend-design      | 远程 | 打造有真实设计品质的网页界面，并用截图验证结果。                             | Build web interfaces with genuine design quality, not AI slop. Use for any front...                                      |
| ✅  | frontend-design         | 远程 | 为新建或重塑 UI 提供有辨识度的视觉设计指导。                             | Guidance for distinctive, intentional visual design when building new UI or resh...                                      |
| ✅  | frontend-ui-engineering | 远程 | 构建生产级用户界面组件与布局。                                      | building or modifying user-facing interfaces                                                                             |
| ✅  | guizang-ppt-skill       | 远程 | 生成横向翻页网页 PPT，含 WebGL 背景与杂志/瑞士风两种风格。                  | 生成横向翻页网页 PPT（单 HTML 文件），含 WebGL 背景、章节幕封、数据大字报、图片网格等模板。提供两种风格：① "电子杂志 × 电子墨水"（衬线 ...                                      |
| ✅  | html-ppt                | 远程 | 用模板驱动生成多种风格、可键盘导航的静态 HTML 演示稿。                       | the user asks for a presentation, PPT, slides, keynote, deck, slideshow, "幻灯片", "演讲稿", "做一份 PPT", "做一份 slides", a reveal |
| ✅  | web-artifacts-builder   | 远程 | 用 React、Tailwind、shadcn/ui 创建复杂多组件 Claude artifacts。 | Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts ...                                      |
| ✅  | web-design              | 远程 | 从 PRD/参考 URL/截图生成 DESIGN.md 并据此产出达标 web 代码。          | Web 视觉设计 SKILL。输入 PRD / 参考 URL / 截图 / 关键词（任意组合），先产出一份标准化 DESIGN.md 设计规范，用户确认后据此生...                                      |
| ✅  | web-design-engineer     | 远程 | 用 HTML/CSS/JS/React 构建精致的可视化 web 产物。                 | the user wants a browser-rendered, interactive, or presentational front-end deliverable                                  |
| ✅  | web-design-guidelines   | 远程 | 审查 UI 代码是否符合 Web Interface Guidelines。               | asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices"   |
| ✅  | webapp-testing          | 远程 | 用 Playwright 与本地 web 应用交互、截图、调试与验证。                  | Toolkit for interacting with and testing local web applications using Playwright...                                      |
| ⏸️ | web-video-presentation  | 远程 | 把文章/口播稿做成点击驱动的 16:9 网页演示，可合成音频。                      | 把一篇文章或口播稿，做成"看起来像视频"的点击驱动 16:9 网页演示，可选合成口播音频。流程：原始文章 → **一次产出**口播稿 + outline 开发计...                                      |

## 开发辅助

| 状态 | 技能名称                         | 来源 | 说明                                         | 触发关键词                                                                                                                                                |
| -- | ---------------------------- | -- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅  | ce-agent-native-architecture | 远程 | 设计 Agent 作为一等公民的应用架构。                      | Build applications where agents are first-class citizens. Use this skill when de...                                                                  |
| ✅  | ce-agent-native-audit        | 远程 | 对 Agent-Native 架构进行评分式全面审查。                | Run comprehensive agent-native architecture review with scored principles                                                                            |
| ✅  | ce-clean-gone-branches       | 远程 | 清理远程已不存在的本地分支及其 worktree。                  | the user says "clean up branches", "delete gone branches", "prune local branches", "clean gone", or wants to remove stal                             |
| ✅  | ce-commit                    | 远程 | 用清晰、价值导向的信息创建 git commit。                  | the user says "commit", "commit this", "save my changes", "create a commit", or wants to commit staged or unstaged work                              |
| ✅  | ce-commit-push-pr            | 远程 | 提交、推送并打开价值优先的自适应 PR。                       | the user says "commit and PR", "ship this", "create a PR", or "open a pull request"                                                                  |
| ✅  | ce-demo-reel                 | 远程 | 为 PR 描述捕获 GIF、终端录屏或截图形式的演示证据。              | shipping UI changes, CLI features, or any work with observable behavior that benefits from visual proof                                              |
| ✅  | ce-product-pulse             | 远程 | 生成时间窗口内的产品使用与质量脉搏报告。                       | the user says 'run a pulse', 'show me the pulse', 'how are we doing', 'weekly recap', 'launch-day check', or passes a ti                             |
| ✅  | ce-report-bug                | 远程 | 向 compound-engineering 插件报告 bug。           | Report a bug in the compound-engineering plugin                                                                                                      |
| ✅  | ce-riffrec-feedback-analysis | 远程 | 处理 Riffrec 产品反馈包（录屏 + 事件+json）。            | Riffrec product-feedback workflow. ALWAYS load when the user posts a \`riffrec-\*....                                                                |
| ✅  | ce-sessions                  | 远程 | 跨 Claude Code/Codex/Cursor 搜索历史会话并回答问题。    | asking what was worked on, what was tried before, how a problem was investigated across sessions, what happened recently                             |
| ✅  | ce-setup                     | 远程 | 诊断并配置 compound-engineering 环境依赖。           | troubleshooting missing tools, verifying setup, or before onboarding                                                                                 |
| ✅  | ce-slack-research            | 远程 | 搜索 Slack 并产出组织上下文合成研究报告。                   | the user says 'search slack for', 'what did we discuss about', 'slack context for', or 'what does the team think about'                              |
| ✅  | ce-work                      | 远程 | 高效执行开发任务并保证质量、完成功能。                        | Execute work efficiently while maintaining quality and finishing features                                                                            |
| ✅  | ce-work-beta                 | 远程 | ce-work 实验版，支持外部代理委托以节省 token。             | \[BETA] Execute work with external delegate support. Same as ce-work but includes...                                                                 |
| ✅  | ce-worktree                  | 远程 | 确保工作在隔离的 git worktree 中不干扰当前 checkout。     | starting work that should stay isolated, or when `ce-work` or `ce-code-review` offers a worktree option                                              |
| ✅  | HeavySkill                   | 本地 | （占位 skill，暂无描述）                            | -                                                                                                                                                    |
| ✅  | it-system-skill-distiller    | 本地 | 将 IT 业务系统/源码/API 逆向蒸馏为 AI 可调用的 Skills 技能包。 | 将已有 IT 业务系统、企业应用、SaaS 产品、内部工具或遗留业务代码库逆向蒸馏为 AI 可理解、可检索、可调用的独立 Skills 技能包。适用于用户要求分...                                                                  |
| ✅  | lfg                          | 远程 | 端到端自主工程流水线：计划、实现、Review、测试、提交、PR、CI 看守。    | Run the full autonomous engineering pipeline end-to-end (plan, work, code review\...                                                                 |
| ✅  | mcp-builder                  | 远程 | 创建高质量 MCP Server 以让 LLM 调用外部服务。            | building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK)                                |
| ✅  | release-skills               | 远程 | 通用发布工作流，支持版本号、Changelog、GitHub Release 等。  | user says "release", "发布", "new version", "bump version", "push", "推送", "release notes", "GitHub Release", or "回填 Releas                             |
| ✅  | request-refactor-plan        | 远程 | 通过用户访谈生成详细重构计划并提交为 GitHub issue。           | user wants to plan a refactor, create a refactoring RFC, or break a refactor into safe incremental steps                                             |
| ✅  | shipping-and-launch          | 远程 | 准备生产发布，提供预发布检查单、监控与回滚策略。                   | preparing to deploy to production                                                                                                                    |
| ✅  | skill-creator                | 远程 | 创建、修改、优化 Skills 并运行评测。                     | users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark ski                             |
| ✅  | skill-evaluator              | 本地 | 为 Agent Skill 建立运行时测评体系（用例、评分、基线、报告）。      | 为 Agent Skill 建立完整的运行时测评体系——设计用例集、制定评分规则、建立基线、执行测评、分析报告。当用户说"测评技能"、"评估技能"、"给这个 S...                                                                  |
| ✅  | skill-installer              | 本地 | 将第三方远程 skill 暂存到 remote/ 区域并适配到 skills/。   | a user asks to list candidate skills, stage a remote skill, or intake a GitHub-hosted skill for local adaptation                                     |
| ✅  | skill-optimizer              | 本地 | 审计、评估并改进 Agent Skill。                      | the user wants to optimize a skill, improve SKILL                                                                                                    |
| ✅  | using-agent-skills           | 远程 | 发现与调用当前可用的 Agent Skills（元技能）。              | starting a session or when you need to discover which skill applies to the current task                                                              |
| ⏸️ | ask-matt                     | 远程 | 判断当前情境适合调用哪个 skill 的路由器。                   | Ask which skill or flow fits your situation. A router over the user-invoked skil...                                                                  |
| ⏸️ | ce-compound                  | 远程 | 将最近解决的问题沉淀为团队知识或 CONCEPTS.md 词条。           | Document a recently solved problem to compound your team's knowledge or CONCEPTS...                                                                  |
| ⏸️ | ce-compound-refresh          | 远程 | 审查 docs/solutions/ 下的学习文档并更新/合并/删除漂移内容。    | the user asks to "refresh my learnings", "audit docs/solutions/", "clean up stale learnings", or "consolidate overlappin                             |
| ⏸️ | ce-proof                     | 远程 | 通过 Proof API 发布、查看、评论与编辑 Markdown。         | the user says "view this in proof", "share to proof", "publish to proof", or wants a shareable markdown surface for a sp                             |
| ⏸️ | handoff                      | 远程 | 将当前对话压缩为交接文档供其他代理继续。                       | Compact the current conversation into a handoff document for another agent to pi...                                                                  |
| ⏸️ | teach                        | 远程 | 在工作空间内教会用户一项新技能或概念。                        | Teach the user a new skill or concept, within this workspace.                                                                                        |
| ✅  | ce-update                    | 远程 | 检查 compound-engineering 插件版本并推荐更新命令。       | user says "update compound engineering", "check compound engineering version", "ce update", "is compound engineering up to date", "update ce plugin" |

## 代码质量

| 状态 | 技能名称                          | 来源 | 说明                                           | 触发关键词                                                                                                                    |
| -- | ----------------------------- | -- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ✅  | api-and-interface-design      | 远程 | 指导稳定的 API 与模块接口设计。                           | designing APIs, module boundaries, or any public interface                                                               |
| ✅  | browser-testing-with-devtools | 远程 | 通过 Chrome DevTools MCP 在真实浏览器中测试与调试。         | building or debugging anything that runs in a browser                                                                    |
| ✅  | ce-code-review                | 远程 | 用分层人格代理做结构化代码审查并自动应用安全修复。                    | reviewing code changes before creating a PR                                                                              |
| ✅  | ce-debug                      | 远程 | 系统化定位根因并修复 bug。                              | debugging errors, investigating test failures, reproducing bugs from issue trackers (GitHub, Linear, Jira), or when stuc |
| ✅  | ce-dhh-rails-style            | 远程 | 以 DHH/37signals 风格编写 Ruby on Rails 代码。       | This skill should be used when writing Ruby and Rails code in DHH's distinctive ...                                      |
| ✅  | ce-doc-review                 | 远程 | 用并行人格代理审查需求或计划文档。                            | a requirements document or plan document exists and the user wants to improve it                                         |
| ✅  | ce-dogfood-beta               | 远程 | \[BETA] 以 QA 视角端到端 dogfood 当前分支并修复问题。        | you want a hands-off 'test everything we just built and make it actually work' pass before shipping                      |
| ✅  | ce-optimize                   | 远程 | 定义可测目标、并行实验、择优收敛的迭代优化循环。                     | optimizing clustering quality, search relevance, build performance, prompt quality, or any measurable outcome that benef |
| ✅  | ce-polish                     | 远程 | 启动 dev server 并在浏览器中迭代打磨功能。                  | Start the dev server, open the feature in a browser, and iterate on improvements...                                      |
| ✅  | ce-resolve-pr-feedback        | 远程 | 评估并并行修复 PR 审查反馈。                             | addressing PR review comments, resolving review threads, or fixing code review feedback                                  |
| ✅  | ce-simplify-code              | 远程 | 简化近期改动代码以提升清晰度、复用与效率。                        | Simplify and refine recently changed code for clarity, reuse, quality, and effic...                                      |
| ✅  | ce-test-browser               | 远程 | 针对当前 PR 或分支运行浏览器测试。                          | Run browser tests on pages affected by current PR or branch                                                              |
| ✅  | ce-test-xcode                 | 远程 | 在模拟器上构建并测试 iOS 应用。                           | Build and test iOS apps on simulator using XcodeBuildMCP. Use after making iOS c...                                      |
| ✅  | ci-cd-and-automation          | 远程 | 自动化 CI/CD 流水线与部署策略。                          | setting up or modifying build and deployment pipelines                                                                   |
| ✅  | claude-api                    | 远程 | Claude API / Anthropic SDK 参考。               | Reference for the Claude API / Anthropic SDK. Read before tasks involving Claude...                                      |
| ✅  | code-review-and-quality       | 远程 | 在合并前进行多维度代码审查。                               | reviewing code written by yourself, another agent, or a human                                                            |
| ✅  | code-simplification           | 远程 | 在不改变行为的前提下简化代码提升可读性。                         | refactoring code for clarity without changing behavior                                                                   |
| ✅  | context-engineering           | 远程 | 优化 Agent 上下文配置与规则文件。                         | starting a new session, when agent output quality degrades, when switching between tasks, or when you need to configure  |
| ✅  | debugging-and-error-recovery  | 远程 | 系统性地定位并修复错误根因。                               | tests fail, builds break, behavior doesn't match expectations, or you encounter any unexpected error                     |
| ✅  | deprecation-and-migration     | 远程 | 管理旧系统、API 与功能的弃用和迁移。                         | removing old systems, APIs, or features                                                                                  |
| ✅  | design-an-interface           | 远程 | 用并行子代理为一个模块生成多种截然不同的接口设计。                    | user wants to design an API, explore interface options, compare module shapes, or mentions "design it twice"             |
| ✅  | git-guardrails-claude-code    | 远程 | 为 Claude Code 设置危险 git 命令拦截钩子。               | user wants to prevent destructive git operations, add git safety hooks, or block git push/reset in Claude Code           |
| ✅  | git-workflow-and-versioning   | 远程 | 规范 commit、分支、冲突与并行工作流。                       | making any code change                                                                                                   |
| ✅  | improve-codebase-architecture | 远程 | 扫描代码库中的深化机会并生成可视化 HTML 报告。                   | Scan a codebase for deepening opportunities, present them as a visual HTML repor...                                      |
| ✅  | incremental-implementation    | 远程 | 将跨多文件的改动增量交付。                                | implementing any feature or change that touches more than one file                                                       |
| ✅  | migrate-to-shoehorn           | 远程 | 将测试中的 `as` 断言迁移到 @total-typescript/shoehorn。 | user mentions shoehorn, wants to replace `as` in tests, or needs partial test data                                       |
| ✅  | performance-optimization      | 远程 | 优化应用性能与 Core Web Vitals。                     | performance requirements exist, when you suspect performance regressions, or when Core Web Vitals or load times need imp |
| ✅  | qa                            | 远程 | 以对话方式报告 bug 并自动创建 GitHub issue。              | user wants to report bugs, do QA, file issues conversationally, or mentions "QA session"                                 |
| ✅  | scaffold-exercises            | 远程 | 创建带章节、题目、解答与讲解的习题目录结构。                       | user wants to scaffold exercises, create exercise stubs, or set up a new course section                                  |
| ✅  | security-and-hardening        | 远程 | 加固代码以防御用户输入、认证、数据存储等风险。                      | handling user input, authentication, data storage, or external integrations                                              |
| ✅  | setup-pre-commit              | 远程 | 配置 Husky + lint-staged 预提交钩子。                | user wants to add pre-commit hooks, set up Husky, configure lint-staged, or add commit-time formatting/typechecking/test |
| ✅  | source-driven-development     | 远程 | 以官方文档为依据做实现决策。                               | you want authoritative, source-cited code free from outdated patterns                                                    |
| ✅  | spec-driven-development       | 远程 | 在启动新项目/功能前创建规范。                              | starting a new project, feature, or significant change and no specification exists yet                                   |
| ✅  | tdd                           | 远程 | 测试驱动开发与集成测试。                                 | the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests       |
| ✅  | test-driven-development       | 远程 | 在实现逻辑、修复 bug、变更行为时以测试驱动开发。                   | implementing any logic, fixing any bug, or changing any behavior                                                         |
| ✅  | to-issues                     | 远程 | 将计划/规范拆分为可独立领取的 tracer-bullet issue。         | Break a plan, spec, or PRD into independently-grabbable issues on the project is...                                      |
| ⏸️ | codebase-design               | 远程 | 为深度模块设计提供共享词汇与指导。                            | the user wants to design or improve a module's interface, find deepening opportunities, decide where a seam goes, make c |
| ⏸️ | decision-mapping              | 远程 | 把松散想法变成可依次推进的调查 ticket 地图。                   | Turn a loose idea into a sequenced map of investigation tickets, then drive them...                                      |
| ⏸️ | diagnosing-bugs               | 远程 | 针对棘手 bug 与性能回退的诊断循环。                         | the user says "diagnose"/"debug this", or reports something broken/throwing/failing/slow                                 |
| ⏸️ | domain-modeling               | 远程 | 构建并打磨项目的领域模型与统一语言。                           | the user wants to pin down domain terminology or a ubiquitous language, record an architectural decision, or when anothe |
| ⏸️ | resolving-merge-conflicts     | 远程 | 解决进行中的 git merge/rebase 冲突。                  | you need to resolve an in-progress git merge/rebase conflict                                                             |
| ⏸️ | review                        | 远程 | 从固定基准点 Review 改动的 Standards 与 Spec 两个维度。     | the user wants to review a branch, a PR, work-in-progress changes, or asks to "review since X"                           |
| ⏸️ | setup-matt-pocock-skills      | 远程 | 为工程 skills 配置 issue tracker、标签与领域文档布局。       | Configure this repo for the engineering skills — set up its issue tracker, triag...                                      |
| ⏸️ | to-prd                        | 远程 | 将当前对话合成为 PRD 并发布到项目 issue tracker。           | Turn the current conversation into a PRD and publish it to the project issue tra...                                      |
| ⏸️ | triage                        | 远程 | 将 issue 与外部 PR 按分类、验证、grill、brief 状态机推进。     | Move issues and external PRs through a state machine of triage roles — categoris...                                      |
| ⏸️ | ubiquitous-language           | 远程 | 从对话中提取 DDD 统一语言词汇表并保存。                       | user wants to define domain terms, build a glossary, harden terminology, create a ubiquitous language, or mentions "doma |

## 文档沟通

| 状态 | 技能名称                       | 来源 | 说明                                                 | 触发关键词                                                                                                                      |
| -- | -------------------------- | -- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ✅  | baoyu-danger-x-to-markdown | 远程 | 将 X/Twitter 推文与文章转换为带 YAML frontmatter 的 Markdown。 | user mentions "X to markdown", "tweet to markdown", "save tweet", or provides x                                            |
| ✅  | baoyu-format-markdown      | 远程 | 为 Markdown 添加 frontmatter、标题、加粗、列表与代码块格式。          | user asks to "format markdown", "beautify article", "add formatting", or improve article layout                            |
| ✅  | baoyu-markdown-to-html     | 远程 | 将 Markdown 转为带微信兼容主题的样式化 HTML。                     | user asks for "markdown to html", "convert md to html", "md 转 html", "微信外链转底部引用", or needs styled HTML output from markd   |
| ✅  | baoyu-translate            | 远程 | 多模式（快/标准/精翻）中英翻译，支持术语表。                            | This skill should be used when the user asks to "translate", "翻译", "精翻", "transl...                                        |
| ✅  | baoyu-url-to-markdown      | 远程 | 抓取任意 URL 并转换为 Markdown。                            | user wants to save a webpage as markdown                                                                                   |
| ✅  | ce-promote                 | 远程 | 为新功能起草面向用户的公告与营销文案。                                | the user says 'promote this', 'draft the announcement', 'write the launch copy', 'market this feature', 'announce this f   |
| ✅  | pdf                        | 远程 | 读取、合并、拆分、旋转、OCR、填表等任意 PDF 操作。                      | Use this skill whenever the user wants to do anything with PDF files. This inclu...                                        |
| ✅  | prompt-optimizer           | 本地 | 将模糊需求编译成工业级结构化 prompt。                             | Compile ambiguous user requirements into industrial-grade, structured prompts. T...                                        |
| ⏸️ | ce-release-notes           | 远程 | 汇总 compound-engineering 插件近期发布说明。                  | the user types `/ce-release-notes` or asks "what changed in compound-engineering recently?" or "what happened to \`\<skill |
| ⏸️ | doc-coauthoring            | 远程 | 引导用户完成文档/提案/技术规范的协作撰写。                             | user wants to write documentation, proposals, technical specs, decision docs, or similar structured content                |
| ⏸️ | documentation-and-adrs     | 远程 | 记录架构决策、公共 API 变更与功能上下文。                            | making architectural decisions, changing public APIs, shipping features, or when you need to record context that future    |
| ⏸️ | docx                       | 远程 | 创建、读取、编辑 Word 文档（.docx）。                           | extracting or reorganizing content from                                                                                    |
| ⏸️ | internal-comms             | 远程 | 撰写公司内部沟通文档。                                        | A set of resources to help me write all kinds of internal communications, using ...                                        |
| ⏸️ | writing-great-skills       | 远程 | 编写与编辑高质量 Skills 的参考指南。                             | Reference for writing and editing skills well — the vocabulary and principles th...                                        |
| ⏸️ | xlsx                       | 远程 | 创建、读取、编辑电子表格（.xlsx/.csv/.tsv）。                     | Use this skill any time a spreadsheet file is the primary input or output. This ...                                        |

## 知识管理

| 状态 | 技能名称             | 来源 | 说明                                                | 触发关键词                                                                                                                     |
| -- | ---------------- | -- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ✅  | ljg-invest       | 远程 | 生成以「秩序创造机器」为核心的深度投资分析报告。                          | user says '投资报告', '投资分析', '分析这个项目', '写投资报告', 'investment report', 'invest analysis', or provides entrepreneur conversati  |
| ✅  | ljg-push         | 远程 | 将本地 ljg-\* skills 同步到 GitHub repo 的 master/md 分支。 | user says '/ljg-push', 'push skills', '推送 skills', '同步 skills', 'sync ljg', or whenever ljg-\* skills get updated and nee |
| ✅  | ljg-relationship | 远程 | 用结构诊断与精神分析深度理解人际关系问题。                             | user says "关系分析", "分析关系", "relationship", "人际关系", or describes a specific relationship problem they want to understand    |
| ✅  | ljg-roundtable   | 远程 | 组织多视角结构化圆桌辩论探索话题。                                 | user says "圆桌讨论", "圆桌", "roundtable", "辩论", or wants to explore a topic through multi-perspective structured debate       |
| ✅  | ljg-skill-map    | 远程 | （ljg-skills 占位 skill）                             | -                                                                                                                         |
| ✅  | ljg-travel       | 远程 | 为城市生成博物馆与古建深度旅行研究文档与参考卡片。                         | user says '旅行研究', '博物馆功课', '古建功课', 'travel research', '出发前功课', or provides a city name with intent to do deep cultural t  |
| ✅  | session-achieve  | 本地 | 复盘多轮对话，提取纠偏逻辑并沉淀黄金提示词。                            | 复盘当前多轮对话，提取纠偏逻辑并沉淀黄金提示词。当用户输入"复盘对话"、"总结这次对话"、"session review"、"review this sessi...                                       |
| ✅  | weread-skills    | 远程 | 微信读书助手：搜书、书架、笔记、书评、阅读统计。                          | 微信读书助手 — 搜索书籍、管理书架、查看笔记划线、浏览书评、阅读统计、发现推荐好书                                                                                |
| ⏸️ | kb-retriever     | 远程 | 面向本地知识库目录的渐进式检索与问答。                               | 面向本地知识库目录的检索和问答助手。核心流程：(1) 分层索引导航 (2) 遇到 PDF/Excel 时必须先读取 references 学习处理方法 (3) 处理文件后再检...                                |
| ⏸️ | obsidian-vault   | 远程 | 在 Obsidian 知识库中搜索、创建与管理笔记。                        | user wants to find, create, or organize notes in Obsidian                                                                 |
| ⏸️ | serenity-skill   | 远程 | 把投资代理变成供应链瓶颈猎人，做溯源研究与股票筛选。                        | Turn an investment agent into a supply-chain bottleneck hunter. Use this skill f...                                       |
| ✅  | ima-skill        | 远程 | 统一的 IMA OpenAPI 技能，支持笔记管理与知识库操作。                  | 用户提到知识库、资料库、笔记、备忘录、记事，或想上传文件/添加网页到知识库/搜索知识库/创建编辑笔记时触发。                                                                    |

## Vercel 生态

| 状态 | 技能名称                          | 来源 | 说明                                         | 触发关键词                                                                                                                    |
| -- | ----------------------------- | -- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| ✅  | deploy-to-vercel              | 远程 | 将应用与网站部署到 Vercel。                          | the user requests deployment actions like "deploy my app", "deploy and give me the link", "push this live", or "create a |
| ✅  | vercel-cli-with-tokens        | 远程 | 用 Token 认证通过 Vercel CLI 部署与管理项目。           | working with Vercel CLI using access tokens rather than interactive login — e                                            |
| ✅  | vercel-composition-patterns   | 远程 | React 组合模式与组件库设计。                          | refactoring components with boolean prop proliferation, building flexible component libraries, or designing reusable API |
| ✅  | vercel-react-best-practices   | 远程 | React 与 Next.js 性能优化最佳实践。                  | React and Next.js performance optimization guidelines from Vercel Engineering. T...                                      |
| ✅  | vercel-react-native-skills    | 远程 | React Native 与 Expo 高性能移动开发最佳实践。           | building React Native components, optimizing list performance, implementing animations, or working with native modules   |
| ✅  | vercel-react-view-transitions | 远程 | 使用 React View Transition API 实现原生感页面/元素动画。 | the user mentions view transitions, `startViewTransition`, `ViewTransition`, transition types, or asks about animating b |
