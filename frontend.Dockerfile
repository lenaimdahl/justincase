FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy needed files
COPY package.json .yarn yarn.lock packages/frontend ./

# Install dependencies
RUN yarn install --immutable

WORKDIR /app/packages/frontend

# Build the frontend
RUN yarn build
