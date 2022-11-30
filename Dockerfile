# 1/3 Install dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /gpf-geocodeur

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# 2/3 Create build
FROM node:18-alpine AS builder
WORKDIR /gpf-geocodeur
COPY --from=deps /gpf-geocodeur/node_modules ./node_modules
COPY . .

RUN yarn build

# 3/3 Run application
FROM node:18-alpine AS runner
WORKDIR /gpf-geocodeur

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /gpf-geocodeur/node_modules ./node_modules
COPY --from=builder /gpf-geocodeur/package.json ./package.json
COPY --from=builder /gpf-geocodeur/server.js ./server.js

COPY --from=builder /gpf-geocodeur/public ./public
COPY --from=builder /gpf-geocodeur/next.config.js ./

COPY --from=builder --chown=nextjs:nodejs /gpf-geocodeur/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
