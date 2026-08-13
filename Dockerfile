# Dockerfile

# ============================================
# STAGE 1: Build the Vite React Application
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies (handles unsynced lockfiles cleanly)
RUN npm install

# Copy remaining source code
COPY . .

# Compile Vite static bundle into /app/dist
RUN npm run build

# ============================================
# STAGE 2: Serve Static Assets with Nginx
# ============================================
FROM nginx:alpine

# Clear default Nginx html files
RUN rm -rf /usr/share/nginx/html/*

# Copy built static assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
