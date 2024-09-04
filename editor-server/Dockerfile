FROM node:16-alpine

RUN apk update && apk upgrade
RUN apk add curl

WORKDIR /app

COPY ./package*.json /app/

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

CMD ["node", "index.js"]

