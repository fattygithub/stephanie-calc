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

COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80