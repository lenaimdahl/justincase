# Build
FROM node:24-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/frontend/ ./packages/frontend/
COPY packages/backend/package.json ./packages/backend/package.json
COPY .yarn/ .yarn/

RUN yarn install --immutable

WORKDIR /app/packages/frontend

RUN yarn build

# Serve
FROM nginx:1.31.0-alpine@sha256:c22e76a97fe5bacad9d58bad0a96e903480c05f8dee30884b14550530ddd25a9

COPY --from=builder /app/packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
