FROM nginx:1.13.3-alpine
RUN rm -rf /usr/share/nginx/html
COPY dist/superloop-ui /app
COPY dist/default.conf /etc/nginx/conf.d/default.conf
CMD ["sh", "-c", "ln -sf /app/$PROFILE /usr/share/nginx/html && nginx -g 'daemon off;'"]
