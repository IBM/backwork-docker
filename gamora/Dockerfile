# Always specify the point version
FROM python:2.7.13-alpine3.6
MAINTAINER leonsp@ca.ibm.com

# install mongodump and mongorestore
RUN echo 'http://dl-3.alpinelinux.org/alpine/edge/community' >> /etc/apk/repositories \
    && echo 'http://dl-3.alpinelinux.org/alpine/edge/main' >> /etc/apk/repositories \
    && apk add --no-cache \
        libressl \
        mariadb-client \
        mongodb-tools \
        postgresql \
    && apk add --upgrade --no-cache \
        expat \
        freetype \
        fontconfig \
        libpng \
        zlib

VOLUME ["/backups"]

# ADD extracts automatically
# We want the side-effect
ADD build.tgz /gamora
WORKDIR /gamora

COPY requirements.txt ./
RUN pip install -r ./requirements.txt --find-links ./pip

COPY ./docker-entrypoint.sh ./entrypoint.sh
CMD ["/bin/ash", "/gamora/entrypoint.sh"]
