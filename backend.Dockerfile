FROM node:24-alpine@sha256:fb71d01345f11b708a3553c66e7c74074f2d506400ea81973343d915cb64eef0

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
