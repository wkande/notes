### Prod Deployment

These instructions are for the deployment of the Node.js backend for Notes. See the deploy.md file in the notes-docs-vX.X repo to deploy the docs.

1. Verify version # in package.json and package.lock.json.

1. GitHub merge all Branches to main.

1. Update the GitHub release (should already exist).
This draft release was added right after the last release was published.

1. Redeploy Heroko from Main branch.

1. Local Repo: git fetch, git pull.
Only if needed.

1. Create a new GitHub release as a draft for the next > release.
Do this so that as features and bugs are fixed they can be added during development. Otherwise things might be forgotten during the developmnet cycle between releases.
