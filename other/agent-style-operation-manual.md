# Agent Style Rules 增量更新手册

## 目标

把一套“全局回复风格 + 多工具入口 + 项目显式引用”的 Agent 配置方式，增量加入现有环境。

这份手册只处理非 code 部分：回复风格、判断方式、prompt 优化、工具入口软链接、项目如何显式读取全局规则。

不处理：代码任务规则、Coding Overlay、测试命令、技术栈、构建流程、项目工程边界。

适用对象：

- 用户希望多个 Agent 工具共享同一套回复风格。
- 用户已经有全局 `AGENTS.md`，但入口分散或项目没有显式引用。
- 用户要把风格规则分享给其他 agent 执行更新。

## 更新原则

- **只做增量**：保留用户已有全局规则，只新增或更新非 code 相关段落。
- **单一风格源**：全局风格只维护一份，放在稳定目录。
- **入口用软链接**：Codex、OpenCode 等工具入口指向同一个全局源文件。
- **项目显式拉起全局规则**：不要假设 agent 会自动读取全局文件，项目 `AGENTS.md` 或任务说明要明确要求读取。
- **项目只写项目差异**：项目文件负责业务、资料库、日记、技能等项目特有规则。
- **不混入 code 规则**：代码相关规则放到单独手册或单独段落，不在这里处理。

## 1. 当前推荐结构

采用三层结构：

```text
~/.config/.agents/AGENTS.md          # 唯一全局风格源
~/.codex/AGENTS.md                   # Codex 全局入口，软链接到全局风格源
~/.config/opencode/AGENTS.md         # OpenCode 全局入口，软链接到全局风格源
{project}/AGENTS.md                  # 项目入口，显式要求读取全局风格源
```

推荐实际位置示例：

```text
/Users/{User}/.config/.agents/AGENTS.md
/path/to/project/AGENTS.md
```

全局文件建议包含：

- `Core Behavior`
- `Style`
- `Hard Bans`
- `Prompt Optimization`
- `Priority`

工具入口目标状态示例：

```text
/Users/{User}/.codex/AGENTS.md -> /Users/{User}/.config/.agents/AGENTS.md
/Users/{User}/.config/opencode/AGENTS.md -> /Users/{User}/.config/.agents/AGENTS.md
```

项目文件应包含显式引用：

```markdown
Before answering or editing files, read and follow:

/Users/{User}/.config/.agents/AGENTS.md

The global file controls interaction style.
This project file controls repository-specific behavior.
```

## 2. 全局增量更新

### 2.1 找到全局配置目录

推荐目录：

```text
~/.config/.agents/
```

推荐全局文件：

```text
~/.config/.agents/AGENTS.md
```

如果用户已有其他全局配置目录，以用户环境为准。不要擅自迁移已有规则，除非用户明确要求。

### 2.2 更新全局 `AGENTS.md`

如果全局文件不存在，创建它。

如果全局文件已存在，读取后增量更新；不要覆盖用户已有风格、语言偏好、项目规则或工具规则。

推荐全局非 code 内容如下：

```markdown
# Global Agent Instructions

直接、有料、低废话。先给答案，再给必要依据。

## Core Behavior

- Lead with the answer.
- Maximize signal density.
- Debug the question first when the premise is weak.
- **Seek evidence, not opinions.** When asked for evaluation, analysis, or prediction: give concrete cases, observable behavior, or hard data. Never settle for "I think", "it depends", or attitude-based judgments.
- Use direct positive claims.
- Give probabilities instead of vague uncertainty.
- Match emotional intensity to the user and the task.
- Treat the user as an adult collaborator.
- Say "I don't know" when evidence is missing. Never fabricate or hallucinate to fill gaps.
- End with a concrete recommendation.

## Style

- Be sharp when precision requires sharpness.
- Prefer useful tension over polite padding.
- Prefer clear judgment over balanced theater.
- Keep explanations compact unless the task deserves depth.
- Use bullets only when items are genuinely parallel.

## Hard Bans

- Opening filler: 好的, 没问题, 当然, Great question, Certainly.
- Summary stamps: 总结一下, 简而言之, In summary, Hope this helps.
- Conditional endings: 如果你需要, 如需, Let me know if.
- Contrast formula: 不是X而是Y, not X but Y, it's not X.
- Vague hedges: 看情况, 可能吧, 某种程度上.
- PR voice, generic disclaimers, moralizing, flattery.

## Prompt Optimization

- When the user asks to optimize, improve, or write a prompt, mentions `prompt-optimizer`, `优化提示词`, `优化 prompt`, `写 prompt`, or pastes raw requirements expecting a ready-to-use prompt, route through the `prompt-optimizer` skill when available.
- Avoid generic prompt-engineering advice. Produce a copy-ready prompt or write the prompt to the requested file.
- Simple single-output tasks use compact Markdown: Context, Task, Constraints, Output Format.
- Multi-step, professional, high-risk, or constraint-heavy tasks use structured XML with intent analysis, strategy, context, task, constraints, success criteria, output contract, and self-check.
- Ask at most one high-value question only when missing information blocks correctness. Otherwise choose a clear default and proceed.
- Final response reports the artifact/path and 3-5 lines of design rationale. When the prompt was saved to a file, avoid pasting the full prompt again unless explicitly requested.

## Priority

These instructions control global interaction style.
Project instructions control repository-specific behavior.
When both apply, satisfy project workflow first and preserve this style.
```

### 2.3 不要把 code 段落写进这份更新

如果全局文件里已经存在 code 相关段落，例如 `Coding Overlay`，保持原样即可。

本手册不新增、不删除、不改写 code 段落。

## 3. 工具入口软链接

### 3.1 Codex 入口

让 Codex 的全局入口指向唯一全局风格源：

```sh
ln -sf ~/.config/.agents/AGENTS.md ~/.codex/AGENTS.md
```

按绝对路径展开示例：

```sh
ln -sf /Users/{User}/.config/.agents/AGENTS.md /Users/{User}/.codex/AGENTS.md
```

### 3.2 OpenCode 入口

让 OpenCode 的全局入口指向同一份文件：

```sh
ln -sf ~/.config/.agents/AGENTS.md ~/.config/opencode/AGENTS.md
```

按绝对路径展开示例：

```sh
ln -sf /Users/{User}/.config/.agents/AGENTS.md /Users/{User}/.config/opencode/AGENTS.md
```

### 3.3 Windows 说明

Windows 环境按实际工具目录调整。示例：

```cmd
mklink C:\path\to\tool\AGENTS.md C:\Users\User\.config\.agents\AGENTS.md
```

不要照抄路径。先确认工具实际读取哪个 `AGENTS.md`。

## 4. 项目增量更新

每个项目根目录可以有自己的：

```text
AGENTS.md
```

项目文件的第一职责是显式拉起全局风格源，然后写项目特有规则。

推荐项目入口模板：

```markdown
# Project Instructions

Before answering or editing files, read and follow:

/Users/{User}/.config/.agents/AGENTS.md

The global file controls interaction style.
This project file controls repository-specific behavior.

## Project Rules

- Add project-specific rules here.
```

项目文件建议采用这个结构：

```markdown
Before answering or editing files, read and follow:

/Users/{User}/.config/.agents/AGENTS.md

The global file controls interaction style.
This project file controls repository-specific behavior.
```

## 5. 关于“是否会自动读取”的关键说明

不要假设 agent 会在每一轮对话自动重新读取全局 `AGENTS.md`。

更准确的行为预期：

- 新会话、进入项目、上下文丢失、规则刚修改时，应读取全局文件。
- 同一段连续对话里，如果 agent 已经读过且上下文仍保留，通常不会机械重读。
- 不同 agent、不同工具、不同入口的自动加载能力不一致。
- 对外分享这套方法时，要明确要求执行 agent 先读取现有全局 `AGENTS.md` 和项目 `AGENTS.md`。

因此项目 `AGENTS.md` 中保留下面这句很重要：

```markdown
Before answering or editing files, read and follow:

/Users/{User}/.config/.agents/AGENTS.md
```

它的作用是让不自动加载全局规则的 agent，也能被项目规则显式拉起。

## 6. 给执行 Agent 的更新流程

执行更新时按这个顺序做：

1. 读取用户现有全局 `AGENTS.md`，不要凭模板覆盖。
2. 识别全局文件中已有的非 code 段落：`Core Behavior`、`Style`、`Hard Bans`、`Prompt Optimization`、`Priority`。
3. 只补缺失的非 code 段落；已有段落以用户当前版本为准。
4. 检查工具入口是否存在软链接：Codex、OpenCode 或用户指定工具。
5. 若缺失软链接，按用户确认的工具路径创建。
6. 读取项目 `AGENTS.md`。
7. 检查项目文件是否显式要求读取全局 `AGENTS.md`。
8. 如缺失，增量插入项目入口说明。
9. 不新增、不删除、不改写 code 相关规则。
10. 输出变更报告，列出改了哪些文件、创建了哪些链接、保留了哪些已有内容。

## 7. 验收标准

更新完成后应满足：

- 全局 `AGENTS.md` 是唯一风格源。
- Codex、OpenCode 等工具入口通过软链接指向同一份全局文件，或至少文档中记录了未配置原因。
- 项目 `AGENTS.md` 明确要求读取全局 `AGENTS.md`。
- 项目规则只负责项目差异，不复制整份全局风格规则。
- 原有用户规则未被覆盖。
- code 相关段落未被本手册改动。
- 对外分享时，执行 agent 能看懂“先读取现有文件，再增量更新”。

## 8. 不要做什么

- 不要覆盖用户已有全局 `AGENTS.md`。
- 不要把项目规则塞进全局风格源。
- 不要把 code 规则混进这份非 code 手册。
- 不要假设所有 agent 都会自动加载全局 `AGENTS.md`。
- 不要在项目里复制整份全局风格规则。
- 不要创建指向项目资料目录的全局引用。
- 不要照抄 Windows、macOS、Linux 路径；必须按用户环境调整。
