# Use the latest Node.js image as the base
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy project files to the container's working directory
COPY project .

# Install http-server globally to serve the files
RUN npm install -g http-server

# Command to run when the container starts
CMD [ "http-server", "-p", "2250" ]

# Expose port 2250 for the container
EXPOSE 2250
