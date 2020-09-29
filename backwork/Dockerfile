FROM python:3.8.6-alpine3.12
LABEL maintainer="leonsp@ca.ibm.com"

# Install database clients
# Apply security patches
# hadolint ignore=DL3018
RUN echo 'http://dl-3.alpinelinux.org/alpine/edge/community' >> /etc/apk/repositories \
    && echo 'http://dl-3.alpinelinux.org/alpine/edge/main' >> /etc/apk/repositories \
    && apk add --no-cache \
        bash \
        curl \
        libressl \
        mariadb-client \
        mongodb-tools \
        mysql \
        postgresql \
        tini \
    && apk add --upgrade --no-cache \
        db \
        expat \
        freetype \
        fontconfig \
        libpng \
        ncurses \
        zlib

RUN curl -sL https://sentry.io/get-cli/ | bash

##########
# Backwork
##########

COPY requirements.txt ./
RUN pip install -r ./requirements.txt

COPY ./docker-entrypoint.sh /

VOLUME ["/backups"]
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/docker-entrypoint.sh"]
