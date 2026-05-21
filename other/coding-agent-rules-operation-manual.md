# Coding Agent Rules 增量更新手册

## 目标

把一套“写代码时才启用”的 Coding Agent 规则，增量加入现有 Agent 配置。

不要重写用户已有的全局风格、项目规则、prompt 规则或知识库规则。只新增或更新 code 相关部分。

适用对象：

- 需要让 Agent 偶尔写代码的知识库、技能库、资料库。
- 已经有全局 `AGENTS.md`，但缺少代码任务约束。
- 多个项目共用一套基础 coding 行为规则，但每个项目仍有自己的技术栈和测试命令。

## 更新原则

- **只做增量**：保留原文件内容，只插入或更新 code 相关段落。
- **全局放通用规则**：跨项目稳定成立的 coding 行为放到全局。
- **项目放具体规则**：测试命令、目录边界、业务规则放到项目。
- **长规则放同级文件**：不要让全局 `AGENTS.md` 引用某个项目目录里的文档。
- **非代码任务不触发**：写作、笔记、研究、知识库整理默认不套用 coding workflow。

## 1. 全局增量更新

### 1.1 找到全局 Agent 配置目录

常见位置：

```text
~/.config/.agents/
```

如果用户已有其他全局配置目录，以用户环境为准。

### 1.2 更新全局 `AGENTS.md`

在全局 `AGENTS.md` 中插入下面这一段。推荐位置：已有全局行为规则之后、优先级说明之前。

如果文件里已经有 `## Coding Overlay`，不要重复新增，直接更新该段。

```markdown
## Coding Overlay

Apply this section only when the task involves editing, creating, reviewing, running, debugging, or explaining code, scripts, config files, build files, tests, CLIs, automations, or developer workflows.

- Read before writing: inspect nearby code, exports, callers, tests, shared utilities, and local conventions before making changes.
- Make surgical changes: touch only files and lines that directly serve the user's request.
- Prefer the smallest working solution. Do not add speculative features, abstractions, configurability, or broad refactors.
- Match the local codebase's naming, structure, formatting, error handling, and test style.
- Use deterministic tools for deterministic work. Let code handle routing, retries, transforms, counting, searching, and verification when possible.
- Define success criteria before implementation on non-trivial work, then verify against them.
- Verify changed behavior with tests, typecheck, lint, build, direct execution, or browser checks when available and relevant.
- Surface skipped checks, uncertainty, conflicts, and anything not verified. Never claim tests pass if they were not run.
- Preserve user and teammate work. Do not revert, delete, or reformat unrelated changes.
- Every changed line should trace directly to the user's request.
- When instructions conflict, follow the nearest project instructions unless doing so would weaken safety, verification, or preservation of user work.

Full reference: `./CODING_AGENT_RULES.md`

For non-code writing, notes, diary, research, article, or knowledge-base work, do not force the coding workflow unless code or developer tooling is actually involved.
```

### 1.3 新增全局长规则文件

在全局 `AGENTS.md` 同级目录创建：

```text
CODING_AGENT_RULES.md
```

内容如下：

````markdown
# Coding Agent Rules

Behavioral guidelines to reduce common LLM coding mistakes. These rules apply when a task involves code, scripts, config files, build files, tests, CLIs, automations, or developer workflows, unless explicitly overridden by more specific project instructions.

**Tradeoff:** These guidelines bias toward caution over speed on non-trivial work. For trivial tasks, use judgment.

## Rule 1 - Think Before Coding

**Do not assume. Do not hide confusion. Surface tradeoffs.**

Before implementing:
- State assumptions explicitly. If uncertain, ask rather than guess.
- Present multiple interpretations when ambiguity exists.
- Push back when a simpler approach exists.
- Stop when confused. Name what is unclear.

## Rule 2 - Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No flexibility or configurability that was not requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Test: would a senior engineer say this is overcomplicated? If yes, simplify.

## Rule 3 - Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Do not improve adjacent code, comments, or formatting.
- Do not refactor things that are not broken.
- Match existing style, even if you would do it differently.
- If you notice unrelated dead code, mention it. Do not delete it.

When your changes create orphans:
- Remove imports, variables, and functions that your changes made unused.
- Do not remove pre-existing dead code unless asked.

The test: every changed line should trace directly to the user's request.

## Rule 4 - Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" becomes "write tests for invalid inputs, then make them pass."
- "Fix the bug" becomes "write a test that reproduces it, then make it pass."
- "Refactor X" becomes "ensure tests pass before and after."

For multi-step tasks, state a brief plan:

```text
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]
```

Strong success criteria let you loop independently. Weak criteria such as "make it work" require clarification.

## Rule 5 - Use the Model Only for Judgment Calls

Use the model for classification, drafting, summarization, extraction, tradeoff analysis, and judgment calls.

Do not use the model for routing, retries, deterministic transforms, or work that ordinary code can perform reliably.

If code can answer, code answers.

## Rule 6 - Token Budgets Are Not Advisory

Per-task budget: 4,000 tokens.

Per-session budget: 30,000 tokens.

If approaching budget, summarize and start fresh. Surface the breach. Do not silently overrun.

## Rule 7 - Surface Conflicts, Do Not Average Them

If two patterns contradict, pick one based on evidence such as recency, test coverage, local convention, or reliability.

Explain why. Flag the other for cleanup. Do not blend conflicting patterns into a third accidental style.

## Rule 8 - Read Before You Write

Before adding code, read exports, immediate callers, shared utilities, tests, and nearby conventions.

"Looks orthogonal" is dangerous. If you do not understand why the code is structured a certain way, ask or investigate before editing.

## Rule 9 - Tests Verify Intent, Not Just Behavior

Tests must encode why the behavior matters, not just what output appears today.

A test that cannot fail when business logic changes is the wrong test.

## Rule 10 - Checkpoint After Every Significant Step

After each significant step, summarize:
- What was done.
- What was verified.
- What remains.

Do not continue from a state you cannot describe back. If you lose track, stop and restate the current state.

## Rule 11 - Match the Codebase's Conventions

Conformance beats taste inside the codebase.

Match existing naming, file structure, error handling, formatting, and test style. If a convention seems harmful, surface it explicitly instead of forking silently.

## Rule 12 - Fail Loud

"Completed" is wrong if anything was skipped silently.

"Tests pass" is wrong if any tests were skipped or not run.

Default to surfacing uncertainty, missing checks, skipped work, and unresolved conflicts.

## Success Signal

These guidelines are working when diffs contain fewer unnecessary changes, rewrites due to overcomplication decrease, ambiguity is surfaced before implementation, and every changed line can be traced back to the user's request.
````

## 2. 项目增量更新

每个项目根目录可以有自己的 `AGENTS.md`。项目文件只补具体工程事实，不重复全局长规则。

如果项目还没有 coding 规则，在项目 `AGENTS.md` 中追加：

```markdown
## Project Coding Rules

### Tech Stack

- Runtime: [Node/Python/Rust/etc.]
- Framework: [React/Next/Vite/etc.]
- Package manager: [npm/pnpm/uv/cargo/etc.]

### Commands

- Install: `[command]`
- Dev: `[command]`
- Test: `[command]`
- Typecheck: `[command]`
- Lint: `[command]`
- Build: `[command]`

### Verification

- After changing runtime behavior, run `[test command]`.
- After changing types or public interfaces, run `[typecheck command]`.
- After changing frontend UI, verify in browser at `[local URL]`.
- If a check is skipped, report it explicitly.

### Boundaries

- Do not edit `[sensitive path]` unless explicitly asked.
- Do not modify generated files by hand.
- Do not change migrations, lockfiles, env files, or production config unless the task specifically requires it.
- Preserve existing user changes.

### Local Conventions

- Follow existing module layout in `[src/... ]`.
- Use existing helpers before adding new abstractions.
- Match nearby test style.
- Keep changes scoped to the request.
```

把方括号里的内容替换成项目真实信息。没有的命令不要编造；写 `not available` 或删除该行。

## 3. 给执行 Agent 的更新流程

执行更新时按这个顺序做：

1. 读取现有全局 `AGENTS.md`。
2. 判断是否已有 `## Coding Overlay`。
3. 没有则插入，有则更新，不要重复创建。
4. 在同级目录创建或更新 `CODING_AGENT_RULES.md`。
5. 检查 `Coding Overlay` 的 `Full reference` 指向同级文件，不指向某个项目目录。
6. 如用户指定项目，再读取项目 `AGENTS.md`。
7. 只追加或更新项目 code 相关段落。
8. 输出变更报告，列出改了哪些文件、插入了哪些段落、没有改哪些内容。

## 4. 验收标准

更新完成后应满足：

- 全局 `AGENTS.md` 保留用户原有内容。
- 全局 `AGENTS.md` 只新增或更新 `Coding Overlay`。
- `CODING_AGENT_RULES.md` 与全局 `AGENTS.md` 在同级目录。
- 全局引用不依赖项目目录。
- 非代码任务不会被强制套用 coding workflow。
- 项目 `AGENTS.md` 只包含项目差异：命令、边界、技术栈、验证方式。

## 5. 不要做什么

- 不要覆盖用户原有全局风格规则。
- 不要把完整长规则直接塞进所有项目。
- 不要让全局文件引用某个项目里的资料文档。
- 不要编造项目测试命令。
- 不要把知识库、日记、文章整理任务默认当成代码任务。
- 不要把项目专属规则上升到全局，除非它在多个项目稳定复用。
