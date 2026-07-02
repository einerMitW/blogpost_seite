---
description: "Process to keep Vault_map.md, Context-map.md, and skills-map.md accurate, formatted with relative Markdown links, and synchronized with user approval."
trigger: "When a new markdown document, core folder, or SOP is created, deleted, or renamed."
---

# SOP: Map Update

## 🎯 Objective
Ensure that all navigation and context map files (`Vault_map.md`, `Context/Context-map.md`, `Skills/skills-map.md`) are always up-to-date with the repository's file structure. Note: The Wiki index is handled separately by the `wiki-audit-sop`.

## 🛠️ Prerequisites
- Familiarity with the file structure defined in `Vault_map.md`.
- Read and understand `Context/standards.md`.

## 📝 Step-by-Step Process (Tier 2: The Process)

### 1. Initial Check
- Scan the workspace files to identify any untracked or modified markdown/SOP/core files that are not listed in their corresponding map files:
  - Root directory files and folders ➔ check against `Vault_map.md`.
  - `Context/` files ➔ check against `Context/Context-map.md`.
  - `Skills/` files ➔ check against `Skills/skills-map.md`.

### 2. Execution
- Identify the target map(s) that need updating.
- Draft the required changes. All maps must use relative Markdown links starting from the root directory (e.g. `[label](Context/standards.md)`).
- **Mandatory Approval Step**:
  - Present the planned modifications to the user in the chat using a markdown table with the following structure:
    | File | Action | Description | Link |
    | --- | --- | --- | --- |
    | `Relative Path` | Added / Updated / Removed | One-line description of the file's purpose | `[label](Relative/Path)` |
  - Do NOT modify the map files on disk until the user explicitly approves the proposed changes.
- Once approved, perform a surgical edit to write the changes to the files.

### 3. Validation
- Verify that every linked file in the map exists and the relative Markdown links are valid.
- Ensure no dead links or obsolete files are kept in any map.

## 📚 Deep Knowledge (Tier 3: References)
- [Vault_map.md](Vault_map.md): Root project structure map.
- [Context/Context-map.md](Context/Context-map.md): Maps files inside the `Context/` folder.
- [Skills/skills-map.md](Skills/skills-map.md): Maps standard operating procedures in `Skills/`.
