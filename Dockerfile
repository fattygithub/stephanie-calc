# ============================================================
# Dockerfile — Daniel Stephanie Ugbedeojo (VUG/SEN/22/7155)
# SEN 482 CI/CD Lab
# Stage 1: Lint + Test
# Stage 2: Serve static files with nginx
# ============================================================

# ── Stage 1: CI (lint + test) ────────────────────────────────
FROM node:22-alpine AS ci

WORKDIR /app

COPY package.json jest.config.js eslint.config.js ./

RUN npm install --include=dev && ls node_modules/.bin/eslint

COPY assets/ ./assets/
COPY __tests__/ ./__tests__/

RUN node_modules/.bin/eslint assets/js/calculator.js

RUN node --experimental-vm-modules node_modules/jest-cli/bin/jest.js --passWithNoTests

# ── Stage 2: Serve with nginx ────────────────────────────────
FROM nginx:alpine AS production

COPY --from=ci /app/package.json /dev/null

RUN rm -rf /usr/share/nginx/html/*

# Copy homepage
COPY index.html /usr/share/nginx/html/

# Copy calculator page under /calculator route
COPY calculator/index.html /usr/share/nginx/html/calculator/index.html

# Copy shared assets
COPY assets/ /usr/share/nginx/html/assets/

# nginx config to handle /calculator route
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
    try_files $uri $uri/ /index.html;\n\
    }\n\
    location /calculator {\n\
    try_files $uri $uri/ /calculator/index.html;\n\
    }\n\
    }\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80