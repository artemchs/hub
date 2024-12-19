# Start with a lightweight Node.js Alpine image as our base
FROM node:20-alpine AS base

# Create a builder stage where we'll compile the application
FROM base AS builder
WORKDIR /app

# Copy package management files first to leverage Docker layer caching
# This means if dependencies haven't changed, we can use cached layers
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies using the appropriate package manager
# The script checks for different lock files to determine which to use
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

# Copy the source code and configuration files
# Note that /src contains most of our application code now
COPY src ./src
COPY prisma ./prisma
COPY public ./public

# Copy configuration files from root
COPY next.config.js .
COPY components.json .
COPY tailwind.config.ts .
COPY tsconfig.json .
COPY server.ts .
COPY tsconfig.server.json .
COPY postcss.config.mjs .

# Define build-time environment variables
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

# Build the application using the appropriate package manager
RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm build; \
    else npm run build; \
    fi

# Create the production stage with minimal dependencies
FROM base AS runner

# Install curl for container health checks
RUN apk --no-cache add curl

WORKDIR /app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy only the necessary built files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Define runtime environment variables
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

# Configure the application port
EXPOSE 3000
ENV PORT 3000

# Start the application
CMD ["node", "server.js"]