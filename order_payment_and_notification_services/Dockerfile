FROM node:alpine

WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install -g pm2

COPY order_service/ ./order_service/
COPY payment_service/ ./payment_service/
COPY notification_service/ ./notification_service/
COPY ecosystem.config.js ./ecosystem.config.js

RUN  npm --prefix order_service ci
RUN  npm --prefix payment_service ci
RUN  npm --prefix notification_service ci


# Expose ports for all three services
EXPOSE 3003 3004 3005

# Use PM2 to start both servers
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
