import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { loadSkillsRegistry, loadSourcesRegistry } from "../services/registry.js";
import { success } from "../utils/logger.js";

type SkillInfo = {
  name: string;
  displayName: string;
  sourceUrl: string;
  stage: string;
  description: string;
  triggers: string;
};

function parseSkillFrontmatter(skillPath: string): { description?: string } {
  if (!fs.existsSync(skillPath)) return {};
  try {
    const content = fs.readFileSync(skillPath, "utf-8");
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return {};
    const [, frontmatterText] = match;
    const frontmatter = parse(frontmatterText!) as Record<string, unknown>;
    return {
      description: typeof frontmatter.description === "string" ? frontmatter.description : undefined,
    };
  } catch {
    return {};
  }
}

function extractTriggers(description: string): string {
  const useWhenMatch = description.match(/use when[^.]+/i);
  if (useWhenMatch) {
    return useWhenMatch[0].replace(/^use when\s*/i, "").trim();
  }
  const mentionMatch = description.match(/mentions?\s+["']([^"']+)["']/gi);
  if (mentionMatch) {
    return mentionMatch.map(m => m.replace(/mentions?\s+["']/i, "").replace(/["']$/, "")).join(", ");
  }
  return description.length > 80 ? description.slice(0, 80) + "..." : description;
}

export function catalog(root: string): void {
  const registry = loadSkillsRegistry(root);
  const sources = loadSourcesRegistry(root);
  const entries = Object.entries(registry);

  const docsDir = path.join(root, "docs");
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const catalogPath = path.join(docsDir, "catalog.md");

  if (entries.length === 0) {
    fs.writeFileSync(
      catalogPath,
      "# Skill Catalog\n\nNo skills installed.\n",
      "utf-8"
    );
    success("Catalog generated: " + path.resolve(catalogPath));
    return;
  }

  const groups = {
    local: [] as SkillInfo[],
    remote: [] as SkillInfo[],
    adapted: [] as SkillInfo[],
    unknown: [] as SkillInfo[],
  };

  for (const [name, entry] of entries) {
    const manifestPath = path.join(root, entry.manifest);
    let displayName = name;
    let sourceType = "unknown";
    let stage = "unknown";
    let description = "-";
    let triggers = "-";

    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = parse(fs.readFileSync(manifestPath, "utf-8")) as Record<string, unknown>;
        displayName = typeof manifest.display_name === "string" ? manifest.display_name : name;
        const manifestSource = manifest.source as Record<string, unknown> | undefined;
        sourceType = typeof manifestSource?.type === "string" ? manifestSource.type : "unknown";
        const manifestStatus = manifest.status as Record<string, unknown> | undefined;
        stage = typeof manifestStatus?.stage === "string" ? manifestStatus.stage : "unknown";
      } catch {
        sourceType = "error";
        stage = "error";
      }
    } else {
      sourceType = "unknown";
      stage = "unknown";
    }

    const sourceEntry = sources[entry.source_id];
    const sourceUrl = sourceEntry?.repo
      ? sourceEntry.repo
      : sourceEntry?.local_path
        ? sourceEntry.local_path
        : "unknown";

    const skillDir = sourceType === "local" ? "warehouse/local" : "warehouse/adapted";
    const skillPath = path.join(root, skillDir, name, "SKILL.md");
    const frontmatter = parseSkillFrontmatter(skillPath);
    if (frontmatter.description) {
      description = frontmatter.description;
      triggers = extractTriggers(frontmatter.description);
    }

    const skillInfo: SkillInfo = {
      name,
      displayName,
      sourceUrl,
      stage,
      description,
      triggers,
    };

    const targetGroup = groups[sourceType as keyof typeof groups];
    if (targetGroup) {
      targetGroup.push(skillInfo);
    } else {
      groups.unknown.push(skillInfo);
    }
  }

  for (const key of Object.keys(groups) as (keyof typeof groups)[]) {
    groups[key]!.sort((a, b) => a.name.localeCompare(b.name));
  }

  const lines: string[] = [];
  lines.push("# Skill Catalog");

  const groupOrder: (keyof typeof groups)[] = ["local", "remote", "adapted", "unknown"];
  const groupTitles: Record<keyof typeof groups, string> = {
    local: "Local",
    remote: "Remote",
    adapted: "Adapted",
    unknown: "Unknown",
  };

  for (const groupKey of groupOrder) {
    const groupSkills = groups[groupKey];
    if (!groupSkills || groupSkills.length === 0) continue;

    lines.push("");
    lines.push(`## ${groupTitles[groupKey]}`);
    lines.push("");
    lines.push("| 名称 | 源地址 | 状态 | 描述 | 触发关键词 |");
    lines.push("| --- | --- | --- | --- | --- |");

    for (const skill of groupSkills) {
      const cells = [
        escapeCell(skill.displayName),
        escapeCell(skill.sourceUrl),
        escapeCell(skill.stage),
        escapeCell(skill.description),
        escapeCell(skill.triggers),
      ];
      lines.push(`| ${cells.join(" | ")} |`);
    }
  }

  fs.writeFileSync(catalogPath, lines.join("\n") + "\n", "utf-8");
  success("Catalog generated: " + path.resolve(catalogPath));
}

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|");
}
