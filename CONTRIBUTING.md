# Contribution Guide - AbacatePay NodeJS SDK

First and foremost, thank you for considering contributing to the AbacatePay NodeJS SDK! We truly appreciate your time and effort in helping make our SDKs even better.

This guide presents a set of guidelines for contributing to this project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Before You Start: The Importance of Issues](#before-you-start-the-importance-of-issues)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Your First Code Contribution](#your-first-code-contribution)
- [Code Contribution Process](#code-contribution-process)
- [Semantic Versioning (when using Changesets)](#semantic-versioning-when-using-changesets)
- [Code Review](#code-review)
- [What We Expect from Contributors](#what-we-expect-from-contributors)
- [What to Avoid](#what-to-avoid)
- [Security Issues](#security-issues)
- [Questions or Suggestions about the Contribution Process?](#questions-or-suggestions-about-the-contribution-process)

## Code of Conduct

This project and everyone participating in it is governed by the [AbacatePay Code of Conduct](./CODE_OF_CONDUCT.md) (or the link to the centralized `CODE_OF_CONDUCT.md` file, if applicable). By participating, you are expected to uphold this code. Please report unacceptable behavior to suport@abacatepay.com.

A respectful and collaborative environment is fundamental.

## Before You Start: The Importance of Issues

AbacatePay's SDKs are **open source** projects, maintained with rigor to ensure quality, security, and consistency.

**It is mandatory to open a GitHub Issue before starting development on any Pull Request (PR)**, except for extremely simple corrections (e.g., typos in documentation).

*   **Why?**
    *   To describe your proposal (bug, feature, improvement) and align with maintainers and the community.
    *   To ensure your contribution aligns with the official roadmap and project priorities.
    *   To avoid rework or developing something that is already being done or doesn't fit the SDK's goals.

*   **How to proceed:**
    *   Check existing issues to ensure your idea or the bug you found hasn't already been reported.
    *   Use the Issue templates provided in the repository (Bug Report, Feature Request) to provide all necessary details.
    *   **Do not start development before receiving feedback or approval on the opened Issue.**

## How Can I Contribute?

There are many ways to contribute:

*   **Reporting Bugs:** If you find a bug, please let us know by opening a detailed issue.
*   **Suggesting Enhancements or New Features:** Have an idea for a new feature or an improvement to an existing one? Open an issue for discussion.
*   **Writing or Improving Documentation:** Clear documentation is crucial. Contributions to READMEs, code examples, or guides are very welcome.
*   **Submitting Code:** Contribute bug fixes or new feature implementations through Pull Requests.

### Your First Code Contribution

Not sure where to start? You can look for issues tagged with `good first issue` or `help wanted` in the specific SDK repository:

*   **Good first issues:** Usually minor problems that should only require a few lines of code and one or two tests, ideal for those new to contributing.
*   **Help wanted issues:** May be a bit more involved, but are tasks that maintainers have identified as good opportunities for community contributions.

## Code Contribution Process

1.  **Open an Issue:** As mentioned, this is the mandatory first step.

2.  **Fork and Clone the Repository:**
    *   Fork the `AbacatePay/abacatepay-nodejs-sdk` repository to your personal GitHub account.
    *   Clone your fork locally: `git clone https://github.com/YOUR_USERNAME/abacatepay-nodejs-sdk.git`

3.  **Create a Branch:**
    *   Navigate to your local clone's directory.
    *   Create a new branch from the `develop` branch (this is our main development branch) . **Direct Pull Requests to `main` are not allowed.**
        ```bash
        git checkout develop
        git pull origin develop --rebase # Ensure your local develop is up-to-date
        git checkout -b your-branch-name # Ex: feature/new-client-api or fix/bug-123
        ```

4.  **Set Up Environment and Install Dependencies:**
    *   Follow the instructions in the specific SDK's `README.md` to set up the development environment and install dependencies. Generally:
        *   Node.js: `npm install` (or `yarn install`)
        *   Go: `go mod tidy`
        *   Python: `pip install -r requirements.txt` (or use Poetry/PDM if specified in the project)
        *   PHP: `composer install`
        *   Java: `mvn install` (or Gradle)
        *   Kotlin: `gradle build` (or Maven)

5.  **Develop Your Contribution:**
    *   Write clear, concise, and well-commented code.
    *   Follow the language's and project's coding style standards (check for linter/formatter configuration files like ESLint, Prettier, Black, Checkstyle, ktlint, etc.).
    *   **Add Tests:** Your contribution must include unit and/or integration tests covering the changes made. Ensure all existing tests continue to pass.
    *   **Update Documentation:** If your change impacts how the SDK is used or adds new functionality, update the `README.md`, code examples in the `examples/` folder, and any other relevant documentation.

6.  **Follow Commit Guidelines:**
    *   Make atomic commits with clear and objective messages, following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)  standard.
        *   Examples: `feat: add support for balance inquiry method`, `fix: correct error handling in payments API (#123)`, `docs: update client creation examples`.
    *   **Never expose tokens or credentials in commits!**

7.  **Create a Changeset (if the project uses Changesets):**
    *   Many of our SDKs use `changesets` to manage versioning and the changelog. If this is the case for the SDK you are contributing to, create a changeset to document your changes:
        ```bash
        npx changeset # Or the equivalent command if using yarn
        ```
    *   Follow the `changeset` prompts to select the type of change (patch, minor, major) according to [Semantic Versioning](#semantic-versioning) and describe your changes for the changelog.

8.  **Local Validation:**
    *   Ensure your code is validated by the linter configured in the project.
    *   Ensure all tests are passing.

9.  **Keep Your Branch Updated:**
    *   Before submitting the PR, update your branch with the `develop` branch from the original (`upstream`) repository to incorporate the latest changes and resolve potential conflicts.
        ```bash
        git fetch upstream # If you haven't configured upstream: git remote add upstream https://github.com/AbacatePay/abacatepay-nodejs-sdk.git
        git rebase upstream/develop
        ```

10. **Submit the Pull Request (PR) :**
    *   Push your branch to your fork on GitHub: `git push origin your-branch-name`.
    *   Open a Pull Request on GitHub from your branch in your fork to the `develop` branch of the `AbacatePay/abacatepay-nodejs-sdk` repository.
    *   Fill out the provided Pull Request template, detailing your changes, the related Issue, and the verification checklist.

## Semantic Versioning (when using Changesets)

When running `npx changeset` (or equivalent), you will need to select the type of change according to semantic versioning (MAJOR.MINOR.PATCH):

*   **patch (Z):** Bug fixes or small, backward-compatible changes that do not affect the public API. Examples: fixing a bug, performance improvements, internal refactoring.

*   **minor (Y):** Backward-compatible addition of functionality. Examples: new methods, optional parameters, or behaviors that do not break existing code.

*   **major (X):** Changes that break backward compatibility (breaking changes). Examples: removing methods or parameters, changing function behaviors that might break existing integrations.

## Code Review

*   After submitting the PR, maintainers will review it.
*   Be prepared to respond to comments, discuss your choices, and make additional changes requested by reviewers.
*   The goal of the review is to ensure the quality, consistency, and security of the code.
*   Respect the review processes and feedback from maintainers.
*   Do not ignore failures in the CI/CD pipeline. If automatic checks fail, investigate and fix the problems in your branch.

## What We Expect from Contributors

*   Clear and respectful communication.
*   Adherence to the Issues-before-PRs process.
*   Clear, objective, and standardized commits.
*   Clean, well-documented code, validated by linters, and with adequate test coverage.
*   Documentation updated whenever necessary.
*   Well-described, organized Pull Requests linked to the corresponding Issue.
*   Compliance with our [Quality Gates](/ci/QUALITY_GATES.md) (if a specific document exists, otherwise remove this line or adapt).

## What to Avoid

*   Starting Pull Requests without an approved Issue (except for trivial fixes).
*   Submitting generic PRs or those involving multiple unrelated changes. Create focused PRs.
*   Using vague commit messages like "adjustments," "update," "changes."
*   Ignoring failures in the CI/CD pipeline or reviewer feedback.
*   Disregarding established standards for code, tests, and documentation.
*   Exposing tokens, API keys, or any other credentials in commits or code.

## Security Issues

If you discover a security vulnerability within this project, please follow our [Security Policy](./SECURITY.md) (or the link to the centralized `SECURITY.md` file). **Do not report security vulnerabilities through public issues.**

## Questions or Suggestions about the Contribution Process?

If you have questions about this process or want to discuss an idea even before opening a formal Issue, feel free to use the repository's "Discussions" section (if enabled) or, as a last resort, open an Issue to seek alignment.

Maintainers are available to guide and ensure your contribution adds value in the best possible way.

Thank you immensely for your collaboration with AbacatePay's **open source** ecosystem!
