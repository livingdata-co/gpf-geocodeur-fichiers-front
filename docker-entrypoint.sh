#!/bin/sh

find /app/.next -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_API_URL#$NEXT_PUBLIC_API_URL#g"

find /app/.next -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_ROOT_URL#$NEXT_PUBLIC_ROOT_URL#g"

echo "Starting Nextjs"
exec "$@"
