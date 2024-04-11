FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Copy local files
COPY . .

# Install app dependencies
RUN corepack enable pnpm
RUN pnpm install

# Build app
RUN pnpm build

# Install Python & Pip
RUN apt update && apt install -y python3 python3-pip

# Start Node server 
CMD ["node", "dist/main.js"]