# CI

The following commands were used to configure CI with Travis (one-time setup).

```shell
travis encrypt \
  PIP_REPO_HOST_WITH_CREDS="https://na.artifactory.swg-devops.com/artifactory/api/pypi/apset-pypi-local" \
  PIP_REPO_USERNAME="" \
  PIP_REPO_PASSWORD="" \
  --add env
```

## Variables defined in Travis CI web config

Once you add `REGISTRY_USERNAME` and `REGISTRY_PASSWORD`, it becomes preferable to define environment variables in the Travis web interface. This is also the recommended approach for variables that do not change across branches.

Others:
-   Repo

## Slack

The value for `notifications/slack/secure` is obtained by running the following
command.

```sh
travis encrypt "<SLACK_TEAM_SUB_DOMAIN>:<SLACK_TOKEN>" -add notifications.slack
```
