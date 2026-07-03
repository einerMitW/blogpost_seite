# Project Workflow

## Git Branching Model
We use a robust branching model to keep development organized and stable:
1. **`main`**: Contains only production-ready code. No direct commits to `main`.
2. **`develop`** (or `code`): The main integration branch. All new features are merged here.
3. **`feature/*`**: Dedicated branches for new features, branched from `develop`.

## Development Process
We strictly follow a Test-Driven Development (TDD) approach within our feature branches.

### The TDD Loop
1. **Red (Write a Failing Test):** Before writing any production code, write a test that defines the desired behavior. Run the test and see it fail.
2. **Green (Write the Code):** Write the minimal amount of code necessary to make the test pass.
3. **Refactor:** Clean up the code (following DRY, KISS, and YAGNI principles) while ensuring all tests continue to pass.

### Feature Workflow & Pull Requests
1. **Start:** Create a new feature branch from `develop`:
   `git switch -c feature/my-feature`
2. **Develop:** Use the TDD loop (Red, Green, Refactor) to implement the feature, committing regularly with clear messages (`added`, `changed`, `fixed`, `refactored`).
3. **Sync & Resolve Conflicts:**
   - Fetch the latest changes from the `develop` branch: `git pull origin code` (or develop)
   - Manually resolve any merge conflicts locally on your feature branch.
4. **Push:**
   - Run the full test suite to ensure everything passes.
   - Push your conflict-free branch: `git push origin feature/my-feature`
5. **Merge:** Create a Pull Request in GitHub to merge the feature branch into the `develop` / `code` branch.
