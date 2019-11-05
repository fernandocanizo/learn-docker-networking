# This is our first build stage, it will not persist in the final image,
# we use a multi-stage build to avoid leaving secrets around ;)
FROM node:10

# update system
RUN apt update
RUN apt upgrade -y
# update npm
RUN npm install -g npm

WORKDIR /usr/local/src

RUN git clone https://github.com/fernandocanizo/learn-docker-networking /usr/local/src

COPY config-docker.js config/config.js

RUN npm ci --only=prod

CMD [ "npm", "start" ]
