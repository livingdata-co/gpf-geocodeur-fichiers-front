FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN NEXT_PUBLIC_API_URL=APP_NEXT_PUBLIC_API_URL NEXT_PUBLIC_ROOT_URL=APP_NEXT_PUBLIC_ROOT_URL yarn build

ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

RUN chown -R node:node /app/.next

ENTRYPOINT ["/app/docker-entrypoint.sh"]

USER node
EXPOSE 3000

CMD ["yarn", "start"]
