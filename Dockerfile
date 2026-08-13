FROM node:22-alpine

WORKDIR /usr/src/app

COPY project .

CMD ["node", "server.js"]

EXPOSE 2250
