# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/ssl.conf /etc/nginx/conf.d/ssl.conf

# Create directories for SSL certificates
RUN mkdir -p /etc/letsencrypt/live/ec2-3-83-215-13.compute-1.amazonaws.com

# Expose ports
EXPOSE 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
