Folder Structure for Product Service

product-service/\
├── src/\
│ ├── controllers/\
│ │ └── paymentController.js\
│ ├── models/\
│ │ └── Product.js\
│ ├── routes/\
│ │ └── paymentRoutes.js\
│ ├── config/\
│ │ └── db.js\
│ ├── app.js\
│ └── server.js\
├── .env\
├── package.json\
└── README.md

#### Product Endpoints

- `POST /products`: Create a new product.\
- `GET /products`: Retrieve all products.\
- `GET /products/:id`: Retrieve a single product by ID.\
- `PUT /products/:id`: Update a product by ID.\
- `DELETE /products/:id`: Delete a product by ID.\
- `PATCH /products/:id/inventory`: Update the inventory of a product.

#### Brand Endpoints

- `POST /brands`: Create a new brand.\
- `GET /brands`: Retrieve all brands.\
- `GET /brands/:id`: Retrieve a single brand by ID.\
- `PUT /brands/:id`: Update a brand by ID.\
- `DELETE /brands/:id`: Delete a brand by ID.

#### Product Type Endpoints

- `POST /product-types`: Create a new product type.\
- `GET /product-types`: Retrieve all product types.\
- `GET /product-types/:id`: Retrieve a single product type by ID.\
- `PUT /product-types/:id`: Update a product type by ID.\
- `DELETE /product-types/:id`: Delete a product type by ID.