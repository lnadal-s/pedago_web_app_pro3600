FROM node:10.20.1-alpine3.11

RUN apk add --update docker openrc

RUN rc-update add docker boot

WORKDIR /back-end

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD node server.js