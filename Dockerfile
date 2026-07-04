# Stage 1: Build native dependencies
FROM node:20-slim AS builder

# Install build dependencies required for compiling better-sqlite3
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: Final runner image
FROM node:20-slim

WORKDIR /app

# Copy production node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY server/ ./server/
COPY public/ ./public/

# Create data directory for SQLite database and audit log, and set ownership to node user
RUN mkdir -p /app/data && chown -R node:node /app

# Use unprivileged node user
USER node

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Run the app
CMD ["node", "server/server.js"]
