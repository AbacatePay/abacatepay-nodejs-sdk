# General Contribution Guide
Thank you for wanting to contribute to AbacatePay's **open source** SDKs!
This guide explains how to collaborate efficiently and in alignment with our standards.
---
## Before Starting
AbacatePay's SDKs are **open source** projects, maintained with rigor to ensure quality, security, and consistency.
**It is mandatory to open an Issue before any Pull Request**, except for extremely simple corrections (e.g., typos).
- Use the Issue to describe your proposal and align with the maintainers.
- Do not start development before approval or feedback on the opened Issue.
- This process ensures that your contribution is aligned with the official roadmap and avoids rework.
---
## Contribution Process
1. Open an Issue before any development.
2. Create the appropriate branch from `develop`.
3. Make sure your branch is **updated with the (`develop`) branch**:
   ```
   git pull origin develop --rebase
   ```
4. Install the project dependencies with the package manager appropriate to the language used:
   - Node.js: `npm install`
   - Go: `go mod tidy`
   - Python: `pip install -r requirements.txt`
5. Follow the [Commit Guidelines](/contributors/COMMIT_GUIDELINES.md).
6. **Create a changeset to document your changes:**
   ```
   npx changeset
   ```
7. Ensure that the code is:
   - Validated by the linter.
   - With updated and passing tests.
8. Open the Pull Request to the `develop` branch.
> Direct Pull Requests to `main` are not allowed.
---
## Semantic Versioning
When running `npx changeset`, you'll need to select the type of change according to semantic versioning (X.Y.Z):

- **patch (Z)**: Bug fixes or small changes that don't affect the public API. Examples: fixing a bug, performance improvements, internal refactoring.
  
- **minor (Y)**: Backwards-compatible functionality additions. Examples: new methods, optional parameters, or behaviors that don't break existing code.
  
- **major (X)**: Breaking changes incompatible with previous versions. Examples: removing methods or parameters, changing function behaviors that might break existing integrations.

The changeset process will guide you through selecting affected packages and describing your changes for the changelog.
---
## What We Expect
- Clear, objective, and standardized commits.
- Clean code, validated by lint tools and with adequate test coverage.
- Documentation updated whenever necessary.
- Well-described and organized Pull Requests linked to the Issue.
- Respect for the review processes and feedback from maintainers.
- Compliance with our [Quality Gates](/ci/QUALITY_GATES.md).
---
## What to Avoid
- Starting Pull Requests without the proper approved Issue.
- Submitting generic PRs or those involving multiple unrelated changes.
- Using vague commit messages such as "adjustments", "update", "changes".
- Ignoring failures in the CI/CD pipeline.
- Disregarding established standards for code, tests, and documentation.
- **Never expose tokens or credentials in commits!**
---
## Code of Conduct
All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).
A respectful and collaborative environment is fundamental.
---
## Questions or Suggestions
If you have questions about the process or want to discuss an idea, open an Issue for prior alignment.
The maintainers are available to guide and ensure that your contribution adds value in the best possible way.
We thank you for collaborating with AbacatePay's **open source** ecosystem.