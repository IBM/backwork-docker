#!/bin/bash
set -e

log() {
  local message
  message=$1
  echo "[$(date)] $message" 1>&2
}

back_up_mongo() {
  FILENAME=mongo_backup_$(date +"%Y%m%d_%H%M%S").archive.gzip

  log "Taking mongo backup"
  monsoon ${NOTIFICATION_SETTINGS} backup mongo \
      -u "${MONGO_BACKUP_USER}" \
      -p "${MONGO_BACKUP_PASSWORD}" \
      --host="${MONGO_HOST}" \
      --archive=/tmp/"${FILENAME}" \
      --gzip
  log "Done: Taking mongo backup"

  log "Uploading mongo backup"
  monsoon ${NOTIFICATION_SETTINGS} upload softlayer \
      -u "${SOFTLAYER_USER}" \
      -p "${SOFTLAYER_API_KEY}" \
      -d "${SOFTLAYER_DATACENTER}" \
      -c "${SOFTLAYER_CONTAINER}" \
      /tmp/"${FILENAME}" \
      "${REMOTE_PATH}/${FILENAME}" \
      && rm -f /tmp/"${FILENAME}"
  log "Done: Uploading mongo backup"
}

back_up_mysql() {
  FILENAME=mysql_backup_$(date +"%Y%m%d_%H%M%S").archive.gzip

  log "Taking mysql backup"
  monsoon ${NOTIFICATION_SETTINGS} backup mysql \
      --output=/tmp/"${FILENAME}" \
      --gzip \
      --all-databases \
      --single-transaction \
      "--host=${MYSQL_HOST:?}" \
      "--port=${MYSQL_PORT:?}" \
      "--user=${MYSQL_USER:?}" \
      "--password=${MYSQL_PASSWORD:?}"
  log "Done: Taking mysql backup"

  log "Uploading mysql backup"
  monsoon ${NOTIFICATION_SETTINGS} upload softlayer \
      -u "${SOFTLAYER_USER}" \
      -p "${SOFTLAYER_API_KEY}" \
      -d "${SOFTLAYER_DATACENTER}" \
      -c "${SOFTLAYER_CONTAINER}" \
      /tmp/"${FILENAME}" \
      "${REMOTE_PATH}/${FILENAME}" \
      && rm -f /tmp/"${FILENAME}"
  log "Done: Uploading mysql backup"
}

back_up_files() {
  FILENAME=files_backup_$(date +"%Y%m%d_%H%M%S").archive.tgz

  log "Taking file backup"
  monsoon ${NOTIFICATION_SETTINGS} backup files \
      --output=/tmp/"${FILENAME}" \
      ${BACKUP_LOCAL_PATHS:?} # space-separated list
  log "Done: Taking file backup"

  ls -la /tmp

  log "Uploading file backup"
  monsoon ${NOTIFICATION_SETTINGS} upload softlayer \
      -u "${SOFTLAYER_USER}" \
      -p "${SOFTLAYER_API_KEY}" \
      -d "${SOFTLAYER_DATACENTER}" \
      -c "${SOFTLAYER_CONTAINER}" \
      /tmp/"${FILENAME}" \
      "${REMOTE_PATH}/${FILENAME}" \
      && rm -f /tmp/"${FILENAME}"
  log "Done: Uploading file backup"
}

main() {
  back_up_mongo
  back_up_mysql
  back_up_files
}


NOTIFICATION_SETTINGS=""

if [[ -n ${SENTRY_DSN:-} ]]; then
    NOTIFICATION_SETTINGS="-n sentry --sentry-dsn=${SENTRY_DSN}"
fi

REMOTE_PATH="${SOFTLAYER_PATH:?}/$(date +%Y/%m)"

main
