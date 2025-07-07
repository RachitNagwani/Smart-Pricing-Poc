# Use an official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of your application
COPY . .

# Expose the port your server runs on
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]