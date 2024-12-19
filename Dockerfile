FROM node:20-alpine AS base

# Install system dependencies
RUN apk add --no-cache \
    openssl \
    libc6-compat \
    python3 \
    make \
    g++ \
    curl

# Enable PNPM
RUN corepack enable pnpm

FROM base AS builder

WORKDIR /app

# Copy package files and prisma first
COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma

# Install dependencies with Prisma schema available
RUN pnpm install --frozen-lockfile

# Copy source files after install
COPY . .

# Environment setup
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ARG AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
ARG AUTH_GOOGLE_SECRET
ENV AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
ARG AWS_ACCESS_KEY_ID
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ARG AWS_SECRET_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ARG S3_BUCKET
ENV S3_BUCKET=${S3_BUCKET}
ARG S3_REGION
ENV S3_REGION=${S3_REGION}
ARG NEXT_PUBLIC_CLOUDFRONT_HOSTNAME
ENV NEXT_PUBLIC_CLOUDFRONT_HOSTNAME=${NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}
ARG NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV SKIP_ENV_VALIDATION=1

# Build application
RUN pnpm build

FROM base AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets and required files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Runtime environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
ENV AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV S3_BUCKET=${S3_BUCKET}
ENV S3_REGION=${S3_REGION}
ENV NEXT_PUBLIC_CLOUDFRONT_HOSTNAME=${NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV SKIP_ENV_VALIDATION=1

RUN pnpm add -g prisma

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]