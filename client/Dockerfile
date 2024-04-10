# Build stage
FROM node:alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN corepack enable pnpm
COPY package*.json ./
RUN pnpm install

# Copy app source
COPY . .

# Build app
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built app to nginx server root
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Start nginx
CMD ["nginx", "-g", "daemon off;"]