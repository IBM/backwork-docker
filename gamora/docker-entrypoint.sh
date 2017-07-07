#!/bin/bash
set -e

log() {
  local message
  message=$1
  echo "[$(date)] $message" 1>&2
}

upload_backup() {
  local filename=$1
  local remote_path

  if [[ -z "${SOFTLAYER_PATH:-}" ]]; then
    log "Skipping upload because no Softlayer credentials"
    return
  fi

  remote_path="${SOFTLAYER_PATH:?}/$(date +%Y/%m)"

  log "Uploading backup"
  monsoon ${NOTIFICATION_SETTINGS} upload softlayer \
      -u "${SOFTLAYER_USER}" \
      -p "${SOFTLAYER_API_KEY}" \
      -d "${SOFTLAYER_DATACENTER}" \
      -c "${SOFTLAYER_CONTAINER}" \
      /tmp/"${filename:?}" \
      "${remote_path:?}/${filename:?}" \
      && rm -f /tmp/"${filename:?}"
  log "Done: Uploading backup"
}

back_up_mongo() {
  if [[ -z "${MONGO_HOST:-}" ]]; then
    log "Skip backing up Mongo because no Mongo host specified"
    return
  fi

  FILENAME=mongo_backup_$(date +"%Y%m%d_%H%M%S").archive.gz

  log "Taking mongo backup"
  monsoon ${NOTIFICATION_SETTINGS} backup mongo \
      -u "${MONGO_BACKUP_USER}" \
      -p "${MONGO_BACKUP_PASSWORD}" \
      --host="${MONGO_HOST}" \
      --archive=/tmp/"${FILENAME}" \
      --gzip
  log "Done: Taking mongo backup"

  upload_backup "${FILENAME:?}"
}

back_up_mysql() {
  if [[ -z "${MYSQL_HOST:-}" ]]; then
    log "Skip backing up MySQL because no MySQL host specified"
    return
  fi

  FILENAME=mysql_backup_$(date +"%Y%m%d_%H%M%S").archive.gz

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

  upload_backup "${FILENAME:?}"
}

# PGDATABASE: gru,nsa,picard,pony,savant,sentry,usher
# PGHOST: slave
# PGPASSWORD: ...
# PGPORT: '5432'
# PGUSER: dswb

back_up_postgresql() {
  local databases
  if [[ -z "${PGHOST:-}" ]]; then
    log "Skip backing up PostgreSQL because no PostgreSQL host specified"
    return
  fi

  databases="$(echo ${PGDATABASE} | tr ',' ' ')"

  for database in $databases; do # TODO
    FILENAME=postgresql_backup_$(date +"%Y%m%d_%H%M%S").archive.gz

    log "Taking mysql backup"
    monsoon ${NOTIFICATION_SETTINGS} backup postgresql \
        --output=/tmp/"${FILENAME}" \
        --gzip \
        --all-databases \
        --single-transaction \
        "--host=${MYSQL_HOST:?}" \
        "--port=${MYSQL_PORT:?}" \
        "--user=${MYSQL_USER:?}" \
        "--password=${MYSQL_PASSWORD:?}"
    log "Done: Taking mysql backup"

    upload_backup "${FILENAME:?}"
  done
}

back_up_files() {
  if [[ -z "${BACKUP_LOCAL_PATHS:-}" ]]; then
    log "Skip backing up files because no local paths specified"
    return
  fi

  FILENAME=files_backup_$(date +"%Y%m%d_%H%M%S").archive.tgz

  log "Taking file backup"
  monsoon ${NOTIFICATION_SETTINGS} backup files \
      --output=/tmp/"${FILENAME}" \
      ${BACKUP_LOCAL_PATHS:?} # space-separated list
  log "Done: Taking file backup"

  upload_backup "${FILENAME:?}"
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



main
