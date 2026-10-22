# Build
FROM node:26.12.1-alpine@sha256:40cd011b55415bc894e45b02fdd5a5dfde056921b7d23a64c74f80497af48797 AS builder

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
FROM nginx:1.31.7-alpine@sha256:892bb2152464f0c5d8972593a5f5afaf8054552580b699d95f8ff4af08c2d33d

COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
