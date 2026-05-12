---
name: gotcha
description: >
  Save the latest assistant response as a Markdown file. Trigger on "/gotcha", "gotcha",
  "save this response", or any request to export the most recent reply to a file.
---

# Trigger

Activate when user says:
- /gotcha
- gotcha
- save this response
- export last reply

# Execution Contract

Prefer shortest execution path.
This is a deterministic file operation.
Execute immediately.
No analysis.
No planning.
No confirmation.

Target:
- Immediately preceding assistant message only

Actions:
1. Generate timestamp: YYYYMMDD-HHMMSS
2. Create file:
   gotcha-{timestamp}.md
3. Write exact assistant message content
4. Preserve Markdown exactly
5. Save in current working directory

# Output Contract

Reply only:

Saved to gotcha-{timestamp}.md

# Failure Contract

If no assistant message exists, reply only:

Nothing to capture yet. Say something first!