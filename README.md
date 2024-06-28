# Tech Shopping - E-commerce Platform

## Overview

Tech Shopping is a scalable e-commerce platform built using a microservices architecture. This application demonstrates
how to design and develop a high-performance, secure, and reliable online shopping platform. The project leverages a
wide range of technologies, including Node.js, Express, MongoDB Atlas, PostgreSQL (AWS RDS), Redis, Docker, Nginx,
RabbitMQ, and more.

## Features

- User management with secure authentication and authorization
- Product listings and inventory management
- Shopping cart functionality with fast access using Redis
- Order creation and management
- Secure payment processing
- Email notifications for transactions and other user activities
- HTTPS support for secure data transmission

## Services

- **User Service**: Manages user accounts, authentication, and authorization.
- **Product Service**: Handles product listings, details, and inventory.
- **Cart Service**: Manages the shopping cart functionality.
- **Order Service**: Manages order creation and order status tracking.
- **Payment Service**: Processes payments and transactions.
- **Notification Service**: Sends email notifications to users.

## Architecture

The platform uses a microservices architecture with each service running in its own Docker container. Services
communicate via RESTful APIs and RabbitMQ for asynchronous messaging. Nginx is used as a reverse proxy and load balancer
to route traffic to the appropriate services.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas, PostgreSQL (AWS RDS)
- **Cache**: Redis
- **Message Broker**: RabbitMQ
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx
- **Email Service**: Mailgun
- **Hosting**: AWS EC2

## Installation

### Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed
- MongoDB Atlas account
- AWS RDS instance for PostgreSQL
- Redis instance
- Mailgun account for email notifications

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Habeeb-MD/online-store-backend.git
   cd online-store-backend
   ```

2. **Environment Variables**

   Create a `.env` file in the root directory and configure the following environment variables:

   ```env
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   POSTGRES_DB=your_postgres_db
   POSTGRES_USER=your_postgres_user
   POSTGRES_PASSWORD=your_postgres_password
   REDIS_HOST=your_redis_host
   MAILGUN_API_KEY=your_mailgun_api_key
   MAILGUN_DOMAIN=your_mailgun_domain
   ```

3. **Build and Start Containers**

   ```bash
   docker-compose up --build
   ```

4. **Access the Application**

    - The application will be available at `http://your-ec2-public-ip`
    - API documentation and endpoints can be accessed via Postman or similar tools.

## Usage

- **User Service**: Provides endpoints for user registration, login, and profile management.
- **Product Service**: Manage products with CRUD operations.
- **Cart Service**: Add, remove, and view items in the shopping cart.
- **Order Service**: Place orders and check order status.
- **Payment Service**: Process payments securely.
- **Notification Service**: Receive email notifications for transactions and other activities.

## Nginx Configuration

The Nginx configuration file (`nginx.conf`) is set up to route traffic to the appropriate services and handle SSL
termination.

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location /auth {
        proxy_pass http://user_service:3000;
    }

    location /users {
        proxy_pass http://user_service:3000;
    }

    location /products {
        proxy_pass http://product_cart_service:3001;
    }

    location /cart {
        proxy_pass http://product_cart_service:3001;
    }

    location /orders {
        proxy_pass http://order_payment_service:3002;
    }

    location /payment {
        proxy_pass http://order_payment_service:3002;
    }

    location /notification {
        proxy_pass http://notification_service:3003;
    }
}
```
