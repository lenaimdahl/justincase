# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Copy needed files
COPY package.json .yarn yarn.lock packages/frontend ./

# Install dependencies
RUN yarn install --immutable

WORKDIR /app/packages/frontend

# Build the frontend
RUN yarn build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
