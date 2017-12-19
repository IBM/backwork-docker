# Always specify the point version
FROM python:2.7.14-alpine3.7
MAINTAINER leonsp@ca.ibm.com

# Install database clients
# Apply security patches
RUN echo 'http://dl-3.alpinelinux.org/alpine/edge/community' >> /etc/apk/repositories \
    && echo 'http://dl-3.alpinelinux.org/alpine/edge/main' >> /etc/apk/repositories \
    && apk add --no-cache \
        bash \
        libressl \
        mariadb-client \
        mongodb-tools \
        postgresql \
    && apk add --upgrade --no-cache \
        db \
        expat \
        freetype \
        fontconfig \
        libpng \
        ncurses \
        zlib

VOLUME ["/backups"]

# ADD extracts automatically
# We want the side-effect
ADD build.tgz /gamora
WORKDIR /gamora

COPY requirements.txt ./
RUN pip install -r ./requirements.txt --find-links ./pip

COPY ./docker-entrypoint.sh ./entrypoint.sh
CMD ["/bin/bash", "/gamora/entrypoint.sh"]
