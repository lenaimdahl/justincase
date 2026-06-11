FROM node:26.3.0-alpine@sha256:3ad34ca6292aec4a91d8ddeb9229e29d9c2f689efd0dd242860889ac71842eba

WORKDIR /app

# hadolint ignore=DL3018
RUN apk add --no-cache curl

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/backend/ ./packages/backend/
COPY packages/frontend/package.json ./packages/frontend/package.json
COPY .yarn/ .yarn/

RUN yarn --immutable

WORKDIR /app/packages/backend

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
