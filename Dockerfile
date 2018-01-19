# Installs the latest version of node for the container
FROM node:latest

# Add the current directory . into the path /iot-core in the image.
WORKDIR /iot-core
# Set the working directory to /iot-core.
ADD . /iot-core

# Commands that docker runs when the container is started
RUN npm i

# This is saved in the environment
# Environmental things necessary for build
# This needs to be the same port that the hapi server is running on
# ENV PORT 8080

EXPOSE 8080

#Run
CMD ["node", "./src/index.js"]
