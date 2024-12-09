This project uses the default TSConfig configuration, tsup for its build pipeline and changesets to add changelogs and smooth releases

# How to create a PR

1. Fork the repo
2. Create your branch
3. Run `npm run define:change` to define the changes you've made and go to the changelog.
4. Commit and open your PR

# How to release it

1. Run `npm run release:apply` to apply all the changes from the contributors to the branch. It will update the package version
2. Run `npm run build` to build the project.
3. Release the repo
