# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Copy root workspace configuration
COPY package.json .yarnrc.yml yarn.lock ./
COPY .yarn ./.yarn/
COPY packages/frontend ./packages/frontend/

# Install dependencies
RUN corepack enable && yarn install --immutable

WORKDIR /app/packages/frontend

# Build the frontend
RUN yarn build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
