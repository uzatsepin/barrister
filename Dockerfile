# Минимальный Dockerfile для Nuxt.js (если .output самодостаточен)

# Базовый образ с Node.js 20
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Ступень для установки зависимостей
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# Ступень для сборки приложения
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Финальная ступень для production (минимальная)
FROM node:20-alpine AS runner

# Создание пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxt

WORKDIR /app

# Копирование только собранного приложения
COPY --from=builder --chown=nuxt:nodejs /app/.output /app/.output

USER nuxt

EXPOSE 3000

ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0

CMD ["node", ".output/server/index.mjs"]