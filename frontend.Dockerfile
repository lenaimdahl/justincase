# Build
FROM node:26.3.0-alpine@sha256:3ad34ca6292aec4a91d8ddeb9229e29d9c2f689efd0dd242860889ac71842eba AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/frontend/ ./packages/frontend/
COPY packages/backend/package.json ./packages/backend/package.json
COPY .yarn/ .yarn/

RUN yarn install --immutable

WORKDIR /app/packages/frontend

RUN yarn build

# Serve
FROM nginx:1.31.1-alpine@sha256:8b1e78743a03dbb2c95171cc58639fef29abc8816598e27fb910ed2e621e589a

COPY --from=builder /app/packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
