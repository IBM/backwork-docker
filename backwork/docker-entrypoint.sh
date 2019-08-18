#!/bin/bash
set -eo pipefail

# Docker volume for backups
export BACKUP_PATH=/backups

NOTIFICATION_SETTINGS=()
if [[ -n ${SENTRY_DSN:-} ]]; then
  NOTIFICATION_SETTINGS=(-n sentry "--sentry-dsn=${SENTRY_DSN:?}")
fi

log() {
  local message
  message=$1
  echo "[$(date)] $message" 1>&2
}

upload_backup() {
  local filename=$1
  local remote_path
  local backup_prefix=$2
  if [[ -z "${SOFTLAYER_PATH:-}" ]]; then
    log "Skipping upload because no Softlayer path"
    upload_backup_cos "${filename:?}" "${backup_prefix:?}"
    return
  fi

  if [[ -z "${SOFTLAYER_USER:-}" ]]; then
    log "Skipping upload because no Softlayer user"
    upload_backup_cos "${filename:?}" "${backup_prefix:?}"
    return
  fi

  if [[ -z "${SOFTLAYER_API_KEY:-}" ]]; then
    log "Skipping upload because no Softlayer api key"
    upload_backup_cos "${filename:?}" "${backup_prefix:?}"
    return
  fi

  remote_path="${SOFTLAYER_PATH:?}/$(date +%Y/%m)"

  log "Uploading backup"
  backwork "${NOTIFICATION_SETTINGS[@]}" upload softlayer \
    --username "${SOFTLAYER_USER:?}" \
    --api-key "${SOFTLAYER_API_KEY:?}" \
    --datacenter "${SOFTLAYER_DATACENTER:?}" \
    --container "${SOFTLAYER_CONTAINER:?}" \
    --network "${SOFTLAYER_NETWORK:?}" \
    "${BACKUP_PATH:?}/${filename:?}" \
    "${remote_path:?}/${filename:?}"

  if (($? == 0)); then

    find ${BACKUP_PATH:?} -type f -regex ".*${backup_prefix:?}.*" -delete
    log "Done: Uploading backup"
  else

    while [[ "$(find ${BACKUP_PATH:?} -type f -regex ".*${backup_prefix:?}.*" | wc -w)" -ge "${LOCAL_BACKUP_NUMBER:?}" ]]; do
      rm -f "${BACKUP_PATH:?}/$(ls -t "${BACKUP_PATH:?}" | grep "${backup_prefix:?}" | tail -1)"
    done
  fi
}

upload_backup_cos() {
  local filename=$1
  local remote_path
  local backup_prefix=$2
  if [[ -z "${IBM_COS_INSTANCE_ID:-}" ]]; then
    log "Skipping upload because no IBM COS service instance id"
    return
  fi

  if [[ -z "${IBM_COS_ENDPOINT_URL:-}" ]]; then
    log "Skipping upload because no IBM COS endpoint url"
    return
  fi

  if [[ -z "${IBM_COS_BUCKET:-}" ]]; then
    log "Skipping upload because no IBM COS bucket name"
    return
  fi

  if [[ -z "${IBM_COS_PATH}" ]]; then
    remote_path="$(date +%Y/%m)"
  else
    remote_path="${IBM_COS_PATH:?}/$(date +%Y/%m)"
  fi

  log "Uploading backup to IBM COS"
  backwork "${NOTIFICATION_SETTINGS[@]}" upload cos \
    --endpoint-url "${IBM_COS_ENDPOINT_URL}" \
    --instance-id "${IBM_COS_INSTANCE_ID}" \
    --access-key "${IBM_COS_ACCESS_KEY}" \
    --secret-key "${IBM_COS_SECRET_KEY}" \
    "${BACKUP_PATH:?}/${filename:?}" \
    "${IBM_COS_BUCKET:?}" \
    "${remote_path:?}"
  if (($? == 0)); then

    find ${BACKUP_PATH:?} -type f -regex ".*${backup_prefix:?}.*" -delete
    log "Done: Uploading backup to IBM COS"
  else
    while [[ "$(find ${BACKUP_PATH:?} -type f -regex ".*${backup_prefix:?}.*" | wc -w)" -ge "${LOCAL_BACKUP_NUMBER:?}" ]]; do
      rm -f "${BACKUP_PATH:?}/$(ls -t "${BACKUP_PATH:?}" | grep "${backup_prefix:?}" | tail -1)"
    done
  fi

}

back_up_mongo() {
  local filename

  if [[ -z "${MONGO_HOST:-}" ]]; then
    log "Skip backing up Mongo because no Mongo host specified"
    return
  fi

  filename=mongo_backup_$(date +"%Y%m%d_%H%M%S").archive.gz

  log "Taking mongo backup"
  backwork "${NOTIFICATION_SETTINGS[@]}" backup mongo \
    -u "${MONGO_BACKUP_USER}" \
    -p "${MONGO_BACKUP_PASSWORD}" \
    --host="${MONGO_HOST}" \
    --archive="${BACKUP_PATH:?}/${filename}" \
    --gzip
  log "Done: Taking mongo backup"

  upload_backup "${filename:?}" "mongo_backup"
}

back_up_mysql() {
  local filename

  if [[ -z "${MYSQL_HOST:-}" ]]; then
    log "Skip backing up MySQL because no MySQL host specified"
    return
  fi

  filename=mysql_backup_$(date +"%Y%m%d_%H%M%S").archive.gz

  log "Taking mysql backup"
  backwork "${NOTIFICATION_SETTINGS[@]}" backup mysql \
    --output="${BACKUP_PATH:?}/${filename}" \
    --gzip \
    --all-databases \
    --single-transaction \
    "--host=${MYSQL_HOST:?}" \
    "--port=${MYSQL_PORT:?}" \
    "--user=${MYSQL_USER:?}" \
    "--password=${MYSQL_PASSWORD:?}"
  log "Done: Taking mysql backup"

  upload_backup "${filename:?}" "mysql_backup"
}

# PGDATABASE: gru,nsa,picard,pony,savant,sentry,usher
# PGHOST: slave
# PGPASSWORD: ...
# PGPORT: '5432'
# PGUSER: dswb

back_up_postgresql() {
  local filename
  local databases

  if [[ -z "${PGHOST:-}" ]]; then
    log "Skip backing up PostgreSQL because no PostgreSQL host specified"
    return
  fi

  databases="$(echo "${PGDATABASE:?}" | tr ',' ' ')"

  for database in $databases; do # TODO
    log "Taking PostgreSQL backup of ${database}"

    filename=postgresql_backup_${database:?}_$(date +"%Y%m%d_%H%M%S").archive.gz

    backwork "${NOTIFICATION_SETTINGS[@]}" backup postgresql \
      --output="${BACKUP_PATH:?}/${filename}" \
      --gzip \
      "--host=${PGHOST:?}" \
      "--port=${PGPORT:?}" \
      "--dbname=${database:?}" \
      "--username=${PGUSER:?}" \
      "--password" "${PGPASSWORD:?}"
    log "Done: Taking PostgreSQL backup of ${database:?}"

    upload_backup "${filename:?}" "postgresql_backup"
  done
}

back_up_files() {
  local filename

  if [[ -z "${BACKUP_LOCAL_PATHS:-}" ]]; then
    log "Skip backing up files because no local paths specified"
    return
  fi

  filename=files_backup_$(date +"%Y%m%d_%H%M%S").archive.tgz

  log "Taking file backup"
  # shellcheck disable=SC2086
  cmd="backwork ${NOTIFICATION_SETTINGS[@]} backup files \
        --output=\"${BACKUP_PATH:?}/${filename}\""
  for f in ${BACKUP_LOCAL_PATHS_EXCLUDE:-}; do
    cmd="${cmd} --exclude=\"${f}\""
  done
  cmd="${cmd} ${BACKUP_LOCAL_PATHS:?}" # space-separated list
  eval $cmd
  log "Done: Taking file backup"

  upload_backup "${filename:?}" "files_backup"
}

main() {
  local available_space_g
  df_out=($(df -m "${BACKUP_PATH:?}"))
  available_space_g="$((${df_out[10]:?} / 1024))"

  if [[ ${available_space_g:?} -ge ${MINIMUM_FREE_SPACE:?} ]]; then

    back_up_files
    back_up_mongo
    back_up_mysql
    back_up_postgresql
  else
    log "Error: Not Enough Local Storage Space For Backup"
    sentry-cli send-event -m "Not Enough Local Storage Space For Backup, available space ${available_space_g} GB, minimum free space: ${MINIMUM_FREE_SPACE} GB"
    exit 1
  fi
}

main
