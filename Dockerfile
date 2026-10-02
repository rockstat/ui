# Build: docker build --build-arg BASE_PATH=/ui -t rockstat/ui .
FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY vendor ./vendor
RUN pnpm install --frozen-lockfile

FROM base AS build
ARG BASE_PATH=""
ENV NEXT_PUBLIC_BASE_PATH=$BASE_PATH NEXT_TELEMETRY_DISABLED=1
# UI_SECRET is required by the env check at build time only; runtime provides the real one.
ENV UI_SECRET=build-placeholder CLICKHOUSE_URL=http://clickhouse:8123
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:24-alpine AS run
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
# the vendored player is referenced by a symlink from standalone node_modules
COPY --from=build /app/vendor ./vendor
EXPOSE 3000
CMD ["node", "server.js"]
