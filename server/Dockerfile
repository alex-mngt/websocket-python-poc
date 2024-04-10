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

# Copy built app to nginx server root
RUN cp test.py dist/test.py

# Install Python
RUN apt update && apt install -y python3 python3-pip

# Enable pnpm
RUN corepack enable pnpm

# Start Node server 
CMD ["node", "dist/index.js"]