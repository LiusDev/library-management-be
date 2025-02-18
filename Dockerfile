FROM node:22.14.0-alpine as production

WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Command to run the application
CMD ["node", "src/main.js"]
