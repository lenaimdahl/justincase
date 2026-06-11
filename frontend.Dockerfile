# Build
FROM node:24-alpine@sha256:fb71d01345f11b708a3553c66e7c74074f2d506400ea81973343d915cb64eef0 AS builder

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
