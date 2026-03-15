# Contributing to Rebble Appstore

Thank you for your interest in contributing! This project is maintained by the Rebble community — contributions of all kinds are welcome, whether that's fixing a bug, improving documentation, or opening a well-described issue.

## Ways to contribute

- **Fix a bug** — browse [open issues](https://github.com/pebble-dev/rebble-appstore/issues) labelled `bug`
- **Work on a feature** — look for issues labelled `enhancement` or `good first issue`
- **Improve documentation** — spot something unclear? Open a PR to fix it
- **Report a bug** — open a new issue using the bug report template
- **Suggest a feature** — open a new issue describing what you have in mind

## Before you start

Check the [open issues](https://github.com/pebble-dev/rebble-appstore/issues) and [open pull requests](https://github.com/pebble-dev/rebble-appstore/pulls) to make sure no one else is already working on the same thing. If you plan to work on an issue, leave a comment to let others know.

## Development setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)
- A basic familiarity with TypeScript and React is helpful but not required for documentation or small fixes

### Running locally

```bash
# Fork and clone the repo
git clone https://github.com/<your-username>/rebble-appstore.git
cd rebble-appstore

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` with hot module replacement enabled.

## Making a contribution

1. Fork the repository on GitHub
2. Create a branch for your change:
   ```bash
   git checkout -b your-branch-name
   ```
3. Make your changes
4. Commit with a clear message describing what changed and why
5. Push your branch and open a pull request against the `main` branch
6. In the PR description, reference any related issue (e.g. `Closes #19`)

There is no strict commit message format required, but please keep messages descriptive — "fix typo in README" is fine, "update file" is not.

## Code style

- All code is written in **TypeScript** — avoid using `any` where possible
- Styling uses **Tailwind CSS** utility classes — avoid writing custom CSS unless necessary
- Follow the conventions already present in the codebase — if in doubt, match the surrounding code

There is no automated linter or formatter configured yet (see [issue #11](https://github.com/pebble-dev/rebble-appstore/issues/11)), but one may be added in the future.

## Pull request guidelines

- Keep pull requests focused — one concern per PR is easier to review
- If your PR is a work in progress, open it as a draft
- Add a short description of what you changed and why
- Screenshots or screen recordings are appreciated for UI changes

## Getting help

If you have a question or get stuck, the best place to ask is the Rebble Discord server:

[discord.gg/aRUAYFN](https://discordapp.com/invite/aRUAYFN)

You can also open a discussion issue on GitHub if you prefer.

## Contributors

Thanks to everyone who has contributed to this project! You can see the full list on the [contributors page](https://github.com/pebble-dev/rebble-appstore/graphs/contributors).