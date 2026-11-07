# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_BASE_URL
ARG VITE_BASE_URL_MEDIA

ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_BASE_URL_MEDIA=$VITE_BASE_URL_MEDIA

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


# ---------- Runtime Stage ----------
FROM nginx:alpine

# remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# copy build
COPY --from=builder /app/dist /usr/share/nginx/html

# overwrite nginx config for SPA
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location / {\n\
        try_files $uri /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
