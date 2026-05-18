---
name: concept-fable
description: Create high-density Chinese explanatory fables that extract a real advanced, relatively niche concept from a user-specified field, hide the concept inside a three-stage story, then reveal and map it. Use when the user asks for 概念寓言, 三段式寓言, 用寓言解释领域概念, story-based concept explanation, Concept Reveal, or asks to turn a domain into a fable with theory mapping, misleading intuition, boundaries, controversy, confidence, and reading directions.
---

# Concept Fable

Turn a user-provided field into a three-stage explanatory fable that lets the reader infer an advanced concept through story mechanics before the concept is named.

## Input Contract

Require a field, domain, discipline, or topic. Treat it as `{变量}`.

If the field is too broad, choose a representative subfield that exposes a deeper mechanism, then explain that choice in the reveal section.

If no reliable concept can be found, answer `不知道` and explain the blocking evidence gap briefly. Do not invent a concept to sound advanced.

Default to Chinese output unless the user explicitly asks for another language.

## Concept Selection

Before writing, internally identify and verify one principle, theory, paradox, mechanism, observation, or named concept from `{变量}`. Do not output the screening process.

Select a concept that satisfies all criteria:

- Real, formally named, and supported by reliable knowledge sources.
- Relatively niche, not an introductory textbook staple.
- Usually beyond early undergraduate exposure.
- More familiar to senior researchers, advanced graduate students, or deep practitioners.
- Obscure but important, with strong explanatory power.
- Concrete enough to become an observable story with a real cognitive reversal.

Check the concept name, definition, theoretical relations, historical context, typical use cases, and controversy before committing. If confidence is weak, switch concepts or state uncertainty directly.

## Story Workflow

Write a three-stage explanatory fable. During the story, do not reveal the concept name, field jargon, or textbook definition.

Use plot, conflict, system rules, character behavior, feedback loops, and changing consequences to make the abstract mechanism observable.

### Stage 1: Establish the World Rule

Show a normal-looking system with a slightly strange rule. Make the reader form an initial model. Plant the hidden contradiction through concrete scenes and system feedback, not abstract explanation.

### Stage 2: Make the Rule Fail

Introduce an anomaly. Let characters apply common sense and fail repeatedly. Show specific consequences. Let the deeper structure emerge without naming the concept.

### Stage 3: Turn the Reader's Model

Expose the real mechanism indirectly. Make earlier details become newly legible. Let the reader naturally realize what the story was pointing at near the ending, while still withholding the formal name until after the story.

Avoid cheap twists, symbolic fog, empty philosophizing, fairy-tale tone, and hard-packed lesson delivery. Prefer concrete mechanisms, concrete consequences, and internally consistent rules. The tone can approach Borges, Ted Chiang, Stanislaw Lem, Calvino, selected Black Mirror episodes, or a scientist writing fiction to explain a hard idea.

## Required Output

Output exactly this structure. Do not add preface, process notes, disclaimers, or transitional filler.

```markdown
# 寓言正文

[三段式寓言。不要提前泄露概念名称。]

# Concept Reveal

**正式名称**：[概念名称]

**核心定义**：[直接、准确、具体地解释该概念。]

**为什么重要**：[说明它在 `{变量}` 领域中的解释价值。]

# 理论映射解析

[逐一对照故事元素与概念机制，说明故事如何映射该理论。]

# 误导性直觉

[说明读者或故事人物最容易误判的地方，以及为什么该直觉会失败。]

# 适用边界与争议

[说明该概念在哪些条件下成立，哪些地方容易被误用；若存在争议，直接写明。]

# 置信度

[高 / 中 / 低 / 未知]：[简短说明依据。]

# 延伸阅读方向

[可选。只给方向或关键词，不编造不存在的文献。]
```

## Explanation Requirements

After the fable, directly explain:

- the formal concept name;
- the core definition;
- why it explains something important in `{变量}`;
- which story elements map to which concept mechanisms;
- the most misleading intuition in the story;
- why the common-sense solution fails;
- the concept's valid boundary;
- controversy, if any;
- confidence: `高`, `中`, `低`, or `未知`, with a short reason.

## Style Rules

Be complete, deep, precise, and concrete. Keep high information density without turning the piece into a textbook.

Use a calm, restrained, sharp voice. Do not flatter the user, praise the question, or accept a weak premise.

If the user's field, premise, or concept framing is wrong, say so directly before writing or choose a more defensible framing.

If the user expresses a strong position, give the strongest rebuttal first, then support or revise it.

Accuracy is the standard. User approval is not the standard.

Ban filler such as `好问题`, `完全正确`, `见解独到`, `值得注意的是`, and generic disclaimers.
