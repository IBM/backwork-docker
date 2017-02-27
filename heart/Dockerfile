FROM node:6.10-alpine
MAINTAINER Partner Ecosystem Team, IBM Digital Business Group <imcloud@ca.ibm.com>

RUN mkdir -p /srv/heart
WORKDIR /srv/heart

COPY package.json /srv/heart

RUN npm install

COPY . /srv/heart

EXPOSE 3000

CMD ["npm", "start"]
