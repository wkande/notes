### Prod Deployment

1. Verify version # in package.json.

1. Verify version # in _sidebar.md.

1. Export Insomnia AP Definitions > create Zip file.

1. GitHub merge all Branches.
 Merge to Main - github pages will auto update.

1. Update the GitHub release (should already exist).
This draft release was added right aftger the last release was published.

1. Redeploy Heroko from Main branch.

1. Local Repo: git fetch, git pull.
Only if needed.

1. Create a new GitHub release as a draft for the next > release.
We do this so that as features and bugs are fixed they can be added during development. Otherwise things might be forgotten during the developmnet cycle between releases.
