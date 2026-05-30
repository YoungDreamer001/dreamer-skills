#!/usr/bin/env bun
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

type AssertionMethod =
  | "contains"
  | "not_contains"
  | "regex"
  | "file_exists"
  | "json_path"
  | "script_check"
  | "path_hit"
  | "fact_coverage"
  | "llm_judge"
  | "human_preference";

type EvalAssertion = {
  name: string;
  method: AssertionMethod;
  expect: string;
  criteria: string;
};

type EvalCase = {
  id: string;
  type: string;
  prompt: string;
  expected_signal: string;
  assertions: EvalAssertion[];
  split: "dev" | "holdout" | "regression" | "flaky";
  source: string;
  notes?: string;
};

type EvalSuite = {
  skill_name: string;
  version: number;
  cases: EvalCase[];
};

type AssertionResult = {
  name: string;
  method: AssertionMethod;
  status: "pass" | "fail" | "pending" | "error";
  evidence: string;
};

type CaseTrace = {
  case_id: string;
  prompt: string;
  expected: string;
  skill_version: string;
  loaded_files: string[];
  scripts_run: string[];
  output_paths: string[];
  assertions: AssertionResult[];
  judge: {
    passed: boolean | null;
    evidence: string;
  };
  failure_mode: string;
  cost: {
    tokens: number;
    seconds: number;
  };
};

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    suitePath: "",
    outputDir: "",
    responseFile: "",
    iteration: "baseline",
  };

  for (const arg of args) {
    if (arg.startsWith("--output-dir=")) options.outputDir = arg.slice("--output-dir=".length);
    else if (arg.startsWith("--response-file=")) options.responseFile = arg.slice("--response-file=".length);
    else if (arg.startsWith("--iteration=")) options.iteration = arg.slice("--iteration=".length);
    else if (!options.suitePath) options.suitePath = arg;
    else fail(`Unexpected argument: ${arg}`);
  }

  if (!options.suitePath) {
    fail(
      "Usage: bun scripts/run-evals.ts <evals/evals.json> [--output-dir=runs/baseline] [--response-file=output.txt] [--iteration=baseline]"
    );
  }

  return options;
}

function fail(message: string): never {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function loadSuite(path: string): EvalSuite {
  if (!existsSync(path)) fail(`Eval suite not found: ${path}`);
  const suite = JSON.parse(readFileSync(path, "utf-8")) as EvalSuite;
  validateSuite(suite);
  return suite;
}

function validateSuite(suite: EvalSuite) {
  const errors: string[] = [];
  if (!suite || typeof suite !== "object") errors.push("Suite must be a JSON object.");
  if (!suite.skill_name || typeof suite.skill_name !== "string") errors.push("skill_name is required.");
  if (!Array.isArray(suite.cases)) errors.push("cases must be an array.");

  const ids = new Set<string>();
  for (const item of suite.cases ?? []) {
    if (!item.id) errors.push("case.id is required.");
    if (ids.has(item.id)) errors.push(`duplicate case id: ${item.id}`);
    ids.add(item.id);
    if (!item.type) errors.push(`${item.id}: type is required.`);
    if (!item.prompt) errors.push(`${item.id}: prompt is required.`);
    if (!item.expected_signal) errors.push(`${item.id}: expected_signal is required.`);
    if (!["dev", "holdout", "regression", "flaky"].includes(item.split)) {
      errors.push(`${item.id}: split must be dev, holdout, regression, or flaky.`);
    }
    if (!Array.isArray(item.assertions) || item.assertions.length === 0) {
      errors.push(`${item.id}: assertions must be a non-empty array.`);
    }
    for (const assertion of item.assertions ?? []) {
      if (!assertion.name) errors.push(`${item.id}: assertion.name is required.`);
      if (!assertion.method) errors.push(`${item.id}: assertion.method is required.`);
      if (!assertion.expect) errors.push(`${item.id}: assertion.expect is required.`);
    }
  }

  if (errors.length > 0) fail(`Invalid eval suite:\n- ${errors.join("\n- ")}`);
}

function evaluateAssertion(assertion: EvalAssertion, response: string): AssertionResult {
  try {
    if (assertion.method === "contains") {
      const passed = response.includes(assertion.expect);
      return {
        name: assertion.name,
        method: assertion.method,
        status: passed ? "pass" : "fail",
        evidence: passed ? `Response contains ${JSON.stringify(assertion.expect)}.` : "Expected text was not found.",
      };
    }

    if (assertion.method === "not_contains") {
      const passed = !response.includes(assertion.expect);
      return {
        name: assertion.name,
        method: assertion.method,
        status: passed ? "pass" : "fail",
        evidence: passed ? `Response does not contain ${JSON.stringify(assertion.expect)}.` : "Forbidden text was found.",
      };
    }

    if (assertion.method === "regex") {
      const regex = new RegExp(assertion.expect, "m");
      const passed = regex.test(response);
      return {
        name: assertion.name,
        method: assertion.method,
        status: passed ? "pass" : "fail",
        evidence: passed ? `Response matches /${assertion.expect}/.` : `Response does not match /${assertion.expect}/.`,
      };
    }

    if (assertion.method === "file_exists") {
      const path = resolve(assertion.expect);
      const passed = existsSync(path);
      return {
        name: assertion.name,
        method: assertion.method,
        status: passed ? "pass" : "fail",
        evidence: passed ? `File exists: ${path}` : `File missing: ${path}`,
      };
    }

    return {
      name: assertion.name,
      method: assertion.method,
      status: "pending",
      evidence: `${assertion.method} requires external execution, trace inspection, LLM judgment, or human review.`,
    };
  } catch (err) {
    return {
      name: assertion.name,
      method: assertion.method,
      status: "error",
      evidence: err instanceof Error ? err.message : String(err),
    };
  }
}

function caseStatus(results: AssertionResult[]): "pass" | "fail" | "pending" | "error" {
  if (results.some((item) => item.status === "error")) return "error";
  if (results.some((item) => item.status === "fail")) return "fail";
  if (results.some((item) => item.status === "pending")) return "pending";
  return "pass";
}

function writeTrace(outputDir: string, iteration: string, item: EvalCase, results: AssertionResult[], seconds: number) {
  const caseDir = join(outputDir, `eval-${item.id}`);
  mkdirSync(caseDir, { recursive: true });
  const status = caseStatus(results);
  const trace: CaseTrace = {
    case_id: item.id,
    prompt: item.prompt,
    expected: item.expected_signal,
    skill_version: iteration,
    loaded_files: [],
    scripts_run: [],
    output_paths: [],
    assertions: results,
    judge: {
      passed: status === "pass" ? true : status === "fail" ? false : null,
      evidence: results.map((result) => `${result.name}: ${result.evidence}`).join(" | "),
    },
    failure_mode: status === "pass" ? "" : status,
    cost: {
      tokens: 0,
      seconds,
    },
  };
  writeFileSync(join(caseDir, "trace.json"), `${JSON.stringify(trace, null, 2)}\n`, "utf-8");
}

function pct(numerator: number, denominator: number): string {
  if (denominator === 0) return "n/a";
  return (numerator / denominator).toFixed(3);
}

function main() {
  const options = parseArgs();
  const suitePath = resolve(options.suitePath);
  const suite = loadSuite(suitePath);
  const response = options.responseFile ? readFileSync(resolve(options.responseFile), "utf-8") : "";
  const outputDir = resolve(options.outputDir || join(dirname(suitePath), "..", "runs", options.iteration));
  mkdirSync(outputDir, { recursive: true });

  const started = Date.now();
  const caseRows: Array<{ item: EvalCase; status: "pass" | "fail" | "pending" | "error"; seconds: number }> = [];

  for (const item of suite.cases) {
    const caseStarted = Date.now();
    const results = item.assertions.map((assertion) => evaluateAssertion(assertion, response));
    const seconds = (Date.now() - caseStarted) / 1000;
    const status = caseStatus(results);
    writeTrace(outputDir, options.iteration, item, results, seconds);
    caseRows.push({ item, status, seconds });
  }

  const bySplit = (split: EvalCase["split"]) => caseRows.filter((row) => row.item.split === split);
  const passRate = (rows: typeof caseRows) => pct(rows.filter((row) => row.status === "pass").length, rows.length);
  const pendingCount = caseRows.filter((row) => row.status === "pending").length;
  const failedCount = caseRows.filter((row) => row.status === "fail" || row.status === "error").length;
  const decision = failedCount > 0 ? "discard" : pendingCount > 0 ? "needs-human-review" : "keep";
  const elapsed = (Date.now() - started) / 1000;

  const logsDir = join(dirname(outputDir), "..", "logs");
  mkdirSync(logsDir, { recursive: true });
  const resultsPath = join(logsDir, "results.tsv");
  if (!existsSync(resultsPath)) {
    writeFileSync(
      resultsPath,
      [
        "iteration",
        "timestamp",
        "mutation_layer",
        "decision",
        "primary_metric_before",
        "primary_metric_after",
        "dev_pass_rate",
        "holdout_pass_rate",
        "regression_pass_rate",
        "cost_tokens",
        "cost_seconds",
        "changed_files",
        "notes",
      ].join("\t") + "\n",
      "utf-8"
    );
  }

  const notes = `${caseRows.length} cases, ${pendingCount} pending, ${failedCount} failed`;
  writeFileSync(
    resultsPath,
    `${options.iteration}\t${new Date().toISOString()}\tevals\t${decision}\tn/a\tn/a\t${passRate(bySplit("dev"))}\t${passRate(
      bySplit("holdout")
    )}\t${passRate(bySplit("regression"))}\t0\t${elapsed.toFixed(3)}\tn/a\t${notes}\n`,
    { flag: "a" }
  );

  const summary = {
    suite: basename(suitePath),
    skill_name: suite.skill_name,
    iteration: options.iteration,
    decision,
    cases: caseRows.map((row) => ({ id: row.item.id, split: row.item.split, status: row.status })),
    output_dir: outputDir,
    results_tsv: resultsPath,
  };

  console.log(JSON.stringify(summary, null, 2));
}

main();
