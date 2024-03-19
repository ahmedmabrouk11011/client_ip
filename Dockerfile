# Use the official node image as the base image
FROM node:18.16.0-alpine3.17

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the index.js file
CMD ["node", "index.js"]
