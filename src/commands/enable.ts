import { enableSkill } from "../core/activator.js";
import { success, error } from "../utils/logger.js";

export function enable(
  root: string,
  name: string,
  options: { global?: boolean; project?: string; ide?: string[] }
): void {
  const scope: "global" | { project: string } = options.project ? { project: options.project } : "global";

  try {
    const linkedIDEs = enableSkill(root, name, scope, options.ide);
    if (scope === "global" && linkedIDEs.length > 0) {
      success(`Enabled skill: ${name} (global, linked to: ${linkedIDEs.join(", ")})`);
    } else {
      success(`Enabled skill: ${name} (${scope === "global" ? "global" : `project: ${options.project}`})`);
    }
  } catch (err) {
    error(`Enable failed: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }
}
