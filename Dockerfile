# Start with Node.js Alpine image and add required dependencies
FROM node:20-alpine AS base

# Install OpenSSL and other required dependencies
RUN apk add --no-cache openssl libc6-compat

# Create builder stage
FROM base AS builder
WORKDIR /app

# Copy package files first
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Copy Prisma schema before installing dependencies
# This is crucial because prisma generate runs during installation
COPY prisma ./prisma

# Install dependencies with improved error handling
RUN \
    if [ -f yarn.lock ]; then \
        yarn config set network-timeout 300000 && \
        yarn --frozen-lockfile && \
        yarn prisma generate; \
    elif [ -f package-lock.json ]; then \
        npm ci && \
        npx prisma generate; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable pnpm && \
        pnpm i && \
        pnpm prisma generate; \
    else \
        echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && \
        yarn install && \
        yarn prisma generate; \
    fi

# Copy the rest of the application code
COPY src ./src
COPY public ./public

# Copy configuration files
COPY next.config.js .
COPY nodemon.json .
COPY tailwind.config.ts .
COPY tsconfig.json .
COPY server.ts .
COPY tsconfig.server.json .
COPY postcss.config.mjs .

# # Define build-time environment variables
# ARG DATABASE_URL
# ENV DATABASE_URL=${DATABASE_URL}
# ARG NEXTAUTH_URL
# ENV NEXTAUTH_URL=${NEXTAUTH_URL}
# ARG AUTH_GOOGLE_ID
# ENV AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
# ARG AUTH_GOOGLE_SECRET
# ENV AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
# ARG AWS_ACCESS_KEY_ID
# ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
# ARG AWS_SECRET_ACCESS_KEY
# ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
# ARG S3_BUCKET
# ENV S3_BUCKET=${S3_BUCKET}
# ARG S3_REGION
# ENV S3_REGION=${S3_REGION}
# ARG NEXT_PUBLIC_CLOUDFRONT_HOSTNAME
# ENV NEXT_PUBLIC_CLOUDFRONT_HOSTNAME=${NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}
# ARG NEXT_PUBLIC_URL
# ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}

# Build the application
RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm build; \
    else npm run build; \
    fi

# Production stage
FROM base AS runner

WORKDIR /app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files for production
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Set permissions for the nextjs user
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# # Runtime environment variables
# ENV DATABASE_URL=${DATABASE_URL}
# ENV NEXTAUTH_URL=${NEXTAUTH_URL}
# ENV AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
# ENV AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
# ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
# ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
# ENV S3_BUCKET=${S3_BUCKET}
# ENV S3_REGION=${S3_REGION}
# ENV NEXT_PUBLIC_CLOUDFRONT_HOSTNAME=${NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}
# ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}

# Configure the application port
EXPOSE 3000
ENV PORT 3000

# Start the application
CMD ["node", "server.js"]