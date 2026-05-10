
## skill 分类

| 场景                           | 推荐模式       | 你需要做的                                  |
| :----------------------------- | :------------- | :------------------------------------------ |
| 教 LLM 遵循某种规范/风格       | 纯 Prompt 注入 | 写好 SKILL.md，全靠文本质量                 |
| 需要 LLM 操作特定文件格式      | 脚本执行型     | 写预制脚本放 scripts/，SKILL.md 写使用说明  |
| 需要 LLM 灵活组合 API          | 库调用型       | 写 Python 库放 core/，SKILL.md 当 API 文档  |
| 知识量大，不同任务需要不同文档 | 渐进加载型     | SKILL.md 做路由表，详细文档独立存放         |
| 需要 LLM 执行复杂多步骤工作流  | 编排型         | SKILL.md 定义流水线 + 脚本工具链 + 子 Agent |



优秀工程师不一定能写出优秀的Skill来，Perplexity公开了他们内部工程师在开发和评审 Skills 时使用的文档，帮助开发人员开发高质量Skill

地址：research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity
开发高质量 Skill 所需的直觉和最佳实践，与构建传统软件所需的直觉和最佳实践有很大不同。Agents 团队会审阅许多优秀工程师在工作中提交的 Skill 相关 pull request。结果几乎总是会产生大量评论和修改建议。这是因为，许多在写代码时有用的模式，在创建 Skill 时反而会变成反模式。

例如，如果你借用 PEP20《Python 之禅》中的一些格言，很快就会发现：写好 Python 代码和写好 Skills 完全不是一回事。在这 20 条智慧中，至少有一半在写 Skills 时要么完全错误，要么会造成严重误导。下面是其中五条（如图）：

这份指南是 Perplexity 内部工程师在开发和评审 Skills 时共同使用的文档。我们也将这份指南公开发布，希望我们的发现和经验能让更广泛的社区受益。无论你是在日常工作中设计生产级 Skills 的工程师，还是希望在自己最熟悉的领域开发自定义 Skill 的 Computer 用户，或者两者都是，这份指南都适合你。