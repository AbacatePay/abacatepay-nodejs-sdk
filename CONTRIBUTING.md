# Contribution Guide - AbacatePay NodeJS SDK

First and foremost, thank you for considering contributing to the AbacatePay NodeJS SDK! We truly appreciate your time and effort in helping make our SDKs even better.

This guide presents a set of guidelines for contributing to this project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

* [Code of Conduct](#code-of-conduct)
* [Before You Start: The Importance of Issues](#before-you-start-the-importance-of-issues)
* [How Can I Contribute?](#how-can-i-contribute)

  * [Your First Code Contribution](#your-first-code-contribution)
* [Code Contribution Process](#code-contribution-process)
* [Semantic Versioning (when using Changesets)](#semantic-versioning-when-using-changesets)
* [Code Review](#code-review)
* [What We Expect from Contributors](#what-we-expect-from-contributors)
* [What to Avoid](#what-to-avoid)
* [Security Issues](#security-issues)
* [Questions or Suggestions about the Contribution Process?](#questions-or-suggestions-about-the-contribution-process)

## Code of Conduct

This project and everyone participating in it is governed by the [AbacatePay Code of Conduct](./CODE_OF_CONDUCT.md) (or the link to the centralized `CODE_OF_CONDUCT.md` file, if applicable). By participating, you are expected to uphold this code. Please report unacceptable behavior to \[[suport@abacatepay.com](mailto:suport@abacatepay.com)]. A respectful and collaborative environment is fundamental.

## Before You Start: The Importance of Issues

AbacatePay's SDKs are **open source** projects, maintained to ensure quality, security, and consistency.

**It is mandatory to open a GitHub Issue before starting development on any Pull Request (PR)**, except for extremely simple corrections (e.g., typos in documentation).

**Why?**

* To describe your proposal (bug, feature, improvement) and align with maintainers and the community.
* To ensure your contribution aligns with the official roadmap and project priorities.
* To avoid rework or developing something that is already being done or doesn't fit the SDK's goals.

**How to proceed:**

* Check existing issues to ensure your idea or the bug you found hasn't already been reported.
* Use the Issue templates provided in the repository (Bug Report, Feature Request) to provide all necessary details.
* **Do not start development before receiving feedback or approval on the opened Issue.**

## How Can I Contribute?

There are many ways to contribute:

* **Reporting Bugs:** If you find a bug, please let us know by opening a detailed issue.
* **Suggesting Enhancements or New Features:** Have an idea for a new feature or an improvement to an existing one? Open an issue for discussion.
* **Writing or Improving Documentation:** Clear documentation is crucial. Contributions to READMEs, code examples, or guides are very welcome.
* **Submitting Code:** Contribute bug fixes or new feature implementations through Pull Requests.

### Your First Code Contribution

Not sure where to start? You can look for issues tagged with `good first issue` or `help wanted` in the specific SDK repository:

* **Good first issues:** Usually minor problems that should only require a few lines of code and one or two tests, ideal for those new to contributing.
* **Help wanted issues:** May be a bit more involved but are tasks that maintainers have identified as good opportunities for community contributions.

## Code Contribution Process

1. **Open an Issue:** As mentioned, this is the mandatory first step.

2. **Fork and Clone the Repository:**

* Fork the `AbacatePay/abacatepay-nodejs-sdk` repository to your personal GitHub account.
* Clone your fork locally: `git clone https://github.com/YOUR_USERNAME/abacatepay-nodejs-sdk.git`

3. **Create a Branch:**

* Navigate to your local clone's directory.
* Create a new branch from the `develop` branch (this is our main development branch). **Direct Pull Requests to `main` are not allowed.**

```bash
git checkout develop
git pull origin develop --rebase # Ensure your local develop is up-to-date
git checkout -b your-branch-name # Ex: feature/new-client-api or fix/bug-123
```

4. **Set Up Environment and Install Dependencies:**

* Follow the instructions in the specific SDK's `README.md` to set up the development environment and install dependencies. Generally:

  * Node.js: `npm install`
  * Python: `pip install -r requirements.txt`
  * PHP: `composer install`

5. **Develop Your Contribution:**

* Write clear, concise, and well-commented code.
* Follow the coding style standards defined in the repository.
* Add unit and integration tests covering your changes.

6. **Create a Changeset:**

* If the project uses `changesets`, run the following command:

```bash
npx changeset
```

7. **Submit the Pull Request:**

* Push your branch to your fork on GitHub: `git push origin your-branch-name`.
* Open a Pull Request from your branch to the `develop` branch of the repository.

## Code Review

* After submitting the PR, maintainers will review it.
* Be prepared to respond to comments and make changes if requested.

## Security Issues

If you discover a security vulnerability, follow our [Security Policy](./SECURITY.md). **Do not report security vulnerabilities through public issues.**

## Questions or Suggestions about the Contribution Process?

If you have questions about this process, feel free to open a discussion or issue in the repository.

Thank you for your contributions to the AbacatePay **open source** ecosystem!

