# Multi-stage build for portfolio website
# Stage 1: Build validation
FROM node:18-alpine AS validator
WORKDIR /app
COPY . .
# Validate HTML structure exists
RUN test -f index.html && echo "HTML validated"

# Stage 2: Production with Nginx
FROM nginx:alpine
LABEL maintainer="Usman Ali <ranausmanali5241@gmail.com>"
LABEL description="Usman Ali - Senior DevOps Engineer Portfolio"

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy portfolio files
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY *.jfif /usr/share/nginx/html/
COPY *.pdf /usr/share/nginx/html/

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/ || exit 1

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
