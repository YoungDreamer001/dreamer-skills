import fs from "node:fs";
import path from "node:path";
import {
  loadSkillsRegistry,
  saveSkillsRegistry,
} from "../services/registry.js";
import {
  getWarehousePath,
  getRuntimePath,
  canonicalizeProjectId,
  getProjectAgentsSkillsPath,
} from "../utils/paths.js";
import { detectInstalledIDEs, getIDEByName, type IDEConfig } from "./ide-detector.js";

export function resolveSourcePath(root: string, name: string): string {
  const adaptedPath = path.join(getWarehousePath(root, "adapted"), name);
  if (fs.existsSync(path.join(adaptedPath, "SKILL.md"))) {
    return adaptedPath;
  }
  const localPath = path.join(getWarehousePath(root, "local"), name);
  if (fs.existsSync(path.join(localPath, "SKILL.md"))) {
    return localPath;
  }
  throw new Error(
    `Skill source not found for "${name}" in warehouse/adapted or warehouse/local`
  );
}

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function isEnabled(
  registry: import("../models/registry.js").SkillsRegistry,
  name: string,
  scope: "global" | { project: string }
): boolean {
  const entry = registry[name];
  if (!entry) return false;
  if (scope === "global") {
    return entry.enabled_global;
  }
  return entry.enabled_projects.includes(canonicalizeProjectId(scope.project));
}

function ensureSymlink(sourcePath: string, linkPath: string): void {
  let lstat: fs.Stats | undefined;
  try {
    lstat = fs.lstatSync(linkPath);
  } catch {}

  if (lstat) {
    if (!lstat.isSymbolicLink()) {
      throw new Error(`Path "${linkPath}" exists but is not a symbolic link`);
    }
    const existingTarget = fs.readlinkSync(linkPath);
    if (existingTarget !== sourcePath) {
      throw new Error(
        `Symlink "${linkPath}" already exists and points to "${existingTarget}" instead of "${sourcePath}"`
      );
    }
  } else {
    fs.symlinkSync(sourcePath, linkPath);
  }
}

function removeSymlink(linkPath: string): void {
  let lstat: fs.Stats | undefined;
  try {
    lstat = fs.lstatSync(linkPath);
  } catch {}

  if (lstat) {
    if (!lstat.isSymbolicLink()) {
      throw new Error(`Path "${linkPath}" exists but is not a symbolic link`);
    }
    fs.unlinkSync(linkPath);
  }
}

function getIDEsToLink(
  explicitIDEs?: string[]
): IDEConfig[] {
  if (explicitIDEs && explicitIDEs.length > 0) {
    const result: IDEConfig[] = [];
    for (const name of explicitIDEs) {
      const ide = getIDEByName(name);
      if (ide) {
        result.push(ide);
      }
    }
    return result;
  }
  return detectInstalledIDEs();
}

function createIDELinks(sourcePath: string, name: string, ides: IDEConfig[]): string[] {
  const linked: string[] = [];
  for (const ide of ides) {
    ensureDir(ide.globalSkillPath);
    const linkPath = path.join(ide.globalSkillPath, name);
    try {
      ensureSymlink(sourcePath, linkPath);
      linked.push(ide.name);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`Warning: Failed to link skill for ${ide.displayName}: ${message}`);
    }
  }
  return linked;
}

function removeIDELinks(name: string, ides: IDEConfig[]): void {
  for (const ide of ides) {
    const linkPath = path.join(ide.globalSkillPath, name);
    try {
      removeSymlink(linkPath);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`Warning: Failed to remove link for ${ide.displayName}: ${message}`);
    }
  }
}

export function enableSkill(
  root: string,
  name: string,
  scope: "global" | { project: string },
  explicitIDEs?: string[]
): string[] {
  const registry = loadSkillsRegistry(root);
  const entry = registry[name];

  if (!entry || !entry.installed) {
    throw new Error(`Skill "${name}" is not installed`);
  }

  if (isEnabled(registry, name, scope)) {
    return [];
  }

  const sourcePath = resolveSourcePath(root, name);
  const runtimeDir = getRuntimePath(root, scope);
  ensureDir(runtimeDir);

  const linkPath = path.join(runtimeDir, name);
  ensureSymlink(sourcePath, linkPath);

  let linkedIDEs: string[] = [];

  if (scope === "global") {
    const ides = getIDEsToLink(explicitIDEs);
    linkedIDEs = createIDELinks(sourcePath, name, ides);
    entry.enabled_global = true;
    entry.enabled_global_ides = linkedIDEs;
  } else {
    const agentsSkillsDir = getProjectAgentsSkillsPath(scope.project);
    ensureDir(agentsSkillsDir);
    const agentsLinkPath = path.join(agentsSkillsDir, name);
    ensureSymlink(sourcePath, agentsLinkPath);

    const canonicalProject = canonicalizeProjectId(scope.project);
    if (!entry.enabled_projects.includes(canonicalProject)) {
      entry.enabled_projects.push(canonicalProject);
    }
  }

  entry.updated_at = new Date().toISOString();
  saveSkillsRegistry(root, registry);

  return linkedIDEs;
}

export function refreshSkillLinks(
  root: string,
  name: string,
  scope: "global" | { project: string }
): void {
  const sourcePath = resolveSourcePath(root, name);
  const runtimeDir = getRuntimePath(root, scope);
  ensureDir(runtimeDir);

  const linkPath = path.join(runtimeDir, name);
  removeSymlink(linkPath);
  ensureSymlink(sourcePath, linkPath);

  if (scope === "global") {
    const registry = loadSkillsRegistry(root);
    const entry = registry[name];
    const ides = entry?.enabled_global_ides || [];

    for (const ideName of ides) {
      const ide = getIDEByName(ideName);
      if (ide) {
        const ideLinkPath = path.join(ide.globalSkillPath, name);
        removeSymlink(ideLinkPath);
        ensureSymlink(sourcePath, ideLinkPath);
      }
    }
  } else {
    const agentsSkillsDir = getProjectAgentsSkillsPath(scope.project);
    ensureDir(agentsSkillsDir);
    const agentsLinkPath = path.join(agentsSkillsDir, name);
    removeSymlink(agentsLinkPath);
    ensureSymlink(sourcePath, agentsLinkPath);
  }
}

export function disableSkill(
  root: string,
  name: string,
  scope: "global" | { project: string }
): void {
  const registry = loadSkillsRegistry(root);
  const entry = registry[name];

  if (!entry || !isEnabled(registry, name, scope)) {
    throw new Error(`Skill "${name}" is not enabled for the given scope`);
  }

  const runtimeDir = getRuntimePath(root, scope);
  const linkPath = path.join(runtimeDir, name);
  removeSymlink(linkPath);

  if (scope === "global") {
    const ides = entry.enabled_global_ides || [];
    for (const ideName of ides) {
      const ide = getIDEByName(ideName);
      if (ide) {
        removeIDELinks(name, [ide]);
      }
    }
    entry.enabled_global = false;
    entry.enabled_global_ides = [];
  } else {
    const agentsSkillsDir = getProjectAgentsSkillsPath(scope.project);
    const agentsLinkPath = path.join(agentsSkillsDir, name);
    removeSymlink(agentsLinkPath);

    const canonicalProject = canonicalizeProjectId(scope.project);
    entry.enabled_projects = entry.enabled_projects.filter(
      (p) => p !== canonicalProject
    );
  }

  entry.updated_at = new Date().toISOString();
  saveSkillsRegistry(root, registry);
}
