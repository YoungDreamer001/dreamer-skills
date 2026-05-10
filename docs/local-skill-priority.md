# 本地 Skill 概念草稿整理优先级

结论：全部自定义技能都按“概念草稿”处理。排序标准改为使用场景普遍性：越能覆盖大量任务、越能成为其他技能的基础，优先级越高。

`warehouse/local/todo.md` 是这轮整理的核心依据。它不是普通待办，而是本地 skill 系统的原始产品需求：先定义 skill 类型，再定义复杂任务处理流程，再列出具体候选技能。

## 排序原则

| 优先级依据 | 判断 |
| --- | --- |
| 场景普遍性 | 是否几乎所有复杂任务都会用到 |
| 复利价值 | 是否能帮助后续沉淀更多技能 |
| 个人工作流浓度 | 是否体现你的真实协作方法，而不是通用模板 |
| 可打磨程度 | 是否已经有材料、流程或草稿可整合 |
| 依赖复杂度 | 是否需要脚本、外部 API、账号或数据源 |

## 草稿成熟度定义

| 状态 | 含义 | 处理 |
| --- | --- | --- |
| idea | 只有想法、摘录、笔记 | 先判断是否值得变成 skill |
| concept | 有 `SKILL.md` 或明确流程，但触发、资源、验证不完整 | 进入打磨队列 |
| candidate | 名称、触发、流程、资源、验收都完整 | 可以注册测试 |
| usable | 已被真实任务跑过并修正过 | 可以按项目启用 |
| archived | 被覆盖、过时或不值得维护 | 保留素材或删除 |

当前自定义技能最高只到 `concept`。即使已有 `SKILL.md`，也不等于可用。

## P0：最高优先级，通用元技能

### 1. `prompt-optimizer`

来源：

- `warehouse/local/prompt-optimizer/SKILL.md`
- `warehouse/local/todo.md`
- `warehouse/local/prompt-optimizer/references/`

这是第一优先级。它覆盖面最广：写作、研究、翻译、需求分析、网页生成、图片提示词、投资研究、代码任务都要先把问题转成高质量 prompt。

`todo.md` 给出的核心流程应该成为主干：

1. 明确问题与上下文。
2. 让 AI 自选必要角色。
3. 连续提问直到 95% 理解目标与边界。
4. 先跑一个具体情境。
5. 根据表现迭代。
6. 让红队挑刺。
7. 抽到稳定高质量版本后微调。
8. 抽象成可迁移模板。

整理目标：

- 把现有 `prompt-optimizer` 从“提示词润色器”升级为“复杂任务提示词生成与迭代器”。
- 固化输入槽：一句话目标、背景、约束、期望输出格式。
- 合并 `todo.md` 的复盘检查清单。
- 修复不存在的引用：`references/frameworks.md`、`references/gemini-tips.md`。
- 为现有 references 建路由：文章配图、The One、商业分析、论文解读、司法论证、公式解释等。

### 2. `truth-test` / `mom-test`

来源：`warehouse/local/todo.md`

这是第二优先级。它比单个产物技能更基础，因为它解决的是 AI 协作中最常见的问题：模型为了顺着用户说，输出好听但没用的答案。

核心原则：

- 避免问意见，改问证据。
- 避免未来假设，追问过去表现。
- 用行为模拟代替态度判断。

整理目标：

- 新建 `warehouse/local/truth-test/SKILL.md`。
- 触发场景：评估方案、判断需求、产品想法验证、prompt 质量验证、让 AI 挑刺。
- 输出合同：反例、限制、失败路径、行为模拟、证据缺口。
- 和 `prompt-optimizer` 配合：每个重要 prompt 生成后必须经过一次 truth test。

### 3. `conversation-achieve`

来源：`warehouse/local/todo.md`

这是第三优先级。它对应 `/achieve`：对话结束后立刻沉淀有效回答、失败案例和高质量 prompt。

它的普遍性很高，因为它是所有技能持续变好的入口。没有这个技能，很多好流程会散在聊天记录里，无法进入本地知识库。

整理目标：

- 新建 `warehouse/local/conversation-achieve/SKILL.md`。
- 触发场景：用户说“沉淀一下”“记录一下”“这次学到什么”“生成经验/复盘/记忆”。
- 只记录可复用要素：目标、验证标准、失败点、修正动作、有效 prompt 结构。
- 输出可以是 Markdown 复盘，也可以作为后续写入 memory/skill 草稿的材料。

### 4. `output-workflow`

来源：`warehouse/local/todo.md`

对应 `/write`、`/copy`、提示词反思快捷命令。它不是某个具体内容技能，而是通用输出动作规范。

整理目标：

- 先不要急着做复杂 CLI。
- 先定义成轻量 skill：当任务要求“输出到文件”“生成可复制版本”“反思这次 prompt”时，统一处理输出位置、文件命名、成品与说明的分离。
- 后续如果命令系统成熟，再把它落成 CLI 命令。

## P1：高频内容生产技能

### 5. `subtitle-to-seo-article`

来源：

- `warehouse/local/todo.md`
- `warehouse/local/subtext-article/SKILL.md`

`todo.md` 明确列了“视频字幕文件转 SEO 文章”。这是具体任务里优先级最高的，因为字幕、访谈、播客、长视频整理都很常见。

整理目标：

- 把 `subtext-article` 改名或重建为 `subtitle-to-seo-article`。
- 固化输入：字幕文件、目标平台、关键词、受众、保真程度。
- 固化输出：标题、摘要、SEO 关键词、结构化长文。
- 保留硬约束：忠实原意、不添加事实、不丢关键顺序。

### 6. `technical-blog-writing`

来源：`warehouse/local/博客撰写要点.md`

它的普遍性高于单一网页或财经技能，因为技术文章、技术分享、学习笔记重写会反复出现。

整理目标：

- 新建 `warehouse/local/technical-blog-writing/SKILL.md`。
- 主线固定为：问题背景 -> 既有方案 -> 新方案出现 -> 对比 -> 为什么胜出 -> 最佳实践。
- 把原文作为 `references/blog-writing-principles.md`。

### 7. `merge-drafts`

来源：`warehouse/local/merge-drafts/SKILL.md`

这不是 `todo.md` 里直接列出的事项，但它符合你的高频内容工作流：多稿融合、选底稿、统一风格、输出合并报告。

整理目标：

- 去掉不存在的 `writing-style` 依赖。
- 明确“融合而非拼接”。
- 输出合并稿与合并报告。

## P2：中频专业技能

### 8. `webapp-build`

来源：

- `warehouse/local/todo.md`
- `warehouse/local/webapp-build/SKILL.md`

`todo.md` 明确列了 `webapp_build`，但它比 prompt、复盘、字幕文章更具体，排在 P2。

当前问题：

- 硬编码 `/mnt/okcomputer/output/app`，不适配当前本机工作流。
- 已有系统级前端规则和远程前端技能覆盖一部分能力。

整理目标：

- 先重写为本机项目通用的 webapp 构建流程。
- 明确适用场景：从零做小应用、演示页面、交互原型。
- 不和大型代码库开发技能混在一起。

### 9. `prompt-apo`

来源：`warehouse/local/todo.md`

对应“通过 MIPROv2 + DSPY 实现 APO 自动提示优化”。这是高级提示词优化方向，但依赖外部框架和评估集，不能排在基础 `prompt-optimizer` 前面。

整理目标：

- 先作为 `prompt-optimizer` 的高级分支或 reference。
- 只有当你真的要做可度量 prompt 优化时，再独立成 `prompt-apo`。

### 10. `a-share-financial-analysis`

来源：

- `warehouse/local/financial-analysis/SKILL.md`
- `warehouse/local/economic-analysis/SKILL.md`

财经分析价值高，但依赖数据源和脚本闭环。使用场景没有 prompt/写作/沉淀普遍。

整理目标：

- 合并 `financial-analysis` 和 `economic-analysis`。
- 数据源分三档：手工 CSV、AKShare、同花顺 iFinD/MCP。
- 脚本未完成前不启用。

## P3：项目治理与个人系统

### 11. `skill-writing-playbook`

来源：

- `warehouse/local/打造AgentSkills的最佳实践.md`
- `warehouse/local/AgentSkill学习笔记.md`
- `warehouse/local/todo.md`

它对当前整理项目很重要，但对日常任务不如 P0/P1 普遍。建议先做成文档，不急着做成运行技能。

整理目标：

- 生成 `docs/skill-writing-playbook.md`。
- 作为所有本地 skill 的验收标准。
- 覆盖 frontmatter、触发词、渐进披露、脚本边界、验证方式。

### 12. `digital-me`

路径：`warehouse/local/digital-me/`

这是 persona/agent package，不是普通 skill。价值高，但体系不同。

整理目标：

- 单独设计，不塞进普通技能列表。
- 先补入口文档，说明它的运行边界。

### 13. `HeavySkill`

路径：`warehouse/local/heavyskill-adapted/SKILL.md`

它已经注册但仍按草稿处理。使用场景偏窄：复杂推理、数学、算法、可验证高风险任务。普遍性不如 P0。

整理目标：

- 后续再决定是否改名为 `heavy-reasoning`。
- 确认是否应该继续全局启用。

## P4：归档或暂缓

### 14. `web-design-engineer`

路径：`warehouse/local/web-design-engineer/ SKILL.md`

当前文件名有前导空格，发现器不会识别。仓库已有远程 `web-design-engineer`，除非本地版本有明显独特审美规则，否则先归档。

### 15. `skill-installer`

路径：`warehouse/local/skill-installer/SKILL.md`

它描述的是旧目录模型：`remote/`、`skills/`、`custom/`。当前项目已经使用 `warehouse/remote/`、`warehouse/adapted/`、`warehouse/local/` 和 `./bin/hk-skill`。不要启用，保留脚本价值，必要时并入 CLI。

### 16. `code-principles-review`

来源：`warehouse/local/程序员越早想通这些越好.md`

这是文章剪藏，不是直接可用的 skill。可抽取成代码复杂度 review 素材，但已有远程代码质量类技能覆盖大部分场景。

## 第一轮执行顺序

1. 打磨 `prompt-optimizer`：合并 `todo.md` 的复杂任务流程、复盘检查清单、模板公式。
2. 新建 `truth-test`：把 Mom Test 做成独立验证技能。
3. 新建 `conversation-achieve`：把 `/achieve` 做成沉淀技能。
4. 定义 `output-workflow`：先形成输出落盘和可复制版本规范。
5. 重建 `subtitle-to-seo-article`：把 `subtext-article` 转成更明确的字幕转文章技能。
6. 再处理 `technical-blog-writing`、`merge-drafts`、`webapp-build`。

## 从草稿到候选的验收标准

每个本地 skill 从概念草稿进入候选状态前必须满足：

1. 目录名与 frontmatter `name` 一致。
2. 文件名必须是标准 `SKILL.md`。
3. `description` 必须写清触发场景和不适用场景。
4. `SKILL.md` 只放主流程，长材料放 `references/`。
5. 引用的 `references/`、`scripts/`、`assets/` 必须真实存在。
6. 如果依赖脚本，脚本必须可运行，并给出失败时的错误说明。
7. 如果已有远程技能覆盖，必须说明本地版本的独特价值。
8. 通过 `./bin/hk-skill init` 可发现，通过 `./bin/hk-skill list` 可看到。
9. 至少用一个真实任务跑通，并根据失败点修订一次。

## 当前仓库事实

- `warehouse/local/` 是自定义 skill 草稿与素材的持久资产区。
- `./bin/hk-skill list` 当前只显示一个本地技能：`HeavySkill`，但它也按概念草稿处理。
- `warehouse/local/` 里有多个标准 `SKILL.md` 草稿，但大多尚未注册到系统。
- `warehouse/local/web-design-engineer/ SKILL.md` 文件名前有空格，当前发现逻辑不会识别它。
