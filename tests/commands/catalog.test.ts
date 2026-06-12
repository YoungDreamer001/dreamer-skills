import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { stringify } from "yaml";
import { catalog } from "../../src/commands/catalog.js";
import { saveSkillsRegistry, saveSourcesRegistry } from "../../src/services/registry.js";

describe("catalog", () => {
  let tempDir: string;
  let logs: string[];
  let originalLog: typeof console.log;
  let originalWarn: typeof console.warn;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "hk-skills-catalog-test-"));
    fs.mkdirSync(path.join(tempDir, "registry"), { recursive: true });
    fs.mkdirSync(path.join(tempDir, "manifests"), { recursive: true });

    logs = [];
    originalLog = console.log;
    originalWarn = console.warn;
    console.log = (msg: string) => {
      logs.push(msg);
    };
    console.warn = (msg: string) => {
      logs.push(msg);
    };
  });

  afterEach(() => {
    console.log = originalLog;
    console.warn = originalWarn;
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("generates grouped markdown catalog", () => {
    saveSkillsRegistry(tempDir, {
      "test-skill-local": {
        manifest: "manifests/test-skill-local.yaml",
        installed: true,
        enabled_global: true,
        enabled_global_ides: [],
        enabled_projects: [],
        updated_at: "2024-01-01T00:00:00Z",
        source_id: "local-test-skill-local",
      },
      "test-skill-remote": {
        manifest: "manifests/test-skill-remote.yaml",
        installed: true,
        enabled_global: false,
        enabled_global_ides: [],
        enabled_projects: ["proj-a"],
        updated_at: "2024-01-02T00:00:00Z",
        source_id: "github.com_example_remote@main",
      },
      "test-skill-adapted": {
        manifest: "manifests/test-skill-adapted.yaml",
        installed: true,
        enabled_global: false,
        enabled_global_ides: [],
        enabled_projects: [],
        updated_at: "2024-01-03T00:00:00Z",
        source_id: "adapted-test-skill-adapted",
      },
    });

    saveSourcesRegistry(tempDir, {
      "local-test-skill-local": {
        type: "local",
        local_path: "warehouse/local/test-skill-local",
      },
      "github.com_example_remote@main": {
        type: "remote",
        repo: "https://github.com/example/remote",
        ref: "main",
        commit: "abc123",
        local_path: "warehouse/remote/github.com_example_remote@main",
      },
      "adapted-test-skill-adapted": {
        type: "local",
        local_path: "warehouse/local/test-skill-adapted",
      },
    });

    fs.writeFileSync(
      path.join(tempDir, "manifests", "test-skill-local.yaml"),
      stringify({
        name: "test-skill-local",
        display_name: "Test Skill Local",
        source: { type: "local" },
        status: { stage: "adapted" },
        capabilities: ["cap-a", "cap-b"],
        triggers: ["trigger-a"],
        scope: { recommended: "all" },
      }),
      "utf-8"
    );

    fs.writeFileSync(
      path.join(tempDir, "manifests", "test-skill-remote.yaml"),
      stringify({
        name: "test-skill-remote",
        display_name: "Test Skill Remote",
        source: { type: "remote" },
        status: { stage: "stable" },
        capabilities: ["cap-c"],
        triggers: ["trigger-b", "trigger-c"],
        scope: { recommended: "frontend" },
      }),
      "utf-8"
    );

    fs.writeFileSync(
      path.join(tempDir, "manifests", "test-skill-adapted.yaml"),
      stringify({
        name: "test-skill-adapted",
        display_name: "Test Skill Adapted",
        source: { type: "adapted" },
        status: { stage: "beta" },
        capabilities: ["cap-d"],
        triggers: ["trigger-d"],
        scope: { recommended: "backend" },
      }),
      "utf-8"
    );

    catalog(tempDir);

    const catalogPath = path.join(tempDir, "docs", "catalog.md");
    expect(fs.existsSync(catalogPath)).toBe(true);

    const content = fs.readFileSync(catalogPath, "utf-8");
    expect(content).toContain("## Local");
    expect(content).toContain("| Test Skill Local | warehouse/local/test-skill-local |");
    expect(content).toContain("## Remote");
    expect(content).toContain("| Test Skill Remote | https://github.com/example/remote |");
    expect(content).toContain("## Adapted");
  });

  it("shows empty catalog when registry is empty", () => {
    saveSkillsRegistry(tempDir, {});
    catalog(tempDir);

    const catalogPath = path.join(tempDir, "docs", "catalog.md");
    expect(fs.existsSync(catalogPath)).toBe(true);

    const content = fs.readFileSync(catalogPath, "utf-8");
    expect(content.toLowerCase()).toContain("no skills installed");
  });

  it("handles missing manifest gracefully", () => {
    saveSkillsRegistry(tempDir, {
      "missing-skill": {
        manifest: "manifests/missing-skill.yaml",
        installed: true,
        enabled_global: false,
        enabled_global_ides: [],
        enabled_projects: [],
        updated_at: "2024-01-01T00:00:00Z",
        source_id: "local-missing-skill",
      },
    });

    catalog(tempDir);

    const catalogPath = path.join(tempDir, "docs", "catalog.md");
    expect(fs.existsSync(catalogPath)).toBe(true);

    const content = fs.readFileSync(catalogPath, "utf-8");
    expect(content).toContain("missing-skill");
    const lowerContent = content.toLowerCase();
    expect(lowerContent.includes("unknown") || lowerContent.includes("error")).toBe(true);
  });

  it("renders source URL correctly", () => {
    saveSkillsRegistry(tempDir, {
      "remote-skill": {
        manifest: "manifests/remote-skill.yaml",
        installed: true,
        enabled_global: false,
        enabled_global_ides: [],
        enabled_projects: [],
        updated_at: "2024-01-01T00:00:00Z",
        source_id: "github.com_anthropics_skills@main",
      },
    });

    saveSourcesRegistry(tempDir, {
      "github.com_anthropics_skills@main": {
        type: "remote",
        repo: "https://github.com/anthropics/skills",
        ref: "main",
        commit: "da20c92503b2e8ff1cf28ca81a0df4673debdbf7",
        local_path: "warehouse/remote/github.com_anthropics_skills@main",
      },
    });

    fs.writeFileSync(
      path.join(tempDir, "manifests", "remote-skill.yaml"),
      stringify({
        name: "remote-skill",
        display_name: "Remote Skill",
        source: { type: "remote" },
        status: { stage: "stable" },
      }),
      "utf-8"
    );

    catalog(tempDir);

    const catalogPath = path.join(tempDir, "docs", "catalog.md");
    const content = fs.readFileSync(catalogPath, "utf-8");

    expect(content).toContain("https://github.com/anthropics/skills");
    expect(content).not.toContain("global");
    expect(content).not.toContain("disabled");
    expect(content).not.toContain("项目:");
  });
});
