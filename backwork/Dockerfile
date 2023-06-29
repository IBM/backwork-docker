FROM python:3.11-alpine

# Install database clients
# Apply security patches
# hadolint ignore=DL3018
RUN apk -U upgrade \
  && apk add --upgrade --no-cache \
  bash \
  curl \
  libressl \
  mariadb-client \
  mongodb-tools \
  mysql \
  postgresql \
  tini \
  db \
  expat \
  freetype \
  fontconfig \
  libpng \
  ncurses \
  zlib


##########
# Backwork
##########

COPY requirements.txt ./
RUN python -m pip install --upgrade pip setuptools
RUN pip install -r ./requirements.txt

# install sudo as root
RUN apk add --no-cache --update sudo

# add new user
RUN adduser -D myapp \
  && echo "myapp ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/myapp \
  && chmod 0440 /etc/sudoers.d/myapp

COPY --chown=myapp ./docker-entrypoint.sh /
RUN mkdir /backups && chown myapp /backups
USER myapp

VOLUME ["/backups"]
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/docker-entrypoint.sh"]
