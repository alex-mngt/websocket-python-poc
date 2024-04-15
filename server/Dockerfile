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
ENV PATH="/scripts/opt/venv/bin:$PATH"
RUN apt update && apt install -y python3 python3-pip python3-venv
RUN python3 -m venv dist/scripts/opt/venv


# ECHO current directory
# COPY ./scripts/requirements.txt /usr/src/app/scripts/requirements.txt
# RUN pip3 install -Ur requirements.txt

# Start Node server 
CMD ["node", "dist/index.js"]