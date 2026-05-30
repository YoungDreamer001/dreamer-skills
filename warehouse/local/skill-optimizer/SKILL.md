---
name: skill-optimizer
description: Audit, evaluate, and improve Agent Skills by first diagnosing the skill's purpose, then selecting intent-specific evals, mutation strategy, and self-training protocol. Use when the user wants to optimize a skill, improve SKILL.md, assess skill quality, generate eval plans, stress-test skill behavior, or make a skill train itself. Do not use for ordinary prompt optimization, code review, or documentation editing unless the target artifact is an Agent Skill.
---

# Skill Optimizer

Optimize Agent Skills as adaptive behavior systems.

Core rule:

> A skill is good when it fulfills its purpose. To fulfill that purpose, it may adapt.

Do not judge every skill against one fixed template. First identify the skill's purpose, then choose the evaluation and improvement strategy that fits that purpose.

Use the minimum sufficient mechanism. Do not push a target skill into self-training, scripts, references, templates, or state machines unless that heavier mechanism fixes a specific purpose-blocking failure.

## Workflow

Follow this sequence for every target skill.

### 1. Inspect The Skill

Read the target skill directory before judging it:

1. Read `SKILL.md`.
2. Inspect the directory tree.
3. Note bundled `references/`, `scripts/`, `assets/`, `evals/`, config, and examples.
4. Identify whether the user wants audit-only, eval-plan, patch proposal, direct edit, or self-training.

If the user did not provide a target path, ask for the skill directory path.

### 2. Run Necessity Gate

Before optimizing, decide whether the skill should exist.

Use `references/necessity-gate.md`.

If the skill has no clear behavioral increment over baseline model behavior, recommend deletion, merging, conversion to global instructions, or keeping it as ordinary documentation. Do not deepen a skill that has no demonstrated purpose.

### 3. Diagnose Intent

Classify the primary and secondary intent.

Use `references/intent-taxonomy.md`.

Primary intent controls the optimization target. Secondary intents become guardrails. A skill can be hybrid, but each optimization round must optimize one primary intent at a time.

### 4. Select Evaluation Strategy

Choose evals based on intent, not habit.

Use `references/eval-protocol.md`.

At minimum, propose:

- positive trigger cases;
- negative trigger cases;
- adjacent-confusion cases;
- one representative end-to-end case;
- regression cases for known gotchas;
- the assertion or judging method for each case.

If the skill is not mature enough for evals, produce an eval plan before suggesting major rewrites.

### 5. Audit Structure And Failure Modes

Run hygiene and failure-mode review.

Use `references/hygiene-and-diagnostics.md`.
Use `references/anti-overfitting.md` before recommending heavier structure.

For deterministic first-pass audit, run:

```bash
bun scripts/audit-skill.ts <target-skill-dir> --format=markdown
```

Use the script output as evidence, then add human judgment for purpose, necessity, and eval quality.

To turn the audit into a reviewable eval suite:

```bash
bun scripts/audit-skill.ts <target-skill-dir> --format=json --output=/tmp/<skill>-audit.json
bun scripts/generate-evals.ts <target-skill-dir> --audit-json=/tmp/<skill>-audit.json
```

To run schema checks, deterministic assertions, and trace/log scaffolding:

```bash
bun scripts/run-evals.ts <target-skill-dir>/evals/evals.json --iteration=baseline
```

`llm_judge`, `human_preference`, `path_hit`, `fact_coverage`, `json_path`, and `script_check` assertions may be marked `pending`. Pending cases require human, trace, or external runner judgment; do not count them as passed gates.

To initialize a protected self-training workspace:

```bash
bun scripts/workspace-init.ts <target-skill-dir> --out-dir=/tmp/<skill>-optimizer-workspace
```

This creates `source/original`, `source/working`, `evals/`, `runs/baseline`, `logs/`, and `reports/evolve-plan.md`. It does not mutate the original target skill.

Before verifying a mutation in `source/working`, create a checkpoint:

```bash
bun scripts/checkpoint.ts <optimizer-workspace> --iteration=iteration-001 --mutation-layer=SKILL.md
```

After evals/traces exist for an iteration, run the AND gate:

```bash
bun scripts/gate.ts <optimizer-workspace> --iteration=iteration-001
```

`gate.ts` writes `logs/gates.jsonl` and `logs/last-gate.json`. A gate with pending critical assertions returns `needs-human-review` unless explicitly run with `--allow-pending`.

Separate findings into:

- purpose blockers;
- trigger boundary problems;
- workflow ambiguity;
- resource-loading problems;
- script/tool reliability problems;
- output-contract problems;
- safety or maintenance problems;
- optional polish.

Do not treat optional polish as a blocker.

### 6. Choose Mutation Strategy

Choose the smallest change that can improve the target metric.

Use `references/mutation-policy.md`.
Use `references/anti-overfitting.md` to decide whether the mutation is too heavy for the failure.

Mutation order:

1. Frontmatter: `description`, trigger phrases, negative triggers.
2. `SKILL.md`: route, workflow, output contract, failure guards.
3. `references/` and `assets/`: heavy rules, templates, examples, rubrics.
4. `scripts/`: deterministic checks, parsing, tool invocation, recovery.
5. `evals/`: bad GT, missing regression, flaky cases.

Each patch should change one layer and one intent dimension unless the user explicitly asks for a broader rewrite.

### 7. Optional Self-Training Loop

Use self-training only when the user asks for automatic iteration and the skill has enough evals to safely optimize.

Use `references/self-training-protocol.md`.
Use `references/runtime-workspace.md` for workspace layout.
Use `references/logging-and-gate.md` for trace, logging, AND gate, and rollback decisions.

The loop is:

```text
Setup -> Intent Diagnosis -> Eval Planning -> Baseline -> Review -> Ideate -> Modify -> Verify -> Gate -> Log -> Loop/Stop
```

The model may propose and edit; programmatic gates decide keep or revert. No trace, no mutation. No eval suite, no baseline run, no self-training.

### 8. Deliver

Default output is a concise audit package:

1. Purpose and intent diagnosis.
2. Necessity judgment.
3. Top findings with evidence.
4. Eval plan.
5. Recommended mutation strategy.
6. Optional patch or direct edits if requested.

When producing a formal report, use `assets/audit-report-template.md`.
When finishing an iterative optimization run, use `assets/final-report-template.md`.

## Operating Rules

- Lead with whether the skill fulfills its purpose.
- Cite evidence from the target skill: file path, section, line, resource, or observed behavior.
- Prefer eval creation before major rewriting.
- Prefer adding gotchas/regression for real failures over broad rewrites.
- Prefer scripts for deterministic, repetitive, or fragile operations.
- Keep `SKILL.md` as the control plane; move heavy details to resources.
- Do not force templates onto narrow skills.
- Do not optimize for beauty, completeness, or length unless those serve the skill purpose.
- Do not make the target skill imitate another skill. Extract methods, then apply only when appropriate.
- Preserve the target skill's native shape unless that shape blocks purpose fulfillment.
- Start lightweight: `description -> gotcha -> output contract -> reference index -> script -> self-training`.
- Do not start self-training without primary intent, baseline, dev eval, regression guard, trace capture, rollback/checkpoint, gate criteria, and human-auditable logs.
- If direct edits are requested, preserve unrelated user changes.

## Reference Files

- `references/necessity-gate.md` — decide whether a skill should exist.
- `references/intent-taxonomy.md` — classify skill purpose and choose success metrics.
- `references/eval-protocol.md` — choose evals and assertions by intent.
- `references/eval-schema.md` — JSON shape for eval plans.
- `references/mutation-policy.md` — choose safe improvement layers.
- `references/anti-overfitting.md` — prevent heavy-method and template overfitting.
- `references/self-training-protocol.md` — run trace-driven self-training with gates.
- `references/runtime-workspace.md` — workspace, checkpoint, baseline, and evolve-plan layout.
- `references/logging-and-gate.md` — AND gate, discard, trace, and logging schema.
- `references/hygiene-and-diagnostics.md` — structural checks and failure diagnosis.
- `references/method-library.md` — reusable methods such as state machines, routing tables, evidence boundaries, scripts, and templates.
- `assets/audit-report-template.md` — formal audit report structure.
- `assets/eval-plan-template.json` — starter eval plan structure.
- `assets/final-report-template.md` — final iterative optimization report structure.
- `scripts/audit-skill.ts` — deterministic first-pass audit.
- `scripts/generate-evals.ts` — generate `evals/evals.json` from audit output.
- `scripts/run-evals.ts` — validate eval schema, run deterministic assertions, and write traces/logs.
- `scripts/workspace-init.ts` — initialize protected optimization workspace, eval splits, baseline traces, and evolve plan.
- `scripts/checkpoint.ts` — snapshot `source/working` before verification.
- `scripts/gate.ts` — apply AND gate to traces and write gate decisions.
