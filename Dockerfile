# Sample Dockerfile to build app/demo
#
# In order to cache the installation of node modules, make
# sure to first run (in the host, before running `docker build`):
#
# common/scripts/prepare-docker-cache.sh

FROM node:16

VOLUME /config

# RUN apt-get update \
#     && apt-get install -y udev \
#     && rm -rf /var/lib/apt/lists/*

ENV CI=true
WORKDIR /app

COPY ./common ./common
COPY ./cache .
COPY ./rush.json .
RUN node ./common/scripts/install-run-rush.js install --max-install-attempts 1

COPY . .
RUN node common/scripts/install-run-rush.js build

ENTRYPOINT ["node", "/app/apps/demo/lib/index"]
CMD ["/config/config.json"]
