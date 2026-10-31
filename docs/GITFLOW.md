# Gitflow

`main` is released source; `develop` integrates the next release. Start `feature/<name>` from develop and open a PR back to develop. Start `release/<version>` from develop, stabilize using reviewed PRs, update version/changelog together, then PR to main. After merging, create the signed `v<version>` tag on the current main commit. Open a main → develop backmerge PR immediately. Start urgent `hotfix/<name>` from main; PR to main, tag the corrected version, and backmerge main → develop and any open release branch. Never cherry-pick a release while omitting its fixes from develop.

Use signed commits and merge commits so ancestry and backmerges remain visible. Integration branches prohibit force pushes/deletion, require one independent human/codeowner review, resolved conversations, CI and a merge queue on main/develop. CI handles `merge_group`; provider reviews run on PRs because queue commits have no PR event. Re-review changes after a new push. AI artifacts support human review and do not grant visual approval.

Local temporary work can be unsigned while preparing the initial migration. Recreate those commits with verified signing before pushing protected source. No local automation here pushes, tags, publishes, or deploys implicitly.
