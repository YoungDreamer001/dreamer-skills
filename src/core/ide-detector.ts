import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export interface IDEConfig {
  name: string;
  displayName: string;
  globalSkillPath: string;
  projectSkillPath?: string;
  supportsSymlinks: boolean;
}

function commandExists(cmd: string): boolean {
  try {
    const result = Bun.spawnSync(["which", cmd], {
      stdout: "ignore",
      stderr: "ignore",
    });
    return result.success;
  } catch {
    return false;
  }
}

function hasVSCodeExtension(extId: string): boolean {
  const extensionsDir = path.join(os.homedir(), ".vscode", "extensions");
  if (!fs.existsSync(extensionsDir)) return false;
  try {
    const entries = fs.readdirSync(extensionsDir);
    return entries.some((e) => e.startsWith(extId));
  } catch {
    return false;
  }
}

const IDE_DEFINITIONS: IDEConfig[] = [
  {
    name: "opencode",
    displayName: "OpenCode",
    globalSkillPath: path.join(os.homedir(), ".config", "opencode", "skills"),
    supportsSymlinks: true,
  },
  {
    name: "claude-code",
    displayName: "Claude Code",
    globalSkillPath: path.join(os.homedir(), ".claude", "skills"),
    supportsSymlinks: true,
  },
  {
    name: "copilot",
    displayName: "GitHub Copilot (VS Code)",
    globalSkillPath: path.join(os.homedir(), ".copilot", "skills"),
    supportsSymlinks: true,
  },
  {
    name: "continue",
    displayName: "Continue.dev",
    globalSkillPath: path.join(os.homedir(), ".continue", "skills"),
    supportsSymlinks: true,
  },
  {
    name: "cursor",
    displayName: "Cursor",
    globalSkillPath: path.join(os.homedir(), ".cursor", "skills"),
    supportsSymlinks: true,
  },
  {
    name: "universal",
    displayName: "Universal (.agents)",
    globalSkillPath: path.join(os.homedir(), ".agents", "skills"),
    supportsSymlinks: true,
  },
];

export function getAllIDEDefinitions(): IDEConfig[] {
  return [...IDE_DEFINITIONS];
}

export function detectInstalledIDEs(): IDEConfig[] {
  const detected: IDEConfig[] = [];
  const home = os.homedir();

  for (const ide of IDE_DEFINITIONS) {
    let isInstalled = false;

    switch (ide.name) {
      case "opencode":
        isInstalled =
          fs.existsSync(path.join(home, ".config", "opencode", "opencode.json")) ||
          fs.existsSync(path.join(home, ".config", "opencode", "opencode.jsonc")) ||
          commandExists("opencode");
        break;

      case "claude-code":
        isInstalled =
          fs.existsSync(path.join(home, ".claude")) ||
          fs.existsSync(path.join(home, ".claude.json")) ||
          commandExists("claude") ||
          fs.existsSync("/Applications/Claude.app") ||
          fs.existsSync(path.join(home, "Applications", "Claude.app"));
        break;

      case "copilot":
        isInstalled = commandExists("code") && hasVSCodeExtension("github.copilot");
        break;

      case "continue":
        isInstalled =
          commandExists("code") && hasVSCodeExtension("continue.continue");
        break;

      case "cursor":
        isInstalled =
          fs.existsSync("/Applications/Cursor.app") ||
          fs.existsSync(path.join(home, "Applications", "Cursor.app")) ||
          commandExists("cursor");
        break;

      case "universal":
        isInstalled = true;
        break;
    }

    if (isInstalled) {
      detected.push(ide);
    }
  }

  return detected;
}

export function getIDEByName(name: string): IDEConfig | undefined {
  return IDE_DEFINITIONS.find((ide) => ide.name === name);
}

export function getDetectedIDENames(): string[] {
  return detectInstalledIDEs().map((ide) => ide.name);
}
