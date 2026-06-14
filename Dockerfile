# syntax=docker/dockerfile:1

# ---- Build stage -----------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Install deps with a clean, reproducible install
COPY package.json package-lock.json* ./
RUN npm ci

# Build the static site
COPY . .
RUN npm run build

# ---- Runtime stage ---------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Drop the default config in favour of ours (gzip, caching, SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ship only the compiled assets
COPY --from=build /app/dist /usr/share/nginx/html

# Lightweight healthcheck so Proxmox / Docker can see the app is live
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
