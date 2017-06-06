#!/bin/bash
set -e

FILENAME=mongo_backup_$(date +"%Y%m%d_%H%M%S").archive.gzip
NOTIFICATION_SETTINGS=""

if [[ $SENTRY_DSN ]]; then
    NOTIFICATION_SETTINGS="-n sentry --sentry-dsn=${SENTRY_DSN}"
fi

monsoon ${NOTIFICATION_SETTINGS} backup mongo \
    -u "${MONGO_BACKUP_USER}" \
    -p "${MONGO_BACKUP_PASSWORD}" \
    --host="${MONGO_HOST}" \
    --archive=/tmp/"${FILENAME}" \
    --gzip\
&& \
monsoon ${NOTIFICATION_SETTINGS} upload softlayer \
    -u "${SOFTLAYER_USER}" \
    -p "${SOFTLAYER_API_KEY}" \
    -d "${SOFTLAYER_DATACENTER}" \
    -c "${SOFTLAYER_CONTAINER}" \
    /tmp/"${FILENAME}" \
    mongo/"${FILENAME}"
