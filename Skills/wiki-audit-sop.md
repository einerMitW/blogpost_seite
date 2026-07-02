---
description: "Checks if LLM-Wiki documentation is consistent, linked and up to date"
trigger: "user requests wiki audit"
---

# SOP: [wiki-audit]

## 🎯 Objective
Checking if the Knowlede graph documentation of this project in `docs/*` has correct page formatting, is consitent in its relations and sources are given correctly. 

## 🛠️ Prerequisites
1. Read existing docs/index.md to get to know every current documented Component.
*What needs to be in place or read before starting? (e.g., "Read Context/standards.md")*

## 📝 Step-by-Step Process (Tier 2: The Process)
1. **Initial Check**: *What is the first thing to verify?*

2. **Execution**: *Detail the primary actions.*
    Analyse the wiki:
    - **Contradiction:** Check for contradictions between pages
    - **Orphan:** Find orphan pages (no inbound links from other pages)
    - **Own Page:** Identify concepts mentioned in pages that lack their own page
    - **Outdated:** Flag claims that may be outdated based on newer sources
    - **Template:**Check that all pages follow the page template format above

    Report findings as a numbered tabele flaged with the type of issue. Suggest fixes for eacht issue.
    The user can select which findings he wants to fix.

3. **Validation**: *How do we know the task was successful?*

## 📚 Deep Knowledge (Tier 3: References)
*Links to templates, examples, or external documentation that are only needed during execution.*
- [[Context/Concpt-page-template.md]]: to know how wiki pages should look like.