# Use official Node.js runtime as parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application source code
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
