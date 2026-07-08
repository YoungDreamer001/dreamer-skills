#!/usr/bin/env node
// Regenerate the Chinese user-facing catalog and rebuild docs/catalog.html.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const CATALOG_MD = path.join(ROOT, 'docs', 'catalog.md');

const SCENARIO_SECTIONS = [
  {
    title: '🧠 想法澄清与压力测试（Idea & Challenge）',
    intro: '想法还没定型时使用：发散、收敛、追问、压力测试、战略判断。',
    names: ['ce-brainstorm', 'ce-ideate', 'ce-strategy', 'grill-me', 'idea-refine', 'grilling', 'grill-with-docs', 'loop-me', 'ce-doc-review'],
  },
  {
    title: '🧭 规划、规格与任务拆解（Planning & Specs）',
    intro: '目标基本明确后使用：PRD、规格、任务拆解、issue 地图、重构计划。',
    names: ['ce-plan', 'planning-and-task-breakdown', 'spec-driven-development', 'to-prd', 'doc-coauthoring', 'wayfinder', 'decision-mapping', 'request-refactor-plan', 'to-issues', 'triage', 'setup-matt-pocock-skills'],
  },
  {
    title: '🏗️ 架构、接口与领域模型（Architecture & Modeling）',
    intro: '需要先把系统边界、接口、领域语言和架构取舍想清楚时使用。',
    names: ['api-and-interface-design', 'design-an-interface', 'ce-agent-native-architecture', 'ce-agent-native-audit', 'domain-modeling', 'ubiquitous-language', 'codebase-design', 'documentation-and-adrs'],
  },
  {
    title: '💻 编码实现与原型（Implementation & Prototyping）',
    intro: '进入代码阶段使用：实现功能、TDD、增量交付、原型、语言/测试专项迁移。',
    names: ['ce-work', 'ce-work-beta', 'lfg', 'incremental-implementation', 'ce-worktree', 'tdd', 'test-driven-development', 'source-driven-development', 'ce-dhh-rails-style', 'scaffold-exercises', 'implement', 'prototype', 'migrate-to-shoehorn'],
  },
  {
    title: '🖥️ 前端、网页与浏览器体验（Frontend & Web）',
    intro: '面向用户界面的设计、实现、打磨、浏览器验证与 UX 审查。',
    names: ['frontend-ui-engineering', 'ce-frontend-design', 'frontend-design', 'web-design', 'web-design-engineer', 'web-artifacts-builder', 'ce-polish', 'web-design-guidelines', 'browser-testing-with-devtools', 'webapp-testing'],
  },
  {
    title: '🔍 代码审查、调试与重构（Review & Debugging）',
    intro: '代码已经存在或出现异常时使用：Review、定位根因、简化代码、处理审查反馈。',
    names: ['ce-code-review', 'code-review-and-quality', 'code-review', 'ce-resolve-pr-feedback', 'ce-debug', 'debugging-and-error-recovery', 'code-simplification', 'ce-simplify-code', 'improve-codebase-architecture', 'diagnosing-bugs', 'review'],
  },
  {
    title: '🧪 测试、性能、安全与质量信号（Quality Signals）',
    intro: '需要证据化验证质量时使用：测试、性能、安全、QA、演示证据、产品反馈。',
    names: ['ce-optimize', 'performance-optimization', 'security-and-hardening', 'ce-dogfood-beta', 'ce-test-browser', 'ce-test-xcode', 'qa', 'ce-report-bug', 'ce-demo-reel', 'ce-riffrec-feedback-analysis', 'ce-product-pulse'],
  },
  {
    title: '🚢 Git、发布与工程自动化（Delivery & Automation）',
    intro: '从本地改动走向协作和上线：commit、PR、CI/CD、发布、迁移、交接。',
    names: ['ce-commit', 'ce-commit-push-pr', 'git-workflow-and-versioning', 'git-guardrails-claude-code', 'ce-clean-gone-branches', 'ci-cd-and-automation', 'deprecation-and-migration', 'setup-pre-commit', 'release-skills', 'shipping-and-launch', 'ce-promote', 'ce-release-notes', 'resolving-merge-conflicts', 'handoff', 'claude-handoff', 'wizard', 'ce-setup', 'ce-update'],
  },
  {
    title: '✍️ 内容写作与转写（Writing & Editing）',
    intro: '文章、论文、博客、影评、字幕转写、草稿合并与写作节奏处理。',
    names: ['article-analyzer', 'concept-fable', 'douban-dice-review', 'edit-article', 'writing-shape', 'merge-drafts', 'subtext-article', 'blog-checker', 'writing-beats', 'writing-fragments'],
  },
  {
    title: '📣 社交媒体、视频与发布素材（Social & Video）',
    intro: '公众号、小红书、YouTube 字幕、视频剪辑和社媒发布素材。',
    names: ['baoyu-post-to-wechat', 'baoyu-youtube-transcript', 'guizang-social-card-skill', 'jianying-editor'],
  },
  {
    title: '🎨 视觉内容、图像与品牌 IP（Visual Assets）',
    intro: '封面、配图、漫画、角色 IP、图像生成/编辑、图片压缩与品牌动画。',
    names: ['baoyu-cover-image', 'baoyu-article-illustrator', 'baoyu-comic', 'baoyu-compress-image', 'comic-ip-onboarder', 'kane-q-cover-image', 'kane-q-infographic', 'canvas-design', 'ce-gemini-imagegen', 'gpt-image-2', 'pixel2motion'],
  },
  {
    title: '📊 图表、信息图与设计稿（Diagrams & Design Artifacts）',
    intro: '架构图、流程图、信息图、设计稿、动态手绘图与跨产物主题。',
    names: ['architecture-diagram', 'baoyu-diagram', 'baoyu-infographic', 'baoyu-design', 'lanshu-animated-architecture-diagram', 'theme-factory'],
  },
  {
    title: '📄 文件、格式转换与 Office（Files & Formats）',
    intro: 'Markdown、翻译、URL 抓取、PDF、Word、Excel、PPT 和可分享文档。',
    names: ['baoyu-format-markdown', 'baoyu-translate', 'baoyu-url-to-markdown', 'baoyu-markdown-to-html', 'pdf', 'docx', 'xlsx', 'pptx', 'ce-proof'],
  },
  {
    title: '📚 知识库、研究与组织记忆（Knowledge & Research）',
    intro: '高信度调研、知识库检索、Obsidian、微信读书、会话复盘和团队记忆。',
    names: ['weread-skills', 'session-achieve', 'ima-skill', 'research', 'kb-retriever', 'obsidian-vault', 'serenity-skill', 'ce-sessions', 'ce-slack-research', 'ce-compound', 'ce-compound-refresh'],
  },
  {
    title: '🤖 Agent、Skill 与工具集成（Agent & Skill Engineering）',
    intro: '创建、安装、优化、测评 Skill，建设 MCP、上下文规则和 Agent 工具链。',
    names: ['skill-creator', 'skill-installer', 'skill-optimizer', 'skill-evaluator', 'using-agent-skills', 'context-engineering', 'claude-api', 'mcp-builder', 'it-system-skill-distiller', 'HeavySkill', 'prompt-optimizer', 'ask-matt', 'writing-great-skills'],
  },
];

const QUICK_PICKER = [
  ['把模糊想法变清楚', 'ce-brainstorm', ['idea-refine', 'grill-me']],
  ['写 PRD、规格或任务拆解', 'to-prd', ['ce-plan', 'planning-and-task-breakdown']],
  ['设计接口、架构或领域模型', 'api-and-interface-design', ['design-an-interface', 'domain-modeling']],
  ['实现功能或修代码', 'ce-work', ['incremental-implementation', 'tdd']],
  ['做网页、UI 或浏览器验证', 'web-design', ['frontend-design', 'webapp-testing']],
  ['Review、找 bug、处理反馈', 'ce-code-review', ['ce-debug', 'ce-resolve-pr-feedback']],
  ['发布、提交、开 PR', 'ce-commit-push-pr', ['ce-commit', 'release-skills']],
  ['写文章、转写或审稿', 'article-analyzer', ['subtext-article', 'blog-checker']],
  ['生成封面、配图、漫画或信息图', 'baoyu-infographic', ['baoyu-cover-image', 'kane-q-infographic']],
  ['处理 PDF、Word、Excel 或 PPT', 'pdf', ['docx', 'xlsx', 'pptx']],
  ['做研究、知识库检索或会话复盘', 'research', ['kb-retriever', 'session-achieve']],
  ['创建、安装或优化 Skill', 'skill-creator', ['skill-installer', 'skill-optimizer']],
];

function splitMarkdownRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|')) return [];

  const body = trimmed.replace(/^\|/, '').replace(/\|$/, '');
  const cells = [];
  let current = '';
  let escaped = false;

  for (const char of body) {
    if (escaped) {
      current += char;
      escaped = false;
    } else if (char === '\\') {
      current += char;
      escaped = true;
    } else if (char === '|') {
      cells.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  cells.push(current.trim());
  return cells;
}

function tableFormatFromHeader(cells) {
  const joined = cells.join('|');
  if (!joined.includes('触发关键词')) return null;

  if (cells.length === 4 && cells[0] === '技能名称') return 'scenario4';
  if (cells.length === 5 && cells[0] === '名称') return 'raw5';
  if (cells.length === 5 && cells[1] === '技能名称') return 'status5';
  return null;
}

function normalizeSource(source, sectionTitle) {
  if (source === '本地' || source === '远程') return source;
  if (sectionTitle === 'Local' || source.includes('warehouse/local')) return '本地';
  return '远程';
}

function parseCatalog(content) {
  const skills = [];
  let sectionTitle = '';
  let currentTable = null;

  for (const line of content.split('\n')) {
    if (line.startsWith('## ')) {
      sectionTitle = line.replace(/^## /, '').trim();
      currentTable = null;
      continue;
    }

    if (!line.startsWith('|')) {
      currentTable = null;
      continue;
    }

    const cells = splitMarkdownRow(line);
    const maybeFormat = tableFormatFromHeader(cells);
    if (maybeFormat) {
      currentTable = maybeFormat;
      continue;
    }

    if (!currentTable || cells.every((cell) => /^-+$/.test(cell))) continue;

    let skill = null;
    if (currentTable === 'scenario4' && cells.length >= 4) {
      skill = {
        name: cells[0],
        source: cells[1],
        desc: cells[2],
        triggers: cells[3],
      };
    } else if (currentTable === 'raw5' && cells.length >= 5) {
      skill = {
        name: cells[0],
        source: normalizeSource(cells[1], sectionTitle),
        desc: cells[3],
        triggers: cells[4],
      };
    } else if (currentTable === 'status5' && cells.length >= 5) {
      skill = {
        name: cells[1],
        source: normalizeSource(cells[2], sectionTitle),
        desc: cells[3],
        triggers: cells[4],
      };
    }

    if (skill && skill.name && skill.name !== '技能名称' && skill.name !== '名称') {
      skills.push(skill);
    }
  }

  return dedupeSkills(skills);
}

function dedupeSkills(skills) {
  const byName = new Map();
  for (const skill of skills) {
    const name = skill.name.replace(/`/g, '').replace(/\s*⛔$/, '').trim();
    if (!name || byName.has(name)) continue;
    byName.set(name, { ...skill, name });
  }
  return [...byName.values()];
}

function categoryBySkillName() {
  const map = new Map();
  for (const section of SCENARIO_SECTIONS) {
    for (const name of section.names) {
      if (map.has(name)) {
        throw new Error(`Skill is assigned to multiple categories: ${name}`);
      }
      map.set(name, section.title);
    }
  }
  return map;
}

function escapeCell(value) {
  const marker = '\u0000PIPE\u0000';
  return String(value || '-')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\\\|/g, marker)
    .replace(/\|/g, '\\|')
    .replaceAll(marker, '\\|');
}

function code(name) {
  return `\`${name}\``;
}

function generateCatalogMarkdown(skills) {
  const byName = new Map(skills.map((skill) => [skill.name, skill]));
  const categoryMap = categoryBySkillName();
  const assignedNames = new Set(SCENARIO_SECTIONS.flatMap((section) => section.names));
  const unknownSkills = skills
    .filter((skill) => !assignedNames.has(skill.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  let md = `---\n`;
  md += `title: "HK-Skills 技能目录"\n`;
  md += `description: "按使用意图、工作场景与全量索引整理的中文技能目录，保留英文触发关键词。"\n`;
  md += `---\n\n`;
  md += `# HK-Skills 技能目录\n\n`;
  md += `> 先按“我想做什么”定位入口；知道技能名时直接用页面搜索或查看底部全量索引。\n`;
  md += `> 每个技能保留英文触发关键词，便于 Agent 匹配。\n\n`;

  md += `## 🚀 快速选择（Quick Picker）\n\n`;
  md += `| 我想做什么 | 首选技能 | 备选/搭配 |\n`;
  md += `| --- | --- | --- |\n`;
  for (const [intent, primary, alternatives] of QUICK_PICKER) {
    md += `| ${intent} | ${code(primary)} | ${alternatives.map(code).join(', ')} |\n`;
  }
  md += `\n`;

  md += `## 🗂️ 使用方式\n\n`;
  md += `- 不知道技能名：先看快速选择，再进入对应场景分类。\n`;
  md += `- 知道技能名：在 HTML 目录中搜索，或查看底部“全量技能索引”。\n`;
  md += `- 选择困难：优先选更贴近当前产物的技能；开发任务按“规划 → 架构 → 实现 → 质量 → 发布”顺序推进。\n\n`;

  for (const section of SCENARIO_SECTIONS) {
    const sectionSkills = section.names.map((name) => byName.get(name)).filter(Boolean);
    if (sectionSkills.length === 0) continue;

    md += `## ${section.title}\n\n`;
    md += `> ${section.intro}\n\n`;
    md += `| 技能名称 | 来源 | 说明 | 触发关键词 |\n`;
    md += `| --- | --- | --- | --- |\n`;
    for (const skill of sectionSkills) {
      md += `| ${escapeCell(skill.name)} | ${escapeCell(skill.source)} | ${escapeCell(skill.desc)} | ${escapeCell(skill.triggers)} |\n`;
    }
    md += `\n`;
  }

  if (unknownSkills.length > 0) {
    md += `## 🧰 其他工具（Other Tools）\n\n`;
    md += `> 尚未纳入固定场景规则的新技能；后续可根据实际用途归入上方分类。\n\n`;
    md += `| 技能名称 | 来源 | 说明 | 触发关键词 |\n`;
    md += `| --- | --- | --- | --- |\n`;
    for (const skill of unknownSkills) {
      md += `| ${escapeCell(skill.name)} | ${escapeCell(skill.source)} | ${escapeCell(skill.desc)} | ${escapeCell(skill.triggers)} |\n`;
    }
    md += `\n`;
  }

  md += `## 🔎 全量技能索引（Alphabetical Index）\n\n`;
  md += `> 按技能名排序，用于快速定位所在分类；详细触发词以上方场景分类为准。\n\n`;
  md += `| 名称 | 所在分类 | 一句话 |\n`;
  md += `| --- | --- | --- |\n`;
  for (const skill of [...skills].sort((a, b) => a.name.localeCompare(b.name))) {
    const category = categoryMap.get(skill.name) || '🧰 其他工具（Other Tools）';
    md += `| ${escapeCell(skill.name)} | ${escapeCell(category)} | ${escapeCell(skill.desc)} |\n`;
  }

  return md;
}

const rawContent = fs.readFileSync(CATALOG_MD, 'utf8');
const skills = parseCatalog(rawContent);
if (skills.length === 0) {
  throw new Error(`No skills parsed from ${CATALOG_MD}`);
}

const markdown = generateCatalogMarkdown(skills);
fs.writeFileSync(CATALOG_MD, markdown, 'utf8');
console.log(`Updated docs/catalog.md (${skills.length} skills)`);

execFileSync('bun', ['run', 'build:catalog'], { cwd: ROOT, stdio: 'inherit' });
