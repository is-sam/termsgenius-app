# Stage 1: Build the application
FROM node:20-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install
RUN npm install -g @angular/cli@18

# Copy the rest of the application code
COPY . .

# Expose the development server port
EXPOSE 4200

# Start the development server
CMD ["npm", "run", "start-docker"]
