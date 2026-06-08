#!/usr/bin/env node
// Generate Chinese user-facing catalog.md and update catalog.html

const fs = require('fs');
const path = require('path');

const CATALOG_MD = '/Users/kanehua/project/hk-skills/docs/catalog.md';
const CATALOG_HTML = '/Users/kanehua/project/hk-skills/docs/catalog.html';

// ====== Parse raw catalog.md ======
function parseCatalog(content) {
  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;
  let inTable = false;
  let rows = [];
  let buffer = [];

  function flushBuffer() {
    if (buffer.length === 0) return null;
    const text = buffer.join(' ').replace(/\s+/g, ' ').trim();
    buffer = [];
    return text;
  }

  function parseRow(text) {
    if (!text.startsWith('|')) return null;
    const inner = text.substring(1).trimEnd();
    const parts = [];
    let current = '';
    let count = 0;
    for (let i = 0; i < inner.length; i++) {
      if (inner[i] === '|' && count < 5) {
        parts.push(current.trim());
        current = '';
        count++;
      } else {
        current += inner[i];
      }
    }
    parts.push(current.trim());
    if (parts.length >= 5) {
      return {
        name: parts[0],
        source: parts[1],
        status: parts[2],
        desc: parts[3],
        triggers: parts[4],
        enabled: parts[5] || ''
      };
    }
    return null;
  }

  function finishRow() {
    const text = flushBuffer();
    if (text) {
      const row = parseRow(text);
      if (row) rows.push(row);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      finishRow();
      if (currentSection && rows.length > 0) {
        currentSection.rows = rows;
        sections.push(currentSection);
      }
      currentSection = { title: line.replace('## ', '').trim(), rows: [] };
      inTable = false;
      rows = [];
    } else if (line.startsWith('| ---') || line.startsWith('|---')) {
      inTable = true;
      buffer = [];
    } else if (inTable && line.startsWith('| ')) {
      if (buffer.length > 0) finishRow();
      buffer.push(line);
    } else if (inTable && line.trim() !== '' && !line.startsWith('#')) {
      buffer.push(line);
    } else {
      finishRow();
    }
  }
  finishRow();
  if (currentSection && rows.length > 0) {
    currentSection.rows = rows;
    sections.push(currentSection);
  }
  return sections.flatMap(s => s.rows);
}

function getEnabledStatus(enabled) {
  if (enabled.includes('global')) return '✅ 全局';
  if (enabled.includes('项目:')) return '✅ 项目';
  return '❌';
}

function isDeprecated(name) {
  return ['baoyu-image-gen', 'baoyu-xhs-images'].includes(name);
}

// ====== Skill descriptions in Chinese (one sentence each) ======
const DESCRIPTIONS = {
  // Local
  'article-analyzer': '文章/论文/报告深度分析，输出结构化理解与洞察',
  'blog-checker': '中文技术博客文章质量审阅与评估',
  'concept-fable': '提取高级领域概念，隐藏于三段式寓言后揭示映射',
  'HeavySkill': 'Agentic Harness 中的深度思考内功心法',
  'merge-drafts': '多份草稿合并为一篇高质量文章',
  'prompt-optimizer': '将模糊需求编译为工业级结构化提示词',
  'session-achieve': '复盘多轮对话，提取纠偏逻辑并沉淀黄金提示词',
  'skill-installer': '第三方 Skill 批量导入与本地适配',
  'skill-optimizer': 'Skill 审计评估、突变策略与自训练协议',
  'subtext-article': '字幕/转写文本转为可发布长文章',

  // Content creation
  'baoyu-translate': '多语言翻译，支持快翻/标准/精翻与术语表',
  'baoyu-youtube-transcript': 'YouTube 字幕/封面下载与翻译',
  'baoyu-format-markdown': 'Markdown 自动排版与格式化',
  'baoyu-url-to-markdown': '任意网页保存为 Markdown',
  'baoyu-danger-x-to-markdown': 'X/Twitter 推文/文章转 Markdown',
  'edit-article': '文章编辑与润色（结构调整与文笔优化）',
  'internal-comms': '内部沟通文案（状态报告/领导力更新/FAQ/事故报告）',
  'ljg-read': '伴读助手（翻译/结构批注/跨域洞察）',

  // Social media
  'baoyu-post-to-wechat': '微信公众号文章/贴图发布',
  'baoyu-post-to-weibo': '微博发布（含头条文章）',
  'baoyu-post-to-x': 'X/Twitter 发布（含长文）',
  'guizang-social-card-skill': '小红书/公众号社交卡片生成',

  // Image processing
  'baoyu-article-illustrator': '文章配图智能生成（Type × Style × Palette）',
  'baoyu-comic': '知识/教育漫画创作，支持多风格与分镜',
  'baoyu-cover-image': '文章封面图生成（11 色板 × 7 渲染风格）',
  'baoyu-compress-image': '图片压缩与格式转换（WebP/PNG）',
  'baoyu-infographic': '专业信息图生成（21 布局 × 22 风格）',
  'ian-xiaohei-illustrations': 'Ian 小黑风格中文正文配图',
  'gpt-image-2': 'GPT Image 2 图像生成/编辑（18 大类 80+ 模板）',
  'canvas-design': '视觉艺术设计（海报/艺术品，PNG/PDF 输出）',
  'algorithmic-art': '算法艺术（p5.js 生成艺术、流场、粒子系统）',
  'brand-guidelines': 'Anthropic 品牌配色与排版应用',
  'ce-gemini-imagegen': 'Gemini API 图像生成/编辑/风格迁移',
  'baoyu-danger-gemini-web': '通过逆向 Gemini Web API 生成图像与文本',

  // Web design
  'web-design': 'Web 视觉设计（PRD → DESIGN.md → 代码交付）',
  'web-design-engineer': '浏览器可交互前端交付物（页面/仪表盘/原型/动画）',
  'frontend-design': '高品质前端界面设计，避免通用 AI 审美',
  'frontend-ui-engineering': '生产级 UI 构建（组件/布局/状态管理）',
  'baoyu-design': 'UI 原型/线框图/落地页/仪表盘 HTML 设计',
  'baoyu-markdown-to-html': 'Markdown 转微信兼容 HTML',
  'web-artifacts-builder': '复杂多组件 Claude.ai HTML 工件',
  'web-design-guidelines': 'Web 界面规范审查（可访问性/UX/最佳实践）',
  'theme-factory': '主题样式工具包（10 套预设主题）',

  // Vercel
  'deploy-to-vercel': 'Vercel 应用部署（预览/生产）',
  'vercel-cli-with-tokens': 'Vercel CLI Token 认证部署',
  'vercel-composition-patterns': 'React 组合模式（Compound Components/Render Props/Context）',
  'vercel-react-best-practices': 'React/Next.js 性能优化最佳实践',
  'vercel-react-native-skills': 'React Native/Expo 移动应用最佳实践',
  'vercel-react-view-transitions': 'React View Transition API 动画实现',

  // Presentations
  'baoyu-slide-deck': '专业幻灯片图片生成',
  'guizang-ppt-skill': '横向翻页网页 PPT（杂志风/瑞士国际主义）',
  'html-ppt': 'HTML PPT Studio（多风格模板/键盘导航）',
  'ian-handdrawn-ppt': '手绘技术风 PPT 配图',
  'visual-style-ppt': '风格驱动图片版 PPTX（提炼/保存/复用风格）',
  'web-video-presentation': '文章/口播稿转点击驱动 16:9 网页演示（可选音频）',
  'pptx': 'PPTX 文件创建、读取、编辑与拆分',

  // Development assistance
  'api-and-interface-design': 'API 与接口设计指南（REST/GraphQL/类型契约）',
  'design-an-interface': '并行生成多种接口设计方案对比',
  'planning-and-task-breakdown': '任务拆解与排期',
  'incremental-implementation': '增量式代码交付（避免一次性大量改动）',
  'scaffold-exercises': '创建带章节/题目/解答/讲解的练习目录结构',
  'source-driven-development': '基于官方文档的权威实现',
  'spec-driven-development': '编码前先写规格说明',
  'idea-refine': '想法发散与收敛精炼',
  'context-engineering': 'Agent 上下文优化配置',
  'using-agent-skills': 'Agent Skill 发现与调用的元技能',
  'mcp-builder': 'MCP（Model Context Protocol）服务器开发',
  'claude-api': 'Claude API / Anthropic SDK 应用开发与优化',
  'ce-agent-native-architecture': 'Agent-Native 应用架构设计（MCP/自修改系统）',
  'ce-plan': '多步骤任务的结构化计划制定与深化',
  'ce-brainstorm': '通过协作对话探索需求并产出需求文档',
  'ce-ideate': '围绕主题生成并批判性评估落地想法',
  'ce-frontend-design': '真正具备设计质量的 Web 界面构建',
  'ce-dhh-rails-style': 'DHH/37signals 风格的 Ruby on Rails 开发',
  'ce-optimize': '度量驱动的迭代优化循环（实验→评分→收敛）',

  // Code quality
  'code-review-and-quality': '多维度代码审查（合并前评估）',
  'code-simplification': '代码简化与清晰度重构',
  'debugging-and-error-recovery': '系统化根因调试方法论',
  'diagnose': '顽固 Bug 诊断循环（复现→最小化→假设→验证→修复）',
  'tdd': '测试驱动开发（红绿重构循环）',
  'test-driven-development': '测试驱动开发（证明代码正确性）',
  'security-and-hardening': '安全加固与漏洞防护',
  'performance-optimization': '应用性能优化（Core Web Vitals、加载时间）',
  'git-workflow-and-versioning': 'Git 工作流与版本管理',
  'git-guardrails-claude-code': 'Claude Code Git 安全钩子（阻止危险操作）',
  'setup-pre-commit': 'Husky + lint-staged pre-commit 钩子配置',
  'browser-testing-with-devtools': 'Chrome DevTools MCP 浏览器测试',
  'webapp-testing': 'Playwright 本地 Web 应用测试与调试',
  'migrate-to-shoehorn': 'TypeScript 测试 `as` 断言迁移至 shoehorn',
  'ce-code-review': '结构化代码审查（多级 persona/置信度门禁/自动修复）',
  'ce-debug': '系统化根因定位与 Bug 修复',
  'ce-simplify-code': '简化并精炼近期改动代码（清晰/复用/质量/效率）',
  'ce-test-browser': '当前 PR 或分支影响页面的浏览器测试',
  'ce-test-xcode': 'XcodeBuildMCP 模拟器构建与 iOS 测试',
  'ce-clean-gone-branches': '清理远程已删除的本地分支及关联 worktree',
  'ce-worktree': '创建隔离的 git worktree 进行并行开发',
  'ce-work': '高效执行开发工作并保证质量完成功能',
  'ce-work-beta': '[BETA] 带外部代理支持的 ce-work（实验性 Codex 委托）',
  'ce-dogfood-beta': '[BETA] 以 QA 工程师身份端到端 dogfood 当前分支',

  // Documentation & communication
  'documentation-and-adrs': '架构决策记录（ADR）与项目文档维护',
  'doc-coauthoring': '文档协作共创流程（技术规格/决策文档）',
  'deprecation-and-migration': '废弃与迁移管理',
  'ubiquitous-language': 'DDD 统一语言词典提取与术语规范化',
  'grill-with-docs': '基于现有文档对计划进行压力测试',
  'grill-me': '面试式拷问计划/设计直到达成共同理解',
  'qa': '交互式 Bug 报告与 GitHub Issue 提交',
  'caveman': '极简压缩通信模式（节省约 75% Token）',
  'ce-doc-review': '并行 persona 审阅需求或计划文档',
  'ce-proof': '通过 Proof 进行 Markdown 人工回环审阅',
  'ce-release-notes': '汇总 compound-engineering 插件近期发布变更',
  'ce-report-bug': 'compound-engineering 插件 Bug 报告',
  'ce-resolve-pr-feedback': '并行评估并修复 PR 审查反馈',
  'ce-promote': '为已发布功能撰写用户-facing 公告与营销文案',
  'ce-demo-reel': '为 PR 描述捕获视觉演示素材（GIF/录屏/截图）',

  // Knowledge management
  'obsidian-vault': 'Obsidian 笔记库搜索、创建与管理',
  'ima-skill': 'IMA 知识库与笔记管理（上传/搜索/创建/编辑）',
  'weread-skills': '微信读书助手（搜索/书架/笔记/书评/统计/推荐）',
  'kb-retriever': '本地知识库目录检索问答（PDF/Excel 渐进式检索）',
  'ce-compound': '将刚解决的问题沉淀为团队知识或 CONCEPTS.md',
  'ce-compound-refresh': '刷新 docs/solutions/ 下过时或漂移的学习文档',
  'ce-sessions': '跨 Claude Code/Codex/Cursor 搜索并追问会话历史',
  'ce-slack-research': '搜索 Slack 并产出组织上下文综合研究报告',
  'ce-strategy': '创建或维护 STRATEGY.md（产品方向/用户/指标/工作流）',

  // Diagrams & visualization
  'architecture-diagram': '暗色主题架构图（HTML+SVG）',
  'baoyu-diagram': '专业暗色主题 SVG 图表（流程图/时序图/思维导图等）',

  // Release & operations
  'release-skills': '通用发布工作流（Node/Python/Rust/GitHub Releases）',
  'shipping-and-launch': '生产发布准备（预发布检查清单/监控/灰度/回滚）',
  'ci-cd-and-automation': 'CI/CD 流水线自动化',
  'to-issues': '计划/PRD 拆分为可执行 Issue（tracer-bullet 垂直切片）',
  'to-prd': '对话上下文生成 PRD 并发布至 Issue 追踪器',
  'ce-commit': '创建信息清晰、价值导向的 git commit',
  'ce-commit-push-pr': '提交、推送并创建价值优先的 PR 描述',
  'ce-product-pulse': '生成产品体验与质量信号的时间窗口脉动报告',

  // Skill management
  'skill-creator': 'Skill 创建、修改、性能评估与触发优化',
  'write-a-skill': 'Agent Skill 规范创建（渐进式披露+捆绑资源）',
  'skill-installer': '第三方 Skill 批量导入与本地适配',
  'skill-optimizer': 'Skill 审计评估、突变策略与自训练协议',
  'ce-setup': '诊断并配置 compound-engineering 环境',
  'ce-update': '检查 compound-engineering 插件版本并推荐更新',

  // Other tools
  'improve-codebase-architecture': '代码库架构改进与重构机会发现',
  'zoom-out': '全局视角与高阶上下文',
  'docx': 'Word 文档（.docx）创建、编辑与格式处理',
  'pdf': 'PDF 全面处理（阅读/合并/分割/OCR/表单/加密）',
  'xlsx': '电子表格处理（.xlsx/.csv 读写、清洗、转换）',
  'slack-gif-creator': 'Slack 优化 GIF 动画创建',
  'ce-agent-native-audit': 'Agent-Native 架构综合评审与评分',
  'ce-riffrec-feedback-analysis': 'Riffrec 产品反馈工作流（会话包分析）',
  'ce-polish': '启动 dev server，在浏览器中协同迭代打磨功能',
  'lfg': '端到端自主工程流水线（规划→开发→审查→测试→PR→CI）',
};

// Extract short trigger keywords (max 5) from trigger text
function getTriggerKeywords(triggers) {
  if (!triggers) return '';
  // Take first ~80 chars or up to first comma/period
  const t = triggers.replace(/\s+/g, ' ').trim();
  if (t.length <= 80) return t;
  // Try to find a good cutoff
  let cutoff = t.indexOf('.', 60);
  if (cutoff === -1) cutoff = t.indexOf(',', 60);
  if (cutoff === -1 || cutoff > 120) cutoff = 100;
  return t.substring(0, cutoff) + '...';
}

function getDescription(skill) {
  const custom = DESCRIPTIONS[skill.name];
  if (custom) return custom;
  // Fallback: first sentence of desc, cleaned
  let d = skill.desc.replace(/\s+/g, ' ').trim();
  if (d.length > 100) {
    const end = d.indexOf('.', 80);
    if (end > 0 && end < 140) d = d.substring(0, end + 1);
    else d = d.substring(0, 100) + '...';
  }
  return d;
}

// ====== Categorization ======
const CATEGORY_MAP = {
  // 内容创作
  'article-analyzer': '内容创作',
  'blog-checker': '内容创作',
  'concept-fable': '内容创作',
  'merge-drafts': '内容创作',
  'prompt-optimizer': '内容创作',
  'session-achieve': '内容创作',
  'subtext-article': '内容创作',
  'baoyu-translate': '内容创作',
  'baoyu-youtube-transcript': '内容创作',
  'baoyu-format-markdown': '内容创作',
  'baoyu-url-to-markdown': '内容创作',
  'baoyu-danger-x-to-markdown': '内容创作',
  'edit-article': '内容创作',
  'internal-comms': '内容创作',
  'ljg-read': '内容创作',

  // 社交媒体
  'baoyu-post-to-wechat': '社交媒体',
  'baoyu-post-to-weibo': '社交媒体',
  'baoyu-post-to-x': '社交媒体',
  'guizang-social-card-skill': '社交媒体',

  // 图像处理
  'baoyu-article-illustrator': '图像处理',
  'baoyu-comic': '图像处理',
  'baoyu-cover-image': '图像处理',
  'baoyu-compress-image': '图像处理',
  'baoyu-infographic': '图像处理',
  'ian-xiaohei-illustrations': '图像处理',
  'gpt-image-2': '图像处理',
  'canvas-design': '图像处理',
  'algorithmic-art': '图像处理',
  'brand-guidelines': '图像处理',
  'ce-gemini-imagegen': '图像处理',
  'baoyu-danger-gemini-web': '图像处理',

  // 网页设计
  'web-design': '网页设计',
  'web-design-engineer': '网页设计',
  'frontend-design': '网页设计',
  'frontend-ui-engineering': '网页设计',
  'baoyu-design': '网页设计',
  'baoyu-markdown-to-html': '网页设计',
  'web-artifacts-builder': '网页设计',
  'web-design-guidelines': '网页设计',
  'theme-factory': '网页设计',
  'deploy-to-vercel': '网页设计',
  'vercel-cli-with-tokens': '网页设计',
  'vercel-composition-patterns': '网页设计',
  'vercel-react-best-practices': '网页设计',
  'vercel-react-native-skills': '网页设计',
  'vercel-react-view-transitions': '网页设计',

  // PPT / 演示
  'baoyu-slide-deck': 'PPT / 演示',
  'guizang-ppt-skill': 'PPT / 演示',
  'html-ppt': 'PPT / 演示',
  'ian-handdrawn-ppt': 'PPT / 演示',
  'visual-style-ppt': 'PPT / 演示',
  'web-video-presentation': 'PPT / 演示',
  'pptx': 'PPT / 演示',

  // 开发辅助
  'api-and-interface-design': '开发辅助',
  'design-an-interface': '开发辅助',
  'planning-and-task-breakdown': '开发辅助',
  'incremental-implementation': '开发辅助',
  'source-driven-development': '开发辅助',
  'spec-driven-development': '开发辅助',
  'idea-refine': '开发辅助',
  'context-engineering': '开发辅助',
  'using-agent-skills': '开发辅助',
  'mcp-builder': '开发辅助',
  'claude-api': '开发辅助',
  'ce-agent-native-architecture': '开发辅助',
  'ce-plan': '开发辅助',
  'ce-brainstorm': '开发辅助',
  'ce-ideate': '开发辅助',
  'ce-frontend-design': '开发辅助',
  'ce-dhh-rails-style': '开发辅助',
  'scaffold-exercises': '开发辅助',

  // 代码质量
  'code-review-and-quality': '代码质量',
  'code-simplification': '代码质量',
  'debugging-and-error-recovery': '代码质量',
  'diagnose': '代码质量',
  'tdd': '代码质量',
  'test-driven-development': '代码质量',
  'security-and-hardening': '代码质量',
  'performance-optimization': '代码质量',
  'git-workflow-and-versioning': '代码质量',
  'git-guardrails-claude-code': '代码质量',
  'setup-pre-commit': '代码质量',
  'browser-testing-with-devtools': '代码质量',
  'webapp-testing': '代码质量',
  'migrate-to-shoehorn': '代码质量',
  'ce-code-review': '代码质量',
  'ce-debug': '代码质量',
  'ce-simplify-code': '代码质量',
  'ce-test-browser': '代码质量',
  'ce-test-xcode': '代码质量',
  'ce-clean-gone-branches': '代码质量',
  'ce-worktree': '代码质量',
  'ce-work': '代码质量',
  'ce-work-beta': '代码质量',
  'ce-dogfood-beta': '代码质量',
  'ce-optimize': '代码质量',

  // 文档沟通
  'documentation-and-adrs': '文档沟通',
  'doc-coauthoring': '文档沟通',
  'deprecation-and-migration': '文档沟通',
  'ubiquitous-language': '文档沟通',
  'grill-with-docs': '文档沟通',
  'grill-me': '文档沟通',
  'qa': '文档沟通',
  'caveman': '文档沟通',
  'ce-doc-review': '文档沟通',
  'ce-proof': '文档沟通',
  'ce-release-notes': '文档沟通',
  'ce-report-bug': '文档沟通',
  'ce-resolve-pr-feedback': '文档沟通',
  'ce-promote': '文档沟通',
  'ce-demo-reel': '文档沟通',

  // 知识管理
  'obsidian-vault': '知识管理',
  'ima-skill': '知识管理',
  'weread-skills': '知识管理',
  'kb-retriever': '知识管理',
  'ce-compound': '知识管理',
  'ce-compound-refresh': '知识管理',
  'ce-sessions': '知识管理',
  'ce-slack-research': '知识管理',
  'ce-strategy': '知识管理',

  // 图表与可视化
  'architecture-diagram': '图表与可视化',
  'baoyu-diagram': '图表与可视化',

  // 发布与运维
  'release-skills': '发布与运维',
  'shipping-and-launch': '发布与运维',
  'ci-cd-and-automation': '发布与运维',
  'to-issues': '发布与运维',
  'to-prd': '发布与运维',
  'ce-commit': '发布与运维',
  'ce-commit-push-pr': '发布与运维',
  'ce-product-pulse': '发布与运维',

  // Skill 管理与元技能
  'skill-creator': 'Skill 管理与元技能',
  'write-a-skill': 'Skill 管理与元技能',
  'skill-installer': 'Skill 管理与元技能',
  'skill-optimizer': 'Skill 管理与元技能',
  'HeavySkill': 'Skill 管理与元技能',
  'ce-setup': 'Skill 管理与元技能',
  'ce-update': 'Skill 管理与元技能',

  // 其他工具
  'improve-codebase-architecture': '其他工具',
  'zoom-out': '其他工具',
  'docx': '其他工具',
  'pdf': '其他工具',
  'xlsx': '其他工具',
  'slack-gif-creator': '其他工具',
  'ce-agent-native-audit': '其他工具',
  'ce-riffrec-feedback-analysis': '其他工具',
  'ce-polish': '其他工具',
  'lfg': '其他工具',
};

function getCategory(skill) {
  return CATEGORY_MAP[skill.name] || '其他工具';
}

// ====== Generate catalog markdown ======
function generateCatalogMarkdown(skills) {
  const categories = {};
  skills.forEach(s => {
    const cat = getCategory(s);
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(s);
  });

  const sectionOrder = [
    '内容创作',
    '社交媒体',
    '图像处理',
    '网页设计',
    'PPT / 演示',
    '开发辅助',
    '代码质量',
    '文档沟通',
    '知识管理',
    '图表与可视化',
    '发布与运维',
    'Skill 管理与元技能',
    '其他工具'
  ];

  let md = `# Skill Catalog（技能目录）\n\n`;
  md += `> 由 \`./bin/hk-skill catalog\` 自动生成并翻译整理。技能按**使用场景**分组，同时标注启用状态。\n`;
  md += `> 状态说明：✅ 项目 = 项目级启用　|　✅ 全局 = 全局启用　|　❌ = 未启用\n\n`;
  md += `---\n\n`;

  sectionOrder.forEach(cat => {
    const catSkills = categories[cat];
    if (!catSkills || catSkills.length === 0) return;

    // Sort: enabled first, then by name
    catSkills.sort((a, b) => {
      const ea = getEnabledStatus(a.enabled);
      const eb = getEnabledStatus(b.enabled);
      if (ea.startsWith('✅') && !eb.startsWith('✅')) return -1;
      if (!ea.startsWith('✅') && eb.startsWith('✅')) return 1;
      return a.name.localeCompare(b.name);
    });

    const isWebDesign = cat === '网页设计';
    const isSubsection = isWebDesign;

    if (isSubsection) {
      md += `## ${cat}\n\n`;
      md += `| 技能名称 | 状态 | 描述 | 触发关键词 |\n`;
      md += `|---|---|---|---|\n`;
      catSkills.filter(s => !s.name.startsWith('vercel-') && s.name !== 'deploy-to-vercel').forEach(s => {
        const dep = isDeprecated(s.name) ? ' ⛔' : '';
        md += `| ${s.name}${dep} | ${getEnabledStatus(s.enabled)} | ${getDescription(s)} | ${getTriggerKeywords(s.triggers)} |\n`;
      });
      md += `\n### Vercel 生态\n\n`;
      md += `| 技能名称 | 状态 | 描述 | 触发关键词 |\n`;
      md += `|---|---|---|---|\n`;
      catSkills.filter(s => s.name.startsWith('vercel-') || s.name === 'deploy-to-vercel').forEach(s => {
        const dep = isDeprecated(s.name) ? ' ⛔' : '';
        md += `| ${s.name}${dep} | ${getEnabledStatus(s.enabled)} | ${getDescription(s)} | ${getTriggerKeywords(s.triggers)} |\n`;
      });
    } else {
      md += `## ${cat}\n\n`;
      md += `| 技能名称 | 状态 | 描述 | 触发关键词 |\n`;
      md += `|---|---|---|---|\n`;
      catSkills.forEach(s => {
        const dep = isDeprecated(s.name) ? ' ⛔' : '';
        md += `| ${s.name}${dep} | ${getEnabledStatus(s.enabled)} | ${getDescription(s)} | ${getTriggerKeywords(s.triggers)} |\n`;
      });
    }
    md += `\n`;
  });

  // Add workflow combinations
  md += `---\n\n`;
  md += `## 🔗 实用工作流组合\n\n`;
  md += `以下是将多个技能串联使用的典型工作流。每个工作流按执行顺序排列，你可以按需裁剪步骤。\n\n`;

  md += `### 1. 内容创作与多平台发布流\n\n`;
  md += `适合将从素材收集到多平台分发的完整链路自动化。\n\n`;
  md += `\`\`\`\n素材采集 → 深度分析 → 内容创作 → 视觉包装 → 排版发布\n\`\`\`\n\n`;
  md += `| 步骤 | 推荐技能 | 作用 |\n|---|---|---|\n`;
  md += `| ① 素材采集 | \`baoyu-url-to-markdown\` / \`baoyu-youtube-transcript\` | 将网页/视频转为可编辑的 Markdown |\n`;
  md += `| ② 深度分析 | \`article-analyzer\` | 对素材进行结构化拆解与洞察提取 |\n`;
  md += `| ③ 内容创作 | \`merge-drafts\` / \`subtext-article\` | 多素材合并成文章，或视频转写润色 |\n`;
  md += `| ④ 翻译润色 | \`baoyu-translate\` | 多语言翻译与术语统一 |\n`;
  md += `| ⑤ 视觉包装 | \`baoyu-cover-image\` / \`baoyu-article-illustrator\` | 生成封面图与正文配图 |\n`;
  md += `| ⑥ 排版转换 | \`baoyu-markdown-to-html\` | Markdown 转微信兼容 HTML |\n`;
  md += `| ⑦ 多平台发布 | \`baoyu-post-to-wechat\` / \`baoyu-post-to-weibo\` / \`baoyu-post-to-x\` | 一键发布至各平台 |\n\n`;
  md += `> 💡 如果你只有一篇原始素材想快速出稿，可以跳过 ①②，直接用 \`article-analyzer\` 提取要点后进入 ③。\n\n`;

  md += `### 2. 知识萃取与知识库归档流\n\n`;
  md += `适合将碎片化信息（视频、播客、文章）沉淀为结构化知识资产。\n\n`;
  md += `\`\`\`\n原始内容 → 转写/提取 → 分析重构 → 翻译整理 → 知识库归档\n\`\`\`\n\n`;
  md += `| 步骤 | 推荐技能 | 作用 |\n|---|---|---|\n`;
  md += `| ① 原始内容 | \`baoyu-youtube-transcript\` / \`baoyu-url-to-markdown\` | 获取视频字幕或网页原文 |\n`;
  md += `| ② 转写重构 | \`subtext-article\` | 将字幕/ASR 转写转为可读文章 |\n`;
  md += `| ③ 深度分析 | \`article-analyzer\` | 提取核心论点、框架与可行动洞察 |\n`;
  md += `| ④ 概念寓言化 | \`concept-fable\` | 将复杂概念转为三段式寓言故事（可选） |\n`;
  md += `| ⑤ 翻译整理 | \`baoyu-translate\` | 外文内容精翻，统一术语 |\n`;
  md += `| ⑥ 知识库归档 | \`ima-skill\` | 上传至 IMA 知识库，建立个人/团队知识索引 |\n\n`;
  md += `> 💡 配合 \`weread-skills\` 可将微信读书笔记同步纳入知识管理体系。\n\n`;

  md += `### 3. 演示文稿快速制作流\n\n`;
  md += `适合从大纲到成品的幻灯片/网页演示制作。\n\n`;
  md += `\`\`\`\n主题定义 → 内容生成 → 图表配图 → 幻灯片制作 → 封面收尾\n\`\`\`\n\n`;
  md += `| 步骤 | 推荐技能 | 作用 |\n|---|---|---|\n`;
  md += `| ① 主题定义 | \`prompt-optimizer\` | 将模糊需求编译为结构化 prompt |\n`;
  md += `| ② 内容生成 | \`HeavySkill\` / \`article-analyzer\` | 深度思考生成大纲与逐页内容 |\n`;
  md += `| ③ 图表配图 | \`baoyu-diagram\` / \`baoyu-infographic\` | 生成流程图、架构图或信息图 |\n`;
  md += `| ④ 幻灯片制作 | \`html-ppt\` / \`guizang-ppt-skill\` / \`baoyu-slide-deck\` | 生成网页 PPT 或图片版幻灯片 |\n`;
  md += `| ⑤ 封面收尾 | \`baoyu-cover-image\` | 生成演示封面与章节过渡页 |\n`;
  md += `| ⑥ 品牌统一 | \`theme-factory\` | 应用统一主题配色与排版风格 |\n\n`;
  md += `> 💡 若需要技术类演示，可额外使用 \`architecture-diagram\` 生成深色架构图。\n\n`;

  md += `### 4. 产品研发与发布流\n\n`;
  md += `适合从需求到上线的完整开发周期。\n\n`;
  md += `\`\`\`\n需求澄清 → 规格定义 → 增量开发 → 代码审查 → 质量保障 → 部署发布\n\`\`\`\n\n`;
  md += `| 步骤 | 推荐技能 | 作用 |\n|---|---|---|\n`;
  md += `| ① 需求澄清 | \`to-prd\` / \`idea-refine\` | 对话生成 PRD，或压力测试假设 |\n`;
  md += `| ② 规格定义 | \`spec-driven-development\` | 编码前先写规范文档与接口契约 |\n`;
  md += `| ③ 增量开发 | \`incremental-implementation\` / \`tdd\` | 大任务拆分，测试驱动逐步落地 |\n`;
  md += `| ④ 代码审查 | \`code-review-and-quality\` | 多维度审查，合并前质量把关 |\n`;
  md += `| ⑤ 质量保障 | \`setup-pre-commit\` / \`webapp-testing\` | 配置提交钩子与自动化测试 |\n`;
  md += `| ⑥ 部署发布 | \`deploy-to-vercel\` / \`release-skills\` | 一键部署，自动检测版本与 changelog |\n\n`;
  md += `> 💡 如需 API 设计，可在 ② 阶段加入 \`api-and-interface-design\` 或 \`design-an-interface\`。\n\n`;

  md += `### 5. 社交媒体内容运营流\n\n`;
  md += `适合将优质外部内容改编为自有社交媒体素材。\n\n`;
  md += `\`\`\`\n热点捕捉 → 内容改编 → 视觉设计 → 一键分发\n\`\`\`\n\n`;
  md += `| 步骤 | 推荐技能 | 作用 |\n|---|---|---|\n`;
  md += `| ① 热点捕捉 | \`baoyu-x-to-markdown\` / \`baoyu-url-to-markdown\` | 保存推文/文章为 Markdown |\n`;
  md += `| ② 内容改编 | \`merge-drafts\` / \`blog-checker\` | 合稿并评估文章质量 |\n`;
  md += `| ③ 视觉设计 | \`guizang-social-card-skill\` / \`baoyu-infographic\` | 生成小红书图文、信息图等 |\n`;
  md += `| ④ 一键分发 | \`baoyu-post-to-x\` / \`baoyu-post-to-weibo\` / \`baoyu-post-to-wechat\` | 多平台同步发布 |\n\n`;
  md += `> 💡 运营小红书时，\`guizang-social-card-skill\` 的 3:4 封面模板可直接使用。\n\n`;

  md += `### 6. 长文精读与复盘沉淀流\n\n`;
  md += `适合对高质量长文进行深度阅读并沉淀为个人方法论。\n\n`;
  md += `\`\`\`\n长文输入 → 伴读分析 → 复盘提取 → 提示词沉淀\n\`\`\`\n\n`;
  md += `| 步骤 | 推荐技能 | 作用 |\n|---|---|---|\n`;
  md += `| ① 长文输入 | \`baoyu-url-to-markdown\` | 将长文转为本地 Markdown |\n`;
  md += `| ② 伴读分析 | \`article-analyzer\` / \`HeavySkill\` | 结构化拆解与深度思考 |\n`;
  md += `| ③ 复盘提取 | \`session-achieve\` | 从阅读/对话中提取纠偏逻辑与关键洞察 |\n`;
  md += `| ④ 提示词沉淀 | \`prompt-optimizer\` | 将个人阅读方法论固化为可复用 prompt |\n`;
  md += `| ⑤ 归档管理 | \`ima-skill\` | 存入知识库，建立阅读索引 |\n\n`;
  md += `> 💡 配合 \`weread-skills\` 可将微信读书中的划线与书评纳入同一复盘流程。\n\n`;

  return md;
}

// ====== Update catalog.html ======
function updateCatalogHTML(markdown) {
  let html = fs.readFileSync(CATALOG_HTML, 'utf8');
  const startTag = '<script id="markdown-content" type="text/markdown">';
  const endTag = '</script>';
  const startIdx = html.indexOf(startTag);
  const endIdx = html.indexOf(endTag, startIdx + startTag.length);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Could not find markdown-content script in catalog.html');
  }
  const newHTML = html.substring(0, startIdx + startTag.length) + '\n' + markdown + '\n    ' + html.substring(endIdx);
  fs.writeFileSync(CATALOG_HTML, newHTML);
}

// ====== Main ======
const rawContent = fs.readFileSync(CATALOG_MD, 'utf8');
const skills = parseCatalog(rawContent);
console.log(`Parsed ${skills.length} skills`);

const markdown = generateCatalogMarkdown(skills);
fs.writeFileSync(CATALOG_MD, markdown);
console.log('Updated docs/catalog.md');

updateCatalogHTML(markdown);
console.log('Updated docs/catalog.html');
