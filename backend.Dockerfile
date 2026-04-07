FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/backend/ ./packages/backend/
COPY .yarn/ .yarn/

RUN yarn install --immutable

WORKDIR /app/packages/backend

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
