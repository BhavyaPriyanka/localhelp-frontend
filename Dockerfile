# ==========================
# Stage 1 - Build React App
# ==========================
FROM node:20-alpine AS builder



WORKDIR /app

# Copy dependency files first (Docker layer caching)
COPY code/package*.json ./

# Install dependencies
RUN npm ci


# Copy source code
COPY code/ .


# Build React application
RUN npm run build

# ==========================
# Stage 2 - Nginx Runtime
# ==========================
FROM nginx:1.28-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy build output only
COPY --from=builder /app/build/ /usr/share/nginx/html/

# Copy nginx configuration
COPY localhelp.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]