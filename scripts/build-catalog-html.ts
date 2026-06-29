import { readFileSync, writeFileSync } from "fs";
import { parse } from "yaml";
import { join } from "path";

const CATALOG_MD = join(process.cwd(), "docs", "catalog.md");
const OUTPUT_HTML = join(process.cwd(), "docs", "catalog.html");

interface Skill {
  name: string;
  description: string;
  triggers: string;
  section: string;
  status?: "enabled" | "disabled";
}

interface Section {
  name: string;
  skills: Skill[];
}

function parseCatalog(mdPath: string): { frontmatter: Record<string, string>; sections: Section[] } {
  const content = readFileSync(mdPath, "utf-8");

  // Parse frontmatter
  let frontmatter: Record<string, string> = {};
  let body = content;
  if (content.startsWith("---")) {
    const end = content.indexOf("---", 3);
    if (end !== -1) {
      const yamlText = content.slice(3, end).trim();
      frontmatter = parse(yamlText) as Record<string, string>;
      body = content.slice(end + 3).trimStart();
    }
  }

  // Parse sections and table rows
  const sections: Section[] = [];
  let currentSection: Section | null = null;

  for (const line of body.split("\n")) {
    if (line.startsWith("## ")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { name: line.replace("## ", "").trim(), skills: [] };
    } else if (currentSection && line.startsWith("| ") && !line.includes("---") && !line.includes("技能名称") && !line.includes("状态 ")) {
      const cells = line.split("|").map((s) => s.trim()).filter(Boolean);
      // Support two catalog formats:
      // 1. Legacy 3-column: | `name` | description | triggers |
      // 2. Chinese 5-column: | status | name | source | description | triggers |
      if (cells.length === 3) {
        currentSection.skills.push({
          name: cells[0].replace(/^`/, "").replace(/`$/, ""),
          description: cells[1],
          triggers: cells[2],
          section: currentSection.name,
        });
      } else if (cells.length === 5) {
        const status = cells[0].trim();
        currentSection.skills.push({
          name: cells[1],
          description: cells[3],
          triggers: cells[4],
          section: currentSection.name,
          status: status === "✅" ? "enabled" : status === "⏸️" ? "disabled" : undefined,
        });
      }
    }
  }
  if (currentSection) sections.push(currentSection);

  return { frontmatter, sections };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateHtml(frontmatter: Record<string, string>, sections: Section[]): string {
  const title = frontmatter.title || "Skill 目录";
  const description = frontmatter.description || "HK-Skills 技能目录";
  const allSkills = sections.flatMap((s) => s.skills);
  const skillsJson = JSON.stringify(allSkills);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #faf9f7;
      --surface: #ffffff;
      --surface-elevated: #ffffff;
      --text: #1a1a1a;
      --text-secondary: #666666;
      --text-tertiary: #999999;
      --border: #e8e6e1;
      --border-light: #f0ede8;
      --accent: #c45c26;
      --accent-light: #f5ebe4;
      --accent-soft: rgba(196, 92, 38, 0.08);
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
      --shadow: 0 4px 20px rgba(0,0,0,0.06);
      --shadow-lg: 0 12px 48px rgba(0,0,0,0.1);
      --radius: 16px;
      --radius-sm: 8px;
      --font-serif: "Noto Serif SC", "Songti SC", "STSong", serif;
      --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
      --font-mono: "JetBrains Mono", "SF Mono", "Fira Code", monospace;
    }

    [data-theme="dark"] {
      --bg: #121212;
      --surface: #1a1a1a;
      --surface-elevated: #222222;
      --text: #f5f5f5;
      --text-secondary: #a0a0a0;
      --text-tertiary: #737373;
      --border: #333333;
      --border-light: #2a2a2a;
      --accent: #e07a45;
      --accent-light: rgba(224, 122, 69, 0.15);
      --accent-soft: rgba(224, 122, 69, 0.1);
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
      --shadow: 0 4px 20px rgba(0,0,0,0.3);
      --shadow-lg: 0 12px 48px rgba(0,0,0,0.4);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: var(--font-sans);
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      transition: background 0.3s ease, color 0.3s ease;
    }

    .page {
      min-height: 100vh;
      display: flex;
    }

    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 280px;
      height: 100vh;
      background: var(--surface);
      border-right: 1px solid var(--border);
      padding: 40px 28px;
      overflow-y: auto;
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .brand {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .brand h1 {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--text);
    }

    .brand p {
      font-size: 12px;
      color: var(--text-tertiary);
      line-height: 1.5;
    }

    .search-box {
      position: relative;
    }

    .search-box svg {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: var(--text-tertiary);
      pointer-events: none;
    }

    .search-box input {
      width: 100%;
      padding: 12px 14px 12px 40px;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;
    }

    .search-box input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-soft);
    }

    .search-box input::placeholder {
      color: var(--text-tertiary);
    }

    .stats {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 12px;
      color: var(--text-secondary);
    }

    .stats strong {
      color: var(--accent);
      font-weight: 600;
    }

    .nav-sections {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    .nav-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-tertiary);
      margin-bottom: 8px;
      font-weight: 600;
    }

    .nav-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 13px;
      color: var(--text-secondary);
      transition: all 0.15s ease;
      user-select: none;
    }

    .nav-item:hover {
      background: var(--accent-soft);
      color: var(--text);
    }

    .nav-item.active {
      background: var(--accent);
      color: white;
    }

    .nav-item.active .nav-count {
      color: rgba(255,255,255,0.8);
    }

    .nav-count {
      font-size: 11px;
      color: var(--text-tertiary);
      font-variant-numeric: tabular-nums;
    }

    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: var(--bg);
      color: var(--text-secondary);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .theme-toggle:hover {
      border-color: var(--accent);
      color: var(--text);
    }

    .main {
      margin-left: 280px;
      padding: 60px 64px;
      min-width: 0;
      flex: 1;
    }

    .main-inner {
      max-width: 1400px;
      margin: 0 auto;
    }

    .hero {
      margin-bottom: 56px;
      padding-bottom: 40px;
      border-bottom: 1px solid var(--border);
    }

    .hero h2 {
      font-family: var(--font-serif);
      font-size: 52px;
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 20px;
    }

    .hero p {
      font-size: 18px;
      color: var(--text-secondary);
      max-width: 640px;
      line-height: 1.7;
    }

    .section-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 24px;
      padding-top: 32px;
    }

    .section-title {
      font-family: var(--font-serif);
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .section-count {
      font-size: 13px;
      color: var(--text-tertiary);
      font-variant-numeric: tabular-nums;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
      margin-bottom: 48px;
    }

    .skill-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .skill-card:hover {
      border-color: var(--accent);
      box-shadow: var(--shadow);
      transform: translateY(-2px);
    }

    .skill-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .skill-name {
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 500;
      color: var(--accent);
      background: var(--accent-soft);
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
      word-break: break-all;
    }

    .skill-name:hover {
      background: var(--accent);
      color: white;
    }

    .skill-name.copied {
      background: #2a8a4a;
      color: white;
    }

    .skill-section-tag {
      font-size: 11px;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    .status-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 12px;
      margin-bottom: 8px;
      width: fit-content;
    }

    .status-badge.enabled {
      background: rgba(42, 138, 74, 0.12);
      color: #2a8a4a;
    }

    [data-theme="dark"] .status-badge.enabled {
      background: rgba(74, 196, 120, 0.15);
      color: #4ac478;
    }

    .status-badge.disabled {
      background: rgba(153, 153, 153, 0.12);
      color: var(--text-tertiary);
    }

    .skill-description {
      font-size: 15px;
      color: var(--text);
      line-height: 1.7;
    }

    .skill-triggers {
      font-size: 12px;
      color: var(--text-secondary);
      line-height: 1.6;
      padding-top: 8px;
      border-top: 1px solid var(--border-light);
    }

    .skill-triggers strong {
      color: var(--text-tertiary);
      font-weight: 600;
    }

    .highlight {
      background: rgba(196, 92, 38, 0.2);
      color: var(--text);
      padding: 0 2px;
      border-radius: 2px;
    }

    [data-theme="dark"] .highlight {
      background: rgba(224, 122, 69, 0.25);
    }

    .empty-state {
      text-align: center;
      padding: 80px 20px;
      color: var(--text-secondary);
    }

    .empty-state h3 {
      font-family: var(--font-serif);
      font-size: 24px;
      margin-bottom: 12px;
      color: var(--text);
    }

    .footer {
      margin-top: 80px;
      padding-top: 32px;
      border-top: 1px solid var(--border);
      font-size: 12px;
      color: var(--text-tertiary);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mobile-menu-btn {
      display: none;
      position: fixed;
      top: 16px;
      left: 16px;
      z-index: 200;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      cursor: pointer;
      box-shadow: var(--shadow);
    }

    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.3);
      z-index: 90;
    }

    @media (max-width: 1024px) {
      .page {
        display: block;
      }

      .mobile-menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        box-shadow: var(--shadow-lg);
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .sidebar-overlay.open {
        display: block;
      }

      .main {
        margin-left: 0;
        padding: 80px 24px 40px;
        min-width: 0;
      }

      .main-inner {
        max-width: 100%;
      }

      .hero h2 {
        font-size: 36px;
      }

      .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    }

    @media (max-width: 640px) {
      .main {
        padding: 80px 16px 40px;
      }

      .hero h2 {
        font-size: 30px;
      }

      .skill-card {
        padding: 18px;
      }
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  </style>
</head>
<body>
  <button class="mobile-menu-btn" aria-label="打开菜单" onclick="toggleSidebar()">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  </button>

  <div class="sidebar-overlay" onclick="toggleSidebar()"></div>

  <div class="page">
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <h1>HK-Skills</h1>
        <p>${escapeHtml(description)}</p>
      </div>

      <div class="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        <input type="text" id="searchInput" placeholder="搜索技能、描述或触发词…" autocomplete="off">
      </div>

      <div class="stats">
        <div>共 <strong id="totalCount">${allSkills.length}</strong> 个技能</div>
        <div>当前显示 <strong id="visibleCount">${allSkills.length}</strong> 个</div>
      </div>

      <nav class="nav-sections" id="sectionNav" aria-label="分类导航">
        <div class="nav-label">分类</div>
      </nav>

      <button class="theme-toggle" onclick="toggleTheme()" aria-label="切换主题">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>
        <span>切换主题</span>
      </button>
    </aside>

    <main class="main" id="main">
      <div class="main-inner">
        <header class="hero">
          <h2>${escapeHtml(title)}</h2>
          <p>按使用场景分类浏览，支持按技能名称、中文描述和英文触发关键词实时检索。点击技能名即可复制到剪贴板。</p>
        </header>

        <div id="content"></div>

        <footer class="footer">
        <span>数据来源：docs/catalog.md</span>
        <span>最后生成：${new Date().toLocaleString("zh-CN")}</span>
      </footer>
    </main>
  </div>

  <script>
    const skills = ${skillsJson};
    const sections = ${JSON.stringify(sections.map(s => ({ name: s.name, count: s.skills.length })))};

    let activeSection = null;
    let searchQuery = "";

    function $(id) { return document.getElementById(id); }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function highlight(text, query) {
      if (!query) return escapeHtml(text);
      const regex = new RegExp("(" + escapeRegExp(query) + ")", "gi");
      return escapeHtml(text).replace(regex, '<span class="highlight">$1</span>');
    }

    function escapeRegExp(string) {
      return string.replace(/([\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\])/g, "\\$1");
    }

    function normalize(str) {
      return str.toLowerCase().replace(/\\s+/g, " ");
    }

    function matches(skill, query) {
      if (!query) return true;
      const q = normalize(query);
      return normalize(skill.name).includes(q) ||
             normalize(skill.description).includes(q) ||
             normalize(skill.triggers).includes(q);
    }

    function renderNav() {
      const nav = $("sectionNav");
      nav.innerHTML = '<div class="nav-label">分类</div>';

      const allItem = document.createElement("div");
      allItem.className = "nav-item" + (activeSection === null ? " active" : "");
      allItem.innerHTML = '<span>全部</span><span class="nav-count">' + skills.length + "</span>";
      allItem.onclick = () => { activeSection = null; render(); scrollToTop(); closeSidebar(); };
      nav.appendChild(allItem);

      sections.forEach(section => {
        const item = document.createElement("div");
        item.className = "nav-item" + (activeSection === section.name ? " active" : "");
        item.innerHTML = '<span>' + escapeHtml(section.name) + '</span><span class="nav-count">' + section.count + "</span>";
        item.onclick = () => { activeSection = section.name; render(); scrollToTop(); closeSidebar(); };
        nav.appendChild(item);
      });
    }

    function render() {
      const container = $("content");
      const filtered = skills.filter(s => {
        const sectionOk = activeSection === null || s.section === activeSection;
        return sectionOk && matches(s, searchQuery);
      });

      $("visibleCount").textContent = filtered.length;
      renderNav();

      if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>未找到匹配技能</h3><p>请尝试其他关键词，或切换分类筛选。</p></div>';
        return;
      }

      // Group by section
      const grouped = {};
      filtered.forEach(s => {
        if (!grouped[s.section]) grouped[s.section] = [];
        grouped[s.section].push(s);
      });

      const order = activeSection
        ? [activeSection]
        : sections.map(s => s.name).filter(name => grouped[name]);

      container.innerHTML = order.map(sectionName => {
        const sectionSkills = grouped[sectionName];
        return '<section id="' + sectionId(sectionName) + '">' +
          '<div class="section-header">' +
            '<h3 class="section-title">' + escapeHtml(sectionName) + '</h3>' +
            '<span class="section-count">' + sectionSkills.length + " 个技能</span>" +
          '</div>' +
          '<div class="skills-grid">' +
            sectionSkills.map(skill => renderSkillCard(skill)).join("") +
          '</div>' +
        '</section>';
      }).join("");
    }

    function sectionId(name) {
      return "section-" + name.replace(/\\s+/g, "-");
    }

    function renderSkillCard(skill) {
      const statusHtml = skill.status
        ? '<span class="status-badge ' + skill.status + '">' + (skill.status === "enabled" ? "已启用" : "未启用") + '</span>'
        : '';
      return '<article class="skill-card">' +
        '<div class="skill-header">' +
          '<code class="skill-name" onclick="copySkill(this, ' + "'" + escapeHtml(skill.name).replace(/'/g, "&#039;") + "'" + ')" title="点击复制">' + highlight(skill.name, searchQuery) + '</code>' +
          '<span class="skill-section-tag">' + escapeHtml(skill.section) + '</span>' +
        '</div>' +
        statusHtml +
        '<p class="skill-description">' + highlight(skill.description, searchQuery) + '</p>' +
        '<div class="skill-triggers"><strong>触发：</strong>' + highlight(skill.triggers, searchQuery) + '</div>' +
      '</article>';
    }

    async function copySkill(el, name) {
      try {
        await navigator.clipboard.writeText(name);
        el.classList.add("copied");
        const original = el.innerHTML;
        el.textContent = "已复制";
        setTimeout(() => {
          el.classList.remove("copied");
          el.innerHTML = original;
        }, 1200);
      } catch (e) {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = name;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        el.classList.add("copied");
        setTimeout(() => el.classList.remove("copied"), 1200);
      }
    }

    function toggleTheme() {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
      localStorage.setItem("catalog-theme", isDark ? "light" : "dark");
    }

    function loadTheme() {
      const saved = localStorage.getItem("catalog-theme");
      if (saved) {
        document.documentElement.setAttribute("data-theme", saved);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    }

    function toggleSidebar() {
      $("sidebar").classList.toggle("open");
      document.querySelector(".sidebar-overlay").classList.toggle("open");
    }

    function closeSidebar() {
      if (window.innerWidth <= 1024) {
        $("sidebar").classList.remove("open");
        document.querySelector(".sidebar-overlay").classList.remove("open");
      }
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    $("searchInput").addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      render();
    });

    $("searchInput").addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchQuery = "";
        $("searchInput").value = "";
        render();
      }
    });

    loadTheme();
    renderNav();
    render();
  </script>
</body>
</html>
`;
}

function main() {
  const { frontmatter, sections } = parseCatalog(CATALOG_MD);
  const html = generateHtml(frontmatter, sections);
  writeFileSync(OUTPUT_HTML, html, "utf-8");
  const totalSkills = sections.reduce((sum, s) => sum + s.skills.length, 0);
  console.log(`✓ Generated docs/catalog.html`);
  console.log(`  Sections: ${sections.length}`);
  console.log(`  Skills: ${totalSkills}`);
}

main();
