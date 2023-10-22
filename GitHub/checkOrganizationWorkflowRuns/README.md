# GitHub Actions Check for an Organization

This script checks for GitHub Actions workflow runs in repositories of a specified organization within a defined time window.

## Security Notice

Ensure you **do not** push your personal access token or the output.txt file to public repositories. Consider using environment variables or external configuration files to manage sensitive information. Make sure to include the output.txt file in your .gitignore configuration.

## Features

- Fetch all repositories of a specified GitHub organization.
- Check each repository for GitHub Actions workflow runs within a specified time frame.
- Outputs relevant run details to a file.

## Prerequisites

- Node.js installed on your machine.
- `node-fetch` npm package.

## Setup

1. Clone this repository:

```bash
git clone https://github.com/sadak-halil/tools.git
cd tools
```

2. Install the required npm package:

```bash
npm install node-fetch
```

3. Update the script's configuration:

- `TOKEN`: You'll need a Personal Access Token (PAT) with the appropriate permissions ('repo', 'workflow', and 'read:org' if you're checking private repositories). [Create a PAT on GitHub](https://github.com/settings/tokens) if you don’t have one.
- `ORG`: Name of the GitHub organization.
- `START_DATE_TIME` and `END_DATE_TIME`: The time window for which you want to check the runs. Check the inline comments of the script for formatting examples.
  - Note that the GitHub API has pagination. In the script the response is limited to the first 100 repositories and the first 100 workflow runs per repository. If you have more than this, you'll need to implement pagination logic.
  - GitHub has [rate limits](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting) for API calls. If you're checking a lot of repositories, you might hit these limits. Ensure you handle rate limit responses appropriately.

4. Run the script:

```bash
node script.mjs
```

After the script finishes its execution, you will find the results in `output.txt`.
