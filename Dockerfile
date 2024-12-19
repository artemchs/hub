FROM node:20-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

# Adjust the files and folders that should be copied to the build container
COPY src ./src
COPY public ./public
COPY next.config.js .
COPY prisma ./prisma
COPY tailwind.config.ts .
COPY tsconfig.json .
COPY tsconfig.server.json .
COPY server.ts .
COPY postcss.config.mjs .

# Environment variables must be present at build time
# Define environment variables
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

# Build Next.js based on the preferred package manager
RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm build; \
    else npm run build; \
    fi

# Step 2. Production image, copy all the files and run next
FROM base AS runner

RUN apk --no-cache add curl

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
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

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME=0.0.0.0 node server.js