#####################
#####################
# Stage 1: Packages
#####################
#####################
FROM python:2.7.14-alpine3.7 as packages
LABEL maintainer="leonsp@ca.ibm.com"

# Install database clients
# Apply security patches
# hadolint ignore=DL3018
RUN echo 'http://dl-3.alpinelinux.org/alpine/edge/community' >> /etc/apk/repositories \
    && echo 'http://dl-3.alpinelinux.org/alpine/edge/main' >> /etc/apk/repositories \
    && apk add --no-cache \
        bash \
        libressl \
        mariadb-client \
        mongodb-tools \
        openldap \
        postgresql

ARG PIP_REPO_HOST_WITH_CREDS
ARG PIP_REPO_USERNAME
ARG PIP_REPO_PASSWORD

RUN [[ -n "${PIP_REPO_HOST_WITH_CREDS:?}" ]] \
  && [[ -n "${PIP_REPO_USERNAME:?}" ]] \
  && [[ -n "${PIP_REPO_PASSWORD:?}" ]]

RUN mkdir /root/.pip

RUN printf '[global]\n\
index-url = https://pypi.python.org/simple\n\
extra-index-url = %s\n\
' "$PIP_REPO_HOST_WITH_CREDS" > /root/.pip/pip.conf

RUN printf '[distutils]\n\
index-servers = local\n\
\n\
[local]\n\
repository:%s\n\
username:%s\n\
password:%s\n\
' "$PIP_REPO_HOST_WITH_CREDS" "$PIP_REPO_USERNAME" "$PIP_REPO_PASSWORD" \
  > /root/.pypirc

RUN mkdir -p /gamora /gamora/pip
WORKDIR /gamora

# install monsoon
COPY ./requirements.txt ./pip
RUN pip download --no-input -r ./pip/requirements.txt --dest ./pip \
    && rm /root/.pypirc /root/.pip/pip.conf

#######################
#######################
# Stage 2: Actual Image
#######################
#######################
FROM python:2.7.14-alpine3.7
LABEL maintainer="leonsp@ca.ibm.com"

# Install database clients
# Apply security patches
# hadolint ignore=DL3018
RUN echo 'http://dl-3.alpinelinux.org/alpine/edge/community' >> /etc/apk/repositories \
    && echo 'http://dl-3.alpinelinux.org/alpine/edge/main' >> /etc/apk/repositories \
    && apk add --no-cache \
        bash \
        libressl \
        mariadb-client \
        mongodb-tools \
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

##########
# Gamora
##########
WORKDIR /gamora
COPY --from=packages /gamora .

COPY requirements.txt ./
RUN pip install -r ./requirements.txt --find-links ./pip

COPY ./docker-entrypoint.sh ./entrypoint.sh

VOLUME ["/backups"]
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/gamora/entrypoint.sh"]
