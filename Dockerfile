# === BASE ===
FROM node:lts AS base

# Set up PNPM with correct global directory
RUN mkdir -p /usr/local/share/pnpm
ENV PNPM_HOME=/usr/local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable pnpm

WORKDIR /app

# === DEPS ===
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# === BUILDER ===
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV SKIP_ENV_VALIDATION=1
RUN pnpm build

# === RUNNER ===
FROM base AS runner
WORKDIR /app

# Install Prisma CLI globally with correct permissions
RUN mkdir -p /usr/local/share/pnpm \
    && chmod -R 777 /usr/local/share/pnpm \
    && pnpm add -g prisma

# Copy package files first
COPY package.json pnpm-lock.yaml ./

# Copy other files
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["pnpm", "start"]