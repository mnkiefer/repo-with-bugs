---
name: Test Assign to Agent
description: Test workflow for assign_to_agent safe output feature
on:
  issues:
    types: [labeled]
  workflow_dispatch:
    inputs:
      issue_number:
        description: 'Issue number to test with'
        required: true
        type: string

permissions:
  actions: write
  contents: write
  issues: write
  pull-requests: write

# NOTE: Assigning Copilot agents requires ALL of these:
# 1. Workflow permissions (all four required):
#    - actions: write
#    - contents: write
#    - issues: write
#    - pull-requests: write
# 2. GitHub Actions GITHUB_TOKEN (PATs will NOT work)
# 3. Repository Settings > Actions > General > Workflow permissions:
#    Must be set to "Read and write permissions"
#    (Default "Read repository contents and packages permissions" is NOT sufficient)

engine: copilot
tools:
  github:
    mode: remote
    toolsets: [default]

safe-outputs:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  assign-to-agent:
    max: 5
    default-agent: copilot
---

# Assign to Agent Test Workflow

This workflow tests the `assign_to_agent` safe output feature, which allows AI agents to assign GitHub Copilot agents to issues.

## Task

Output the assign_to_agent JSON only. Do not use GitHub tools or perform any operations yourself.

**For workflow_dispatch:**
Output: `{"type": "assign_to_agent", "issue_number": ${{ github.event.inputs.issue_number }}, "agent": "copilot"}`

The safe output script will handle the actual assignment.
