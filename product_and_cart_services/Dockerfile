FROM node:alpine

WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install -g pm2

COPY product_service/ ./product_service/
COPY cart_service/ ./cart_service/
COPY ecosystem.config.js ./ecosystem.config.js

RUN  npm --prefix product_service ci
RUN  npm --prefix cart_service ci

# Expose ports for both services
EXPOSE 3001 3002

# Use PM2 to start both servers
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
