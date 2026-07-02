---
description: "Crates a knowlege graph about this current projekt with its components and relation between them"
trigger: "user wants wiki update of application"
---

# SOP: [wiki update]

## 🎯 Objective
look at the given Projekt an crate a knowledge graph out of it.
In this way the code, components of the software and the relation of them gets documentetd.

## 🛠️ Prerequisites
1. Read the current Project.
2. Read existing `docs/index.md` to get to know every current documented Component.

## 📝 Step-by-Step Process (Tier 2: The Process)
1. **Initial Check**: *What is the first thing to verify?*
Compare what system changes have been made that are no longer correctly documented.
Check if Code System components are new and not documented jet. 

2. **Execution**: *Detail the primary actions.*
    1. Idetify major idea, entitys and key Concept that are not jet documented. Dont write anithing up to this point.
    2. Create a overview of your finding for the user and dicuss your findings with him. Wait for his aproval of your findings
    3. Create a concept page in `docs/` named after the component. Reference the sourcefile in the summary header with [[sourcefilename]].
    4. Add wiki-links ([[page-name]]) to connect related pages
    5. Update `docs/index.md` with new pages and one-line descriptions

3. **Validation**: *How do we know the task was successful?*

## 📚 Deep Knowledge (Tier 3: References)
*Links to templates, examples, or external documentation that are only needed during execution.*
- [[Context/Concpt-page-template.md]]: to know how wiki pages should look like.