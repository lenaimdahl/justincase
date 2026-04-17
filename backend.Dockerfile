FROM node:24-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f

WORKDIR /app

RUN apk add --no-cache curl=8.17.0-r1

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/backend/ ./packages/backend/
COPY packages/frontend/package.json ./packages/frontend/package.json
COPY .yarn/ .yarn/

RUN yarn --immutable

WORKDIR /app/packages/backend

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
