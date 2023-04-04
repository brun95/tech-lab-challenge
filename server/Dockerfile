FROM node:latest

# Set the working directory
WORKDIR /server

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install  --verbose --progress=plain

# Copy the server application code
COPY . .

# Set the command to start the server
CMD ["npm", "start"]
