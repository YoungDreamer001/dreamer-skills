---
name: subtext-article
description: Convert Chinese video subtitles, ASR outputs, transcript dumps, Bilibili AIsubtitle JSON, YouTube transcripts, SRT/VTT/ASS/SSA/LRC files, Whisper-style JSON, podcast transcripts, spoken drafts, or copied caption text into a faithful long-form Chinese article. Use when the user asks to turn subtitles, subtext, transcript, video captions, B站字幕, YouTube字幕, ASR转写, 口语稿, 播客转写, or 视频文稿 into a publishable article with Title, Overview, and Markdown sections while preserving the original claims, order, data, examples, and key quotes.
---

# Subtext Article

Convert video subtitles into a complete Chinese article with high fidelity, strong readability, and no invented content.

## Core Contract

Preserve the source first. Keep the video's core claims, information, data, order, logic, examples, named entities, and key quotations. Do not add facts, outside context, interpretations, or "reasonable" completions that are not present in the transcript.

Rewrite for written Chinese. Remove filler words, repeated fragments, broken oral phrasing, speaker hesitation, live-stream housekeeping, and redundant transitions unless they carry meaning.

Rebuild article structure. Turn the transcript into a coherent article with an opening, detailed body sections, and a closing. Use thematic grouping and transitions, but keep the original argument chain traceable.

## Workflow

1. Identify the source family, not just the exact platform:
   - structured JSON: Bilibili AIsubtitle, Whisper/Faster-Whisper/WhisperX, ASR vendor exports, caption arrays, `segments`, `utterances`, `captions`, `subtitles`, `events`, `items`, `words`, or nested objects containing text fields;
   - subtitle files: SRT, WebVTT/VTT, ASS/SSA, LRC, YouTube timedtext XML/TTML, or copied transcript dumps with timestamps;
   - plain transcript text: raw ASR paragraphs, copied captions, podcast transcripts, interview notes, or spoken drafts.
2. Normalize the transcript before writing. For file inputs, prefer `scripts/normalize_subtitle.py` to extract continuous spoken text into a temporary working file. If the script misses a new schema, inspect the file shape and extract the spoken text manually rather than forcing it into a known example.
3. Read the full normalized transcript before drafting. For long transcripts, process in chunks and build an internal evidence map of:
   - main thesis and conclusion;
   - topic sequence;
   - key numbers, dates, names, quoted phrases, causal links, and examples;
   - sections that are promotions, chat acknowledgements, or live-stream housekeeping.
4. Draft the article from the evidence map, not from memory. Preserve all important details while compressing oral repetition.
5. Self-check against the transcript before final output:
   - no fabricated facts;
   - no important claim, data point, example, or turn in logic removed;
   - no remaining timestamp noise or obvious oral filler;
   - article length is about 70%-90% of the useful transcript length unless the user asks otherwise.

## Output Format

Default to Markdown:

```markdown
Title: [accurate, attractive title]

Overview: [150-250 Chinese characters summarizing the core topic and main conclusion]

## [Section Title]

[Detailed prose paragraphs]
```

Use `##` for body sections. Keep the article continuous. Do not use bullets, numbered lists, tables, commentary, or process notes in the final article unless the user explicitly asks for them.

## Handling Details

Keep the original tone category, then raise it into polished written Chinese: professional, explanatory, conversational, analytical, or popular-science as appropriate.

When the video contains a method, framework, workflow, or mental model, rewrite it as clear prose or reusable step-style explanation inside paragraphs. Avoid list formatting unless the user requests a list.

When the transcript contains multiple speakers, merge their exchange into a single coherent article voice. Preserve disagreement, correction, or attribution when it affects the meaning.

When the source mixes Simplified and Traditional Chinese, output Simplified Chinese by default unless the user asks otherwise. Preserve official names, quotes, and region-specific terms when conversion would distort meaning.

When the transcript includes sponsorship, subscriptions, super chats, greetings, likes, or end-screen calls to action, remove them unless they contain substantive content requested by the user.

If the transcript is incomplete, corrupted, or too ambiguous to preserve meaning, state the limitation briefly before writing or ask for the missing source if the gap blocks faithful conversion.

## Bundled Resources

- `scripts/normalize_subtitle.py`: extract spoken text from common JSON, XML, SRT, VTT, ASS/SSA, LRC, YouTube transcript dumps, ASR outputs, or plain subtitle files.
- `case/case1.json` and `case/case2.json`: Bilibili-style JSON examples.
- `case/case3.md`: YouTube transcript example.

The case files are calibration examples, not coverage limits. Read them only when debugging an input format or comparing expected source shapes. Do not load all cases for routine use.
