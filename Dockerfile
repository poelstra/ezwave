# Sample Dockerfile to build apps/demo
#
# In order to cache the installation of node modules, make
# sure to first run (in the host, before running `docker build`):
#
# common/scripts/prepare-docker-cache.sh

FROM node:24

VOLUME /config

# RUN apt-get update \
#     && apt-get install -y udev \
#     && rm -rf /var/lib/apt/lists/*

ENV CI=true
WORKDIR /app

COPY ./cache .
COPY pnpm-workspace.yaml pnpm-lock.yaml ./
RUN npm install --global pnpm@$(node -p "require('./package.json').packageManager.split('@')[1]")
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm turbo run build

ENTRYPOINT ["node", "/app/apps/demo/lib/index"]
CMD ["/config/config.json"]
