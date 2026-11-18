# Build
FROM node:26.13.1-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS builder

ARG VERSION
ARG COMMIT

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV VITE_COMMIT_ID=$COMMIT
ENV VITE_VERSION=$VERSION

WORKDIR /app

# hadolint ignore=DL3018
RUN apk add --no-cache yarn

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/
COPY packages/frontend/package.json packages/frontend/
COPY packages/backend/package.json packages/backend/

RUN yarn install --immutable && yarn cache clean

COPY packages/frontend/index.html packages/frontend/vite.config.ts packages/frontend/tsconfig*.json packages/frontend/
COPY packages/frontend/src/ packages/frontend/src/
COPY packages/frontend/public/ packages/frontend/public/

RUN yarn workspace justincase-frontend build

# Serve
FROM nginx:1.31.9-alpine-slim@sha256:0b98e1db810be4f78a699dd2a98fa1c52b12a71e91872a00a2537b9a8b502be9

# hadolint ignore=DL3017
RUN apk upgrade --no-cache

COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
