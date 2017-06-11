# CI

The following commands were used to configure CI with Travis (one-time setup).

```shell
travis encrypt PIP_REPO_HOST_WITH_CREDS="" --add env
travis encrypt PIP_REPO_USERNAME="" --add env
travis encrypt PIP_REPO_PASSWORD="" --add env
```

The value for `notifications/slack/secure` is obtained by running the following
command.

```sh
travis encrypt "<SLACK_TEAM_SUB_DOMAIN>:<SLACK_TOKEN>" -add notifications.slack
```
