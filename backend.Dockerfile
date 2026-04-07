FROM node:24-alpine

# Set working directory
WORKDIR /app

RUN apk add --no-cache curl

# Copy needed files
COPY package.json .yarn yarn.lock packages/backend ./

# Install dependencies
RUN yarn install --immutable

WORKDIR /app/packages/backend

# Build the backend (if needed)
RUN yarn build

# Expose the port (default Nest.js port)
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]
