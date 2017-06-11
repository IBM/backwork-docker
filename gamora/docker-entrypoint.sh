#!/bin/bash
set -e

log() {
  local message
  message=$1
  echo "[$(date)] $message" 1>&2
}

back_up_mongo() {
  FILENAME=mongo_backup_$(date +"%Y%m%d_%H%M%S").archive.gzip

  local remote_path
  remote_path="${SOFTLAYER_PATH:?}/$(date +%Y/%m)"

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
      "${remote_path}/${FILENAME}"
  log "Done: Uploading mongo backup"
}

back_up_mysql() {
  FILENAME=mysql_backup_$(date +"%Y%m%d_%H%M%S").archive.gzip

  local remote_path
  remote_path="${SOFTLAYER_PATH:?}/$(date +%Y/%m)"

  log "Taking mysql backup"
  set -x
  monsoon ${NOTIFICATION_SETTINGS} backup mysql \
      --output=/tmp/"${FILENAME}" \
      --gzip \
      --all-databases \
      --single-transaction \
      "--host=${MYSQL_HOST:?}" \
      "--port=${MYSQL_PORT:?}" \
      "--user=${MYSQL_USER:?}" \
      "--password=${MYSQL_PASSWORD:?}"
  set +x
  log "Done: Taking mysql backup"

  log "Uploading mysql backup"
  set -x
  monsoon ${NOTIFICATION_SETTINGS} upload softlayer \
      -u "${SOFTLAYER_USER}" \
      -p "${SOFTLAYER_API_KEY}" \
      -d "${SOFTLAYER_DATACENTER}" \
      -c "${SOFTLAYER_CONTAINER}" \
      /tmp/"${FILENAME}" \
      "${remote_path}/${FILENAME}"
  set +x
  log "Done: Uploading mysql backup"
}

main() {
  back_up_mongo
  back_up_mysql
}


NOTIFICATION_SETTINGS=""

if [[ -n ${SENTRY_DSN:-} ]]; then
    NOTIFICATION_SETTINGS="-n sentry --sentry-dsn=${SENTRY_DSN}"
fi

main
