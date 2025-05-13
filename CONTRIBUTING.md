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
6. Ensure that the code is:
   - Validated by the linter.
   - With updated and passing tests.
7. Open the Pull Request to the `develop` branch.

> Direct Pull Requests to `main` are not allowed.

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