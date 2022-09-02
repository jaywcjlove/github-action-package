github-action-package
===

[![CI](https://github.com/jaywcjlove/github-action-package/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/github-action-package/actions/workflows/ci.yml)

Read and modify the contents of `package.json`.

## Example Usage

```yaml
- name: package.json info
  id: info
  uses: jaywcjlove/github-action-package@main

- run: echo "name - ${{ steps.info.outputs.name }}"
- run: echo "version - ${{ steps.info.outputs.version }}"
- run: echo "description - ${{ steps.info.outputs.description }}"
- run: echo "author - ${{ steps.info.outputs.author }}"
```

```yaml
- name: package.json info
  id: info
  uses: jaywcjlove/github-action-package@main
  with:
    data: |
      {
        "name": "@jaywcjlove/github-action-package-test"
      }

- run: echo "name - ${{ steps.info.outputs.name }}"
- run: echo "version - ${{ steps.info.outputs.version }}"
- run: echo "description - ${{ steps.info.outputs.description }}"
- run: echo "author - ${{ steps.info.outputs.author }}"
```

## Inputs

- `path` The path of the `package.json` file.  Default: `package.json`
- `data` json data for changing `package.json`.  Default: `{}`
- `rename` Used to change "name" data in "package.json".

### Output Parameters

- `name` The name of the package.
- `description` This helps people discover your package, as it's listed in 'npm search'.
- `version` Version must be parseable by node-semver, which is bundled with npm as a dependency.
- `homepage` The url to the project homepage.
- `author` author field in package.json
- `private` private field in package.json
- `license` You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it.
- `author` This helps people discover your package as it's listed in 'npm search'.
- `keywords` This helps people discover your package as it's listed in 'npm search'.
- `repository` Specify the place where your code lives. This is helpful for people who want to contribute.
- `os` Specify which operating systems your module will run on.
- `cpu` cpu field in package.json

## See Also

- [Create Tags From](https://github.com/jaywcjlove/create-tag-action) Auto create tags from commit or package.json.
- [Github Release Changelog Generator](https://github.com/jaywcjlove/changelog-generator) A GitHub Action that compares the commit differences between two branches
- [Github Action Contributors](https://github.com/jaywcjlove/github-action-contributors) Github action generates dynamic image URL for contributor list to display it!
- [Generated Badges](https://github.com/jaywcjlove/generated-badges) Create a badge using GitHub Actions and GitHub Workflow CPU time (no 3rd parties servers)
- [Create Coverage Badges](https://github.com/jaywcjlove/coverage-badges-cli) Create coverage badges from coverage reports. (no 3rd parties servers)

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/github-action-package/graphs/contributors">
  <img src="https://jaywcjlove.github.io/github-action-package/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
