# Use an official Node.js runtime as a base image for building
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /gql

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

#RUN chown -R node:node node_modules/.prisma

# Build TypeScript code
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Expose the port that the app runs on
EXPOSE 4000

# Create Database and Start GraphQL service
CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run start"]
