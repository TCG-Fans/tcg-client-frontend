# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code (excluding node_modules and other ignored files)
COPY . .

# Set environment variable to override base path and build
ENV VITE_BASE_PATH=/
RUN npm run build -- --config vite.config.prod.ts

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/ssl.conf /etc/nginx/conf.d/ssl.conf

# Create directories for SSL certificates
RUN mkdir -p /etc/letsencrypt/live/chainsmokers.duckdns.org

# Create webroot directory for Let's Encrypt challenge
RUN mkdir -p /var/www/certbot

# Expose ports
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
