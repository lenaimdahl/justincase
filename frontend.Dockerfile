# Build
FROM node:24-alpine@sha256:2bdb65ed1dab192432bc31c95f94155ca5ad7fc1392fb7eb7526ab682fa5bf14 AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/frontend/ ./packages/frontend/
COPY packages/backend/package.json ./packages/backend/package.json
COPY .yarn/ .yarn/

RUN yarn install --immutable

WORKDIR /app/packages/frontend

RUN yarn build

# Serve
FROM nginx:1.31.1-alpine@sha256:d1aedbc848110c391df415b27a241ea36159e63b51b151c29ab059867f9f5174

COPY --from=builder /app/packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
