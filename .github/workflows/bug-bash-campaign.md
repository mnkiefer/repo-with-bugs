---
name: Bug Bash Campaign
on:
  schedule:
    - cron: "0 10 * * 1"
  workflow_dispatch:
    inputs:
      project_url:
        description: "GitHub project URL (org or user)"
        required: true
        type: string

engine: copilot

permissions:
  contents: read
  issues: write
  repository-projects: write
  pull-requests: read

safe-outputs:
  update-project:
    github-token: ${{ secrets.PROJECT_GITHUB_TOKEN || secrets.GITHUB_TOKEN }}
    max: 15

tools:
  github:
    mode: remote
    toolsets: [default]

timeout-minutes: 10
---

# Weekly Bug Bash Campaign

You are the Bug Bash Campaign orchestrator. Every week, you organize a focused bug hunting session.

## Steps

1. Calculate the current project name using the format "Bug Bash YYYY-WNN" where YYYY is the current year and WNN is the ISO week number (e.g., "Bug Bash 2025-W46"). Use this as the project name for all `update-project` safe outputs unless `project_url` input overrides it.
2. Ensure the board exists (create if missing) using the calculated project name or `project_url` if provided.
3. Find recent open issues (last 30 days) that have at least one of these labels: `bug`, `defect`, or `regression`. Filter out:
   - Issues already on the board
   - Closed issues
   - Issues with `in-progress`, `wip`, or `blocked-by-external` labels
   - Issues with `enhancement` label unless they also have a defect label
   - Issues with `security-review-pending` label
4. Extract per-issue metadata: number, title, created_at, labels, comment_count, reactions_count (sum of all reaction types), body_length (full body length for accurate classification).
5. Classify each issue using these rules (EXACT ORDER):

   **Priority**:
   - "Critical" if label contains `P0`, `P1`, or `severity:critical`
   - "High" if (comments + reactions) >= 5 OR label contains `severity:high`
   - "Medium" (default for all other cases)

   **Complexity**:
   - "Complex" if label contains `architecture` OR `security`
   - "Quick Win" if body length < 600 characters (and not Complex)
   - "Standard" (all other cases)

   **Impact**:
   - "Blocker" if label contains `blocker`
   - "Major" if count of component/area labels (prefixes: `area:`, `component:`, `module:`) >= 2
   - "Minor" (all other cases)

   **Classification**: concatenated string `Priority|Impact|Complexity` (e.g., `High|Minor|Quick Win`)

6. For each selected issue emit an `update-project` safe output using the calculated project name (from step 1) with fields:
   - Status: "To Do"
   - Priority: (from classification above)
   - Complexity: (from classification above)
   - Impact: (from classification above)
   - Classification: (concatenated string from above)
7. Limit additions to `max` (15) in safe-outputs.
8. Log a summary to the workflow step summary with:
   - Project name used
   - Count scanned vs added vs skipped
   - Priority distribution (Critical / High / Medium)
   - Top 10 candidates (markdown table) sorted by Priority then Impact
   - Quick Wins count (Complexity="Quick Win")
   - Any permission or configuration issues encountered

## Guardrails
- **Required label**: Issue MUST have at least one of: `bug`, `defect`, or `regression`
- Skip items with `enhancement` label unless they also have a defect label.
- Skip items with workflow/status labels: `in-progress`, `wip`, `blocked-by-external`.
- Skip issues with label `security-review-pending`.
- Do not modify items already on the board or closed.
- Use `${{ needs.activation.outputs.text }}` for any manual context (if dispatched from an issue).
- Abort additions (but still produce summary) if `PROJECT_GITHUB_TOKEN` missing or lacks `repository-projects: write`.
- When classifying, use EXACT body length (not truncated) for Complexity determination.
- Count ALL reaction types when calculating engagement for Priority.

## Example (Project Update)
```json
{
  "type": "update-project",
  "project": "Bug Bash 2025-W46",
  "content_type": "issue",
  "content_number": 123,
  "fields": {
    "Status": "To Do",
    "Priority": "High",
    "Complexity": "Standard",
    "Impact": "Major",
    "Classification": "High|Major|Standard"
  }
}
```

Note: The `Classification` field is the concatenated string `Priority|Impact|Complexity` for easy sorting and filtering.

## Summary Template (Log to Step Summary)
````markdown
# Bug Bash Weekly Campaign Summary

**Project**: <CALCULATED_PROJECT_NAME> (e.g., Bug Bash 2025-W46)
**Scanned**: <SCANNED_COUNT> | **Added**: <ADDED_COUNT> | **Skipped**: <SKIPPED_COUNT>

## Priority Distribution
- Critical: <COUNT>
- High: <COUNT>
- Medium: <COUNT>

## Top Candidates
| # | Title | Priority | Impact | Complexity | Comments | Reactions | Labels |
|---|-------|----------|--------|------------|----------|-----------|--------|
<Rows limited to 10>

## Quick Wins (<N>)
<Comma separated issue numbers or 'None'>

## Configuration
- Project URL: ${{ inputs.project_url }} (or calculated from date)
- Lookback days: 30
- Token scope issues: <YES/NO if encountered>
````
