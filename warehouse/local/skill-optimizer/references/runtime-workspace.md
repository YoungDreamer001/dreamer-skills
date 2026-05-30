# Runtime Workspace

Use an isolated workspace for self-training. Do not mutate the user's original skill directory without protection.

## Structure

```text
<skill-name>-optimizer-workspace/
  source/
    original/
    working/
  evals/
    evals.json
    dev.json
    holdout.json
    regression.json
    flaky.json
  runs/
    baseline/
    iteration-001/
      eval-<id>/
        trace.json
        output/
        grading.json
    iteration-002/
  checkpoints/
    iteration-001/
      working/
      checkpoint.json
  logs/
    results.tsv
    experiments.jsonl
    decisions.jsonl
    checkpoints.jsonl
    gates.jsonl
    last-gate.json
  reports/
    evolve-plan.md
    final-report.md
```

## Initialization

Preferred command:

```bash
bun scripts/workspace-init.ts <target-skill-dir> --out-dir=<skill-name>-optimizer-workspace
```

This command performs Phase 0 only. It prepares the workspace, eval splits, baseline traces, logs, and evolve plan. It does not mutate the original target skill.

1. Copy target skill to `source/original/`.
2. Copy target skill to `source/working/`.
3. Treat `source/original/` as read-only.
4. Run all mutations in `source/working/`.
5. Create `evals/` split files.
6. Create `logs/` and `runs/`.

## Checkpoint Strategy

Prefer git when available:

- if target skill is in a clean git worktree, use commits;
- if target skill has no git, initialize git inside workspace;
- if git is unavailable, use file snapshots.

Never require the original target directory to be clean when using a copied workspace. Preserve user changes.

Deterministic snapshot command:

```bash
bun scripts/checkpoint.ts <optimizer-workspace> --iteration=iteration-001 --mutation-layer=SKILL.md
```

This copies `source/working/` into `checkpoints/<iteration>/working/` and appends `logs/checkpoints.jsonl`.

## Checkpoint Record

Each iteration checkpoint records:

- iteration id;
- mutation layer;
- changed files;
- parent checkpoint;
- proposer summary;
- target metric;
- expected improvement.

## Gate

After eval traces exist for an iteration:

```bash
bun scripts/gate.ts <optimizer-workspace> --iteration=iteration-001
```

The gate reads `runs/<iteration>/eval-*/trace.json`, checks safety patterns in `source/working`, and writes:

- `logs/gates.jsonl`;
- `logs/last-gate.json`.

Pending critical assertions produce `needs-human-review` unless `--allow-pending` is explicitly used.

## Baseline

Baseline should include:

- current skill behavior;
- no-skill behavior when applicable;
- previous-version behavior when improving an existing skill;
- cost and trace.

## Evolve Plan

Write `reports/evolve-plan.md` before iteration:

- skill purpose;
- necessity judgment;
- primary intent;
- secondary guardrails;
- eval suites;
- metrics;
- mutation start layer;
- gate thresholds;
- stop conditions;
- human review points.
