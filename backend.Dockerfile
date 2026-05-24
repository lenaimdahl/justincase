FROM node:24-alpine@sha256:2bdb65ed1dab192432bc31c95f94155ca5ad7fc1392fb7eb7526ab682fa5bf14

WORKDIR /app

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
