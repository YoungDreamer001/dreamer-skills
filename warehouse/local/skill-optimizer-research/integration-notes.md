# Skill Optimizer Design Notes

本文是 `skill-optimizer` 的设计底稿。它把当前讨论重构成两层：

1. **Principles**：判断一个 skill 是否值得存在、是否合格、应该按什么意图优化。
2. **Runtime Protocol**：把《让 Skill 自己训练自己》的 loop、trace、gate、workspace、logging、mutation layer 吸收成可执行协议。

核心判断：

> Skill 的合格标准是完成目的。为了完成目的，它可以自适应。

这句话优先于所有格式、模板、目录结构和审美标准。结构只是手段。优化器的任务不是把所有 skill 改成同一种样子，而是让每个 skill 更稳定地完成自己的目的。

---

## Layer 1: Principles

### 1. Purpose First

优化任何 skill 之前，先判断目的。

必须回答：

1. 这个 skill 存在是为了让 agent 完成什么任务？
2. 加载它后，agent 的行为应该发生什么变化？
3. 什么行为可以变，什么目标不能漂移？
4. 用户如何判断它完成了目的？
5. 这个目的能否被测试、trace、rubric、脚本或人类偏好验证？

合格标准：

- 不是 `SKILL.md` 写得完整；
- 不是目录结构漂亮；
- 不是说明足够详细；
- 是 skill 在真实任务中稳定完成目的，并能减少错误、返工、猜测或不一致。

### 2. Adaptive Control

好的 skill 不应该把 agent 锁死在一串脆弱步骤里。它应该提供目标、边界、工具、判断标准和恢复路径，让 agent 能根据上下文调整执行路径。

自适应可以体现在：

- 根据用户意图选择不同 workflow；
- 根据输入类型选择不同 reference；
- 根据环境状态选择脚本、回退路径或澄清问题；
- 根据失败 trace 调整下一轮 mutation；
- 根据任务风险选择轻量验证或 strict eval；
- 根据输出对象选择聊天交付、文件交付或多阶段交付。

自适应的边界：

- 路径可以变化，目标不能漂移；
- 步骤可以调整，输出契约不能被悄悄破坏；
- agent 可以提出改动，gate 必须由协议或程序控制；
- 没有证据的自作主张不是自适应，是失控。

### 3. Necessity Gate

优化器不应该默认“已有 skill 就值得强化”。它必须先判断 skill 是否值得存在。

一个 skill 值得存在，当且仅当它相对 baseline 有明确增量：

- baseline agent 没有 skill 时会失败；
- 一句临时提示不能稳定改变行为；
- 任务需要跨运行保持一致；
- 任务需要私有、稳定、冷门、组织专用或风格化知识；
- 任务需要复杂工具编排；
- 任务需要确定性脚本、模板、资源或审计轨迹。

一个 skill 不值得深度优化，当：

- 模型默认能力已经稳定完成任务；
- 内容重复全局指令；
- 内容只是给人看的普通文档；
- 它只是列出 agent 已经知道的常规命令；
- 外部 API 或规则变化快于维护速度；
- 它没有清楚触发边界；
- 它抢占其他 skill，造成 action at a distance。

必要性 eval：

1. 选 2-5 个 hero queries。
2. 跑 baseline：不加载 skill。
3. 跑 current skill：加载当前 skill。
4. 比较正确性、稳定性、成本、用户返工、输出质量。
5. 如果没有明显增量，建议删除、合并、转成全局规则，或保留为普通文档。

Necessity Gate 是 `skill-optimizer` 的 Phase -1。没有通过，不进入自训练。

### 4. Intent Classification

不同 skill 有不同目的，必须选择不同训练制度。

| Intent | Purpose | Common Failure | Primary Eval | First Mutation |
| --- | --- | --- | --- | --- |
| Routing | 正确加载/不加载 | 欠触发、过触发、相邻混淆 | positive/negative/adjacent trigger | `description` |
| Norm/Style | 稳定遵循规范、风格、rubric | 风格漂移、禁忌失效 | rubric、preference、gotcha regression | checklist、style DNA、gotchas |
| Workflow | 完成多阶段任务 | 跳步、错分支、漏文件 | stage coverage、output contract | state machine、routing table |
| Tool/Script | 稳定执行确定性操作 | 参数错、环境错、不可恢复 | fixture、command、recovery | scripts、validation |
| Knowledge Navigation | 读对 reference | 读错、漏读、过读 | path hit、fact coverage、file-read cost | index、topic router |
| Creative | 产出符合审美/媒介/品牌的作品 | 普通、跑偏、返工多 | human preference、style rubric、QA | style DNA、prompt template |
| Governance | 执行合规、风险、审计判断 | 无证据行动、漏升级、规则漂移 | rule pass、escalation、traceability | pre-action check、evidence policy |
| Meta/Optimizer | 强化其他 skill | 单一标准误评、过拟合、乱改 | intent accuracy、eval fit、gate quality | taxonomy、eval planner、mutation policy |

Hybrid skill 处理规则：

- 先选 primary intent；
- 再把 secondary intent 作为 guardrail；
- 每轮 mutation 只优化一个 primary metric；
- 不能为了主指标提升破坏 secondary guardrail。

### 5. Anti-Overfitting Principle

方法论是候选工具，不是强制流程。`skill-optimizer` 必须默认选择最小足够机制。

核心规则：

> Use the minimum sufficient mechanism that helps the skill fulfill its purpose.

过拟合风险不是来自内容多，而是来自把所有 skill 都拉向同一种形态。优化器必须防止把轻量 skill、创作 skill、工具 skill、知识导航 skill 全部改造成重型自训练框架。

#### 5.1 Minimum Sufficient Mechanism

按最小有效层级尝试：

1. 能靠 `description` 修好，就不动正文；
2. 能靠 gotcha 或 failure guard 修好，就不重构 workflow；
3. 能靠 output contract 修好，就不引入状态机；
4. 能靠 reference 索引修好，就不写脚本；
5. 能靠 audit + eval plan 修好，就不进入 self-training；
6. 只有持续失败、指标可测、回归守卫存在时，才启动 loop。

#### 5.2 Lightweight First

默认从低成本、高影响改动开始：

```text
description -> gotcha -> output contract -> reference index -> script -> self-training
```

每次升级都要说明：

- 当前层为什么不够；
- 更重机制解决什么具体失败；
- 会不会引入新的上下文税、维护税或行为僵化。

#### 5.3 Anti-Template Rule

不因为某个方法存在，就要求目标 skill 使用它。

禁止：

- 短 skill 强行拆 references；
- 创作 skill 强行状态机化；
- 工具 skill 强行写长 prompt；
- 路由问题强行写脚本；
- 没有文件产物的任务强行输出文件夹；
- 没有 eval 的 skill 直接自训练。

模板只能用于：

- 稳定输出格式；
- 降低遗漏；
- 支持 eval；
- 生成低成熟度初稿。

模板不能覆盖用户目的和目标 skill 的原生形态。

#### 5.4 Preserve Native Shape

优化应保留目标 skill 最适合完成目的的形态。

- 极窄对话姿态型 skill 可以继续短；
- 创作型 skill 可以保留开放空间；
- 工具型 skill 可以脚本优先、正文简短；
- 知识导航型 skill 可以重 reference 和索引；
- 工作流型 skill 可以状态机化；
- 元技能可以保留复杂协议。

重构只有在“当前形态阻碍目的达成”时才成立。

#### 5.5 No Self-Training Without Evals

自动进化是最高成本机制。没有以下条件，不启动 self-training：

- 明确 primary intent；
- baseline；
- dev eval；
- regression guard；
- trace capture；
- rollback/checkpoint；
- gate criteria；
- 人类可审计日志。

缺少这些时，只允许输出 audit、eval plan 或 patch proposal。

### 6. Method Library

方法不是模板。样本的价值在于抽象方法，而不是要求目标 skill 模仿某个好样本。

#### 6.1 State Machine

适用：

- 多阶段工作流；
- 有跳过、回退、分支；
- 输出质量依赖顺序。

做法：

- 每个 state 定义目标、输入、动作、退出条件、下一状态；
- 允许按条件跳过低价值状态；
- 对复杂任务加 self-check 或 red-team state。

反用：

- 一步任务不强行状态机化；
- 创作任务不要被切得过死。

#### 6.2 Routing Table

适用：

- 用户意图相似；
- 输入类型不同；
- 相邻 skill 容易混淆；
- 不同任务读不同 reference。

做法：

- 定义 signal、source type、goal、route、resource、skip condition；
- 明确默认路径和显式收窄路径；
- 用 adjacent-confusion case 做 regression。

#### 6.3 Evidence Boundary

适用：

- 分析、研究、审稿、事实敏感、治理任务。

做法：

- 标记 source-stated、inferred、creative-extension、external-unverified、insufficient-info；
- 禁止把模型常识冒充证据；
- 数字、实体、日期、因果判断必须可 trace。

#### 6.4 Output Contract

适用：

- 任务产物不止聊天回复；
- 需要文件、图片、表格、报告、schema；
- eval 需要检查结构。

做法：

- 明确输出位置、文件名、字段、最少产物、最终回复；
- 写清何时允许少输出；
- 防止 agent 把文件任务偷懒成聊天长文。

#### 6.5 Style DNA

适用：

- 创作、视觉、品牌、写作风格任务。

做法：

- 把风格拆成主体、构图、色彩、媒介、密度、禁忌、常见失败；
- 正例用于校准，不用于复刻；
- 先输出策略，再生成作品；
- 生成后跑 QA checklist。

#### 6.6 Scripted Execution

适用：

- 解析、转换、发布、压缩、上传、API、浏览器自动化、校验。

做法：

- 把脆弱动作放进 `scripts/`；
- 脚本输出可读错误和下一步建议；
- 区分自动重试、用户确认、硬失败；
- 用 fixture 或端到端命令验证。

#### 6.7 Progressive Disclosure

适用：

- `SKILL.md` 过重；
- 有大型模板、API 文档、schema、长示例、低频特殊情况。

做法：

- `SKILL.md` 只保留目的、路由、流程、边界、输出契约、失败保护；
- `references/` 放规则、文档、rubric、索引；
- `assets/` 放模板、schema、可复制产物；
- `scripts/` 放确定性校验和执行。

#### 6.8 Gotcha Flywheel

适用：

- 线上或测试中持续发现真实失败。

做法：

- agent 失败 -> 记录 gotcha；
- 错误加载 -> 收紧 description，并加 negative eval；
- 应加载未加载 -> 增加真实触发短语，并加 positive eval；
- 历史失败 -> regression；
- gotcha 堆积冲突 -> 重构信息架构。

---

## Layer 2: Runtime Protocol

Runtime Protocol 是 `skill-optimizer` 的执行层。它吸收《让 Skill 自己训练自己》的核心：workspace 隔离、trace 驱动诊断、分层 mutation、三层评测、AND gate、logging、自动 rollback。

### 7. Runtime Overview

完整流程：

```text
Phase -1: Necessity Gate
Phase 0: Setup
Phase 1: Review
Phase 2: Ideate
Phase 3: Modify
Phase 4: Checkpoint
Phase 5: Verify
Phase 6: Gate
Phase 7: Log
Phase 8: Loop / Stop
```

原则：

- one metric for the current round；
- constrained scope；
- fast verification；
- automatic rollback；
- git/checkpoint as memory；
- raw trace over summary；
- no trace, no mutation；
- program controls the loop, LLM proposes local changes。

### 8. Workspace

自训练必须在隔离 workspace 中运行。不要直接在用户原始 skill 上无保护迭代。

推荐结构：

```text
<skill-name>-optimizer-workspace/
  source/
    original/                 # 原始 skill 快照，只读
    working/                  # 当前可修改副本
  evals/
    evals.json                # 全量 eval 定义
    dev.json                  # 优化器可见
    holdout.json              # 优化器不可见，用于 strict eval
    regression.json           # 历史失败守卫
    flaky.json                # 噪声或争议 case
  runs/
    baseline/
    iteration-001/
      eval-<id>/
        trace.json
        output/
        grading.json
    iteration-002/
  logs/
    results.tsv
    experiments.jsonl
    decisions.jsonl
  reports/
    evolve-plan.md
    final-report.md
```

Workspace 初始化规则：

- 如果目标 skill 已在 git 仓库中且工作区干净，可以使用 git checkpoint；
- 如果没有 git，可以在 workspace 内初始化 git；
- 如果 git 不可用，使用文件快照 checkpoint；
- 如果原始目录有未保存用户改动，不直接改原目录，只复制到 workspace；
- 所有 mutation 都发生在 `source/working/`。

### 9. Phase -1: Necessity Gate

输入：

- target skill；
- 2-5 个 hero queries；
- 已知失败或用户目标。

动作：

1. 跑 baseline without skill，或让 agent 模拟 baseline。
2. 跑 current skill，或审计 current skill 预计增量。
3. 判断是否存在明确行为增量。

输出：

- `keep-and-optimize`
- `keep-but-scope`
- `merge`
- `globalize`
- `document-only`
- `delete-or-disable`

Gate：

- 没有明确增量，停止深度优化；
- 用户明确要求保留时，只做 audit/eval plan，不进入 self-training。

### 10. Phase 0: Setup

目标：建立可重复、可回滚、可评测的训练环境。

动作：

1. 检查 `SKILL.md` 是否存在。
2. 解析 frontmatter。
3. 扫描 resources：`references/`、`scripts/`、`assets/`、`evals/`。
4. 诊断 primary intent 和 secondary guardrails。
5. 读取或生成 eval plan。
6. 拆分 dev/holdout/regression。
7. 建立 baseline。
8. 写 `reports/evolve-plan.md`。

`evolve-plan.md` 必须包含：

- skill purpose；
- necessity judgment；
- primary intent；
- metrics；
- eval suites；
- mutation start layer；
- gate thresholds；
- stop conditions；
- human review points。

### 11. Phase 1: Review

目标：利用历史记忆，而不是每轮从零开始。

读取：

- 最近 git/checkpoint log；
- 最近 `logs/results.tsv`；
- 最近 `logs/experiments.jsonl`；
- 上轮 failed case trace；
- persistent failure list；
- flaky/bad-GT list。

提取信号：

1. 哪些改法成功过；
2. 哪些改法失败过；
3. 哪些 case 持续失败；
4. 哪些 case 是回归守卫；
5. 当前是否卡住，是否需要升层或换策略。

输出：

- review summary；
- target case list；
- avoid list；
- candidate mutation layer。

### 12. Phase 2: Ideate

目标：基于 trace 提出一个原子化改动。

优先级：

1. 修崩溃；
2. 修回归；
3. 利用成功模式；
4. 攻克 persistent failure；
5. 探索新方向；
6. 简化；
7. 激进变异。

硬规则：

- 必须先看 trace；
- 必须引用具体 case；
- 必须写反事实诊断；
- 没有证据，不许动手；
- 一轮只提出一个 mutation。

Ideation 格式：

```text
Target case:
Observed failure:
Trace evidence:
Hypothesis:
Mutation layer:
Proposed atomic change:
Expected metric movement:
Regression guard:
```

### 13. Phase 3: Modify

目标：执行一个可回滚的最小改动。

Mutation layers：

1. **Layer 1 - Frontmatter**
   - `description`
   - trigger phrases
   - negative triggers
   - scope terms

2. **Layer 2 - SKILL.md**
   - purpose statement
   - workflow
   - route
   - output contract
   - failure guards
   - resource read conditions

3. **Layer 3 - References / Assets**
   - topic index
   - rubric
   - heavy rules
   - templates
   - schema
   - examples

4. **Layer 4 - Scripts**
   - validation
   - parsing
   - conversion
   - tool execution
   - environment probe
   - recovery path

5. **Layer 5 - Evals**
   - missing eval
   - bad GT
   - flaky marker
   - regression case
   - holdout refresh

Atomicity tests：

- 改动说明如果需要“和”，拆成两轮；
- 改动超过 5 个文件，默认怀疑不原子；
- 同时改 metric 和 eval，必须解释为什么；
- 不做 unrelated cleanup。

### 14. Phase 4: Checkpoint

目标：保留审计轨迹，支持 automatic rollback。

优先使用 git：

```text
git status
git add <changed-files>
git commit -m "iteration-N: <mutation summary>"
```

如果没有 git：

- 创建 `runs/iteration-N/checkpoint/`；
- 保存 changed files；
- 写 `checkpoint.json`。

Checkpoint 记录：

- iteration id；
- mutation layer；
- changed files；
- parent checkpoint；
- proposer summary；
- target metric；
- expected improvement。

### 15. Phase 5: Verify

验证分三层，成本递增。

#### L1: Fast Hygiene Gate

每轮都跑。

检查：

- `SKILL.md` 存在；
- frontmatter 可解析；
- name 合法；
- 资源引用存在；
- 危险命令、硬编码密钥、明显破坏性操作；
- 输出契约仍存在；
- mutation 没有跨层失控。

L1 critical fail -> 直接 discard，不跑 L2。

#### L2: Dev Eval

每轮都跑。

包含：

- intent-specific dev cases；
- trigger positive/negative；
- output contract；
- selected regression；
- deterministic script checks；
- LLM judge cases with low-freeform YES/NO where needed。

输出：

- pass/fail；
- per-case trace；
- metric delta；
- cost delta。

#### L3: Strict Eval

条件触发。

触发条件：

- 每 N 轮；
- dev pass rate 达阈值；
- 升 mutation layer 前；
- 准备最终报告前；
- description 或 routing 大改后；
- 用户要求高置信。

包含：

- holdout；
- full regression；
- blind A/B；
- repeated runs for noisy LLM judge；
- cross-model eval if relevant。

### 16. Phase 6: Gate

Gate 使用 AND，不使用加权总分。

原因：加权会让某一维提升掩盖另一维退化。质量涨了但触发边界坏了，不能 keep。dev 涨了但 holdout 掉了，不能 keep。

建议 5 维 gate：

1. **Intent Metric**
   - primary metric 是否提升，或至少在允许区间内不下降。

2. **Boundary**
   - negative trigger、adjacent confusion、scope guard 不恶化。

3. **Regression**
   - 已知 gotcha 和 regression case 不复发。

4. **Cost / Context**
   - token、文件读取数、运行时间、用户干预次数不失控。

5. **Safety / Hygiene**
   - 无危险操作、无硬编码密钥、无结构破坏、输出契约仍成立。

Gate 结果：

- `keep`
- `discard`
- `keep-with-warning`
- `needs-human-review`
- `bad-gt-suspected`
- `flaky-suspected`

Discard 动作：

- git revert checkpoint，或恢复文件快照；
- 写入 experiments；
- 不把 discard 轮当作成功训练。

### 17. Phase 7: Log

所有轮次必须记录。日志是 optimizer 的长期记忆。

#### `logs/results.tsv`

建议字段：

```text
iteration
timestamp
mutation_layer
decision
primary_metric_before
primary_metric_after
dev_pass_rate
holdout_pass_rate
regression_pass_rate
cost_tokens
cost_seconds
changed_files
notes
```

#### `logs/experiments.jsonl`

每行一个实验：

```json
{
  "iteration": 1,
  "intent": "knowledge-navigation",
  "mutation_layer": "references",
  "target_cases": ["case-041"],
  "hypothesis": "The router misses offboarding queries because the index maps them to email instead of directory lifecycle.",
  "change": "Add offboarding alias to root index.",
  "evidence": ["runs/iteration-001/eval-case-041/trace.json"],
  "decision": "keep",
  "gate": {
    "intent_metric": true,
    "boundary": true,
    "regression": true,
    "cost": true,
    "safety": true
  }
}
```

#### Per-case Trace

每个 eval case 写 `trace.json`：

```json
{
  "case_id": "case-041",
  "prompt": "...",
  "expected": "...",
  "skill_version": "iteration-001",
  "loaded_files": [],
  "scripts_run": [],
  "output_paths": [],
  "assertions": [],
  "judge": {
    "passed": false,
    "evidence": "..."
  },
  "failure_mode": "...",
  "cost": {
    "tokens": 0,
    "seconds": 0
  }
}
```

### 18. Phase 8: Loop / Stop

Loop decisions：

- continue same layer；
- escalate mutation layer；
- switch strategy；
- add eval；
- mark bad GT；
- request human review；
- stop。

Escalation rules：

- 连续 K 轮无 keep -> 当前 layer exhausted；
- 连续 5 次 discard -> 切换策略或进入 human review；
- 同一 case 连续 5 轮失败 -> 先怀疑 GT、任务定义或不可修；
- L1 repeatedly fails -> 修结构，不继续优化；
- holdout regression -> 回滚，降低 mutation 激进度。

Stop conditions：

- target metric 达成；
- 三层或五层 mutation 都试过仍无改善；
- eval 噪声高于改动收益；
- GT 有争议；
- 用户预算耗尽；
- 用户要求停止；
- skill 被 Necessity Gate 判定不值得继续。

### 19. Eval Quality Controls

LLM eval 有噪声。不能把一次 judge 当真理。

规则：

- 程序可判的优先程序判；
- LLM judge 尽量做 YES/NO 或低自由度判断；
- 小幅提升必须考虑 variance；
- 关键变更多次运行取均值；
- flaky case 单独标记；
- bad GT 不强修；
- dev gain 必须用 holdout 或 regression 验证；
- 不允许为 dev case 写硬编码规则。

GT 质量规则：

- 每条 GT 写清 expected reason；
- 连续失败 case 先审 GT；
- 有争议 case 标记 ambiguous；
- 不可修 case 可移入 regression 只做防护；
- 自动生成 GT 必须经人工或高置信审查后用于 gate。

### 20. Human Collaboration

自训练不是黑盒流水线。用户可以在 loop 中插入判断。

需要人类介入的情况：

- skill 目的不清；
- primary intent 有争议；
- GT 标注有争议；
- creative preference 需要选择；
- governance rule 没有权威来源；
- mutation 可能改变用户工作流；
- gate 结果接近噪声边界；
- optimizer 建议删除、合并或 globalize skill。

人类输入进入：

- `logs/decisions.jsonl`；
- regression/gotcha；
- eval plan；
- mutation priority；
- stop condition。

### 21. Deliverables

`skill-optimizer` 的产物分四类。

#### Audit Report

必须包含：

- purpose；
- necessity judgment；
- primary intent；
- secondary guardrails；
- top findings with evidence；
- risk level；
- recommendation。

#### Eval Plan

必须包含：

- hero queries；
- positive trigger；
- negative trigger；
- adjacent confusion；
- end-to-end cases；
- regression cases；
- holdout suggestion；
- assertion or judge method。

#### Optimization Patch

必须包含：

- target metric；
- mutation layer；
- evidence；
- patch summary；
- expected improvement；
- regression guard；
- risk。

#### Final Report

必须包含：

- baseline vs final；
- kept/discarded iterations；
- metrics；
- cost；
- failed cases；
- bad GT or flaky cases；
- remaining risk；
- recommended next step。

---

## Implementation Note

当前 `skill-optimizer` 应按这个分层实现：

1. `SKILL.md` 只保留 workflow 和路由。
2. Principles 拆成 references：necessity、intent、method library。
3. Runtime Protocol 拆成 references：eval、mutation、self-training、logging/gate。
4. assets 放 audit/final report 模板。
5. 后续脚本化时，优先实现：
   - frontmatter parser；
   - discovery eval generator；
   - resource reference checker；
   - eval plan generator；
   - results logger；
   - gate runner。

完成标准：

- 先能稳定产出 audit + eval plan；
- 再能安全提出 patch；
- 最后才进入自动 self-training loop。
