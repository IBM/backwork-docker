FROM node:6.10-alpine
MAINTAINER Partner Ecosystem Team, IBM Digital Business Group <imcloud@ca.ibm.com>

RUN mkdir -p /srv/chell
WORKDIR /srv/chell

COPY package.json /srv/chell

RUN npm install --production

COPY . /srv/chell

EXPOSE 3000

CMD ["npm", "start"]
