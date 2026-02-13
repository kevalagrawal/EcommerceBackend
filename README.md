# E-Commerce REST API Backend

A production-grade Node.js/Express.js REST API backend for an e-commerce platform with authentication, authorization, validation, and error handling. All data is stored in-memory using JavaScript objects.

**🌐 Live API:** https://ecommerce-backend-peach-six.vercel.app/

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Products](#products)
  - [Cart](#cart)
  - [Orders](#orders)
- [Error Handling](#error-handling)
- [Authentication & Authorization](#authentication--authorization)
- [Data Models](#data-models)

---

## ✨ Features

- ✅ **JWT Authentication** - Secure token-based authentication with 1-hour expiration
- ✅ **Password Hashing** - bcryptjs for secure password storage
- ✅ **Role-Based Access Control** - Admin and user roles with different permissions
- ✅ **In-Memory Database** - No external database required
- ✅ **Input Validation** - express-validator for comprehensive input validation
- ✅ **Error Handling** - Centralized error middleware with consistent responses
- ✅ **REST API** - Full RESTful API with meaningful HTTP status codes
- ✅ **Modular Architecture** - Clean separation of concerns (controllers, routes, middleware)
- ✅ **Product Management** - Admin can create, read, update, delete products
- ✅ **Shopping Cart** - Users can add/remove products from cart
- ✅ **Order Management** - Users can place orders with stock validation

---

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v4.18.2)
- **Authentication:** JSON Web Token (JWT)
- **Security:** bcryptjs (password hashing)
- **Validation:** express-validator
- **Environment:** dotenv
- **Language:** JavaScript (ES6+)
- **Deployment:** Vercel

---

## 📁 Project Structure

```
backend-ecommerce/
├── backend/
│   ├── config/
│   │   └── jwt.js                    # JWT token generation and verification
│   ├── controllers/
│   │   ├── user.controller.js        # User signup, login, profile
│   │   ├── product.controller.js     # Product CRUD operations
│   │   ├── cart.controller.js        # Cart management
│   │   └── order.controller.js       # Order placement and retrieval
│   ├── data/
│   │   ├── users.js                  # In-memory user storage
│   │   ├── products.js               # In-memory product storage
│   │   ├── carts.js                  # In-memory cart storage
│   │   └── orders.js                 # In-memory order storage
│   ├── middleware/
│   │   ├── auth.middleware.js        # JWT verification middleware
│   │   ├── validate.middleware.js    # Input validation rules
│   │   └── error.middleware.js       # Centralized error handling
│   ├── routes/
│   │   ├── user.routes.js            # User endpoints
│   │   ├── product.routes.js         # Product endpoints
│   │   ├── cart.routes.js            # Cart endpoints
│   │   └── order.routes.js           # Order endpoints
│   ├── utils/
│   │   └── ApiError.js               # Custom error class
│   ├── app.js                        # Express app setup
│   ├── server.js                     # Server initialization
│   ├── package.json                  # Dependencies
│   └── .env                          # Environment variables
└── README.md                         # Project documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Setup

1. **Navigate to the backend directory:**
   ```bash
   cd c:\Users\agraw\OneDrive\Desktop\Labs\FSD\backend-ecommerce\backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Server will run on:**
   ```
   http://localhost:5000
   ```

### Deployed URL

The API is also deployed on Vercel and can be accessed at:

```
https://ecommerce-backend-peach-six.vercel.app/
```

All endpoints are available at this URL as well as localhost.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=1h
NODE_ENV=development
```

**Note:** Change `JWT_SECRET` to a strong random string in production.

---

## 📚 API Documentation

### Base URL

**Local:**
```
http://localhost:5000
```

**Production (Vercel):**
```
https://ecommerce-backend-peach-six.vercel.app
```

### Response Format

**Success Response:**
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Error description"
}
```

---

## 👤 Users

### 1. Sign Up
Create a new user account.

**Endpoint:** `POST /users/signup`

**Authentication:** None

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- `name` - Required, string
- `email` - Required, valid email format
- `password` - Required, minimum 6 characters

**Response (201):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `400` - Email already registered / Validation failed
- `400` - Password must be at least 6 characters

**Example:**
```bash
curl -X POST https://ecommerce-backend-peach-six.vercel.app/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

### 2. Login
Authenticate user and receive JWT token.

**Endpoint:** `POST /users/login`

**Authentication:** None

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- `email` - Required, valid email format
- `password` - Required

**Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `401` - Invalid email or password
- `400` - Validation failed

**Example:**
```bash
curl -X POST https://ecommerce-backend-peach-six.vercel.app/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

### 3. Get Profile
Retrieve authenticated user's profile information.

**Endpoint:** `GET /users/profile`

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-02-13T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Missing authorization token / Invalid token / Unauthorized
- `401` - User not found

---

## 📦 Products

### 1. Get All Products
Retrieve all available products with pagination details.

**Endpoint:** `GET /products`

**Authentication:** None

**Query Parameters:** None

**Response (200):**
```json
{
  "status": "success",
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 999.99,
      "stock": 10,
      "createdAt": "2026-02-13T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Mouse",
      "description": "Wireless mouse",
      "price": 29.99,
      "stock": 50,
      "createdAt": "2026-02-13T10:30:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `500` - Internal server error

**Example:**
```bash
curl -X GET https://ecommerce-backend-peach-six.vercel.app/products
```

---

### 2. Get Single Product
Retrieve details of a specific product by ID.

**Endpoint:** `GET /products/:id`

**Authentication:** None

**URL Parameters:**
- `id` (required) - Product ID (integer)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "stock": 10,
    "createdAt": "2026-02-13T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid product ID format
- `404` - Product not found

---

### 3. Create Product
Add a new product to the catalog (admin only).

**Endpoint:** `POST /products`

**Authentication:** Required (Bearer Token)

**Authorization:** Admin role required

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "USB-C Cable",
  "description": "High-speed USB-C charging cable",
  "price": 19.99,
  "stock": 100
}
```

**Validation:**
- `name` - Required, string
- `description` - Required, string
- `price` - Required, number > 0
- `stock` - Required, integer ≥ 0

**Response (201):**
```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": 4,
    "name": "USB-C Cable",
    "description": "High-speed USB-C charging cable",
    "price": 19.99,
    "stock": 100,
    "createdAt": "2026-02-13T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Missing authorization token / Unauthorized
- `403` - Admin access required
- `400` - Validation failed / Price

must be > 0

---

### 4. Update Product
Modify existing product details (admin only).

**Endpoint:** `PUT /products/:id`

**Authentication:** Required (Bearer Token)

**Authorization:** Admin role required

**URL Parameters:**
- `id` (required) - Product ID (integer)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 1099.99,
  "stock": 15
}
```

**Validation:**
- `price` - Number > 0 (if provided)
- `stock` - Integer ≥ 0 (if provided)

**Response (200):**
```json
{
  "status": "success",
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Laptop",
    "description": "Updated description",
    "price": 1099.99,
    "stock": 15,
    "createdAt": "2026-02-13T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `403` - Admin access required
- `404` - Product not found
- `400` - Validation failed

---

### 5. Delete Product
Remove a product from the catalog (admin only).

**Endpoint:** `DELETE /products/:id`

**Authentication:** Required (Bearer Token)

**Authorization:** Admin role required

**URL Parameters:**
- `id` (required) - Product ID (integer)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Product deleted successfully",
  "data": {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "stock": 10,
    "createdAt": "2026-02-13T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `403` - Admin access required
- `400` - Invalid product ID
- `404` - Product not found

---

## 🛒 Cart

### 1. Get Cart
Retrieve the authenticated user's shopping cart with product details.

**Endpoint:** `GET /cart`

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "userId": 1,
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "product": {
          "id": 1,
          "name": "Laptop",
          "description": "High-performance laptop",
          "price": 999.99,
          "stock": 8,
          "createdAt": "2026-02-13T10:30:00.000Z"
        }
      }
    ]
  }
}
```

**Error Responses:**
- `401` - Missing authorization token / Unauthorized

**Example:**
```bash
curl -X GET https://ecommerce-backend-peach-six.vercel.app/cart \
  -H "Authorization: Bearer <token>"
```

---

### 2. Add to Cart
Add a product to the user's shopping cart.

**Endpoint:** `POST /cart/add`

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Validation:**
- `productId` - Required, integer
- `quantity` - Required, integer ≥ 1

**Response (200):**
```json
{
  "status": "success",
  "message": "Product added to cart",
  "data": {
    "userId": 1,
    "items": [
      {
        "productId": 1,
        "quantity": 2
      }
    ]
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `400` - Validation failed / Quantity must be at least 1
- `400` - Insufficient stock
- `404` - Product not found

**Example:**
```bash
curl -X POST https://ecommerce-backend-peach-six.vercel.app/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

---

### 3. Remove from Cart
Remove a specific product from the user's shopping cart.

**Endpoint:** `DELETE /cart/remove/:productId`

**Authentication:** Required (Bearer Token)

**URL Parameters:**
- `productId` (required) - Product ID (integer)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Product removed from cart",
  "data": {
    "userId": 1,
    "items": []
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `400` - Invalid product ID format

---

### 4. Clear Cart
Remove all items from the user's shopping cart.

**Endpoint:** `DELETE /cart`

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Cart cleared",
  "data": {
    "userId": 1,
    "items": []
  }
}
```

**Error Responses:**
- `401` - Unauthorized

---

## 📑 Orders

### 1. Place Order
Create a new order from the user's cart. Reduces product stock and clears cart.

**Endpoint:** `POST /orders`

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** Empty (uses existing cart)

**Response (201):**
```json
{
  "status": "success",
  "message": "Order placed successfully",
  "data": {
    "orderId": 1,
    "totalAmount": 1999.98,
    "status": "pending",
    "items": [
      {
        "productId": 1,
        "productName": "Laptop",
        "quantity": 2,
        "price": 999.99,
        "subtotal": 1999.98
      }
    ],
    "createdAt": "2026-02-13T11:30:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `400` - Cart is empty
- `400` - Insufficient stock for [product name]
- `404` - Product [id] not found

**Example:**
```bash
curl -X POST https://ecommerce-backend-peach-six.vercel.app/orders \
  -H "Authorization: Bearer <token>"
```

---

### 2. Get User Orders
Retrieve all orders placed by the authenticated user.

**Endpoint:** `GET /orders`

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "count": 2,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "items": [
        {
          "productId": 1,
          "productName": "Laptop",
          "quantity": 2,
          "price": 999.99,
          "subtotal": 1999.98
        }
      ],
      "totalAmount": 1999.98,
      "status": "pending",
      "createdAt": "2026-02-13T11:30:00.000Z"
    },
    {
      "id": 2,
      "userId": 1,
      "items": [
        {
          "productId": 2,
          "productName": "Mouse",
          "quantity": 1,
          "price": 29.99,
          "subtotal": 29.99
        }
      ],
      "totalAmount": 29.99,
      "status": "pending",
      "createdAt": "2026-02-13T12:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized

**Example:**
```bash
curl -X GET https://ecommerce-backend-peach-six.vercel.app/orders \
  -H "Authorization: Bearer <token>"
```

---

## ⚠️ Error Handling

The API uses a centralized error handling middleware that returns consistent error responses.

### Error Response Format
```json
{
  "status": "error",
  "message": "Error description"
}
```

### HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| `200` | OK - Request successful |
| `201` | Created - Resource created successfully |
| `400` | Bad Request - Invalid input/validation failed |
| `401` | Unauthorized - Authentication required or failed |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource not found |
| `500` | Internal Server Error - Server error |

### Common Error Messages

- `"Missing authorization token"` - No JWT token provided
- `"Invalid or expired token"` - Token is invalid or expired
- `"Validation failed: ..."` - Input validation error
- `"Email already registered"` - User exists
- `"Insufficient stock"` - Product out of stock
- `"Admin access required"` - User is not admin
- `"Product not found"` - Product doesn't exist
- `"Route not found"` - Invalid endpoint

---

## 🔐 Authentication & Authorization

### JWT Authentication

1. **Token Generation** - Generated on successful login
2. **Token Expiration** - 1 hour validity
3. **Token Format** - `Authorization: Bearer <token>`
4. **Token Verification** - Validated by `authMiddleware` on protected routes

### Protected Routes

**User Routes:**
- `GET /users/profile` - Requires authentication

**Product Routes:**
- `POST /products` - Requires admin authentication
- `PUT /products/:id` - Requires admin authentication
- `DELETE /products/:id` - Requires admin authentication

**Cart Routes:**
- `GET /cart` - Requires authentication
- `POST /cart/add` - Requires authentication
- `DELETE /cart/remove/:productId` - Requires authentication
- `DELETE /cart` - Requires authentication

**Order Routes:**
- `POST /orders` - Requires authentication
- `GET /orders` - Requires authentication

### Authorization Levels

**User Role:**
- Can view own profile
- Can view all products
- Can use shopping cart
- Can place orders
- Can view own orders

**Admin Role:**
- Can perform all user actions
- Can create products
- Can update products
- Can delete products

---

## 💾 Data Models

### User Model
```javascript
{
  id: number,
  name: string,
  email: string,
  passwordHash: string,     // Hashed password
  role: "user" | "admin",
  createdAt: Date
}
```

### Product Model
```javascript
{
  id: number,
  name: string,
  description: string,
  price: number,            // Must be > 0
  stock: number,            // Must be ≥ 0
  createdAt: Date
}
```

### Cart Model
```javascript
{
  userId: number,
  items: [
    {
      productId: number,
      quantity: number      // Must be ≥ 1
    }
  ]
}
```

### Order Model
```javascript
{
  id: number,
  userId: number,
  items: [
    {
      productId: number,
      productName: string,
      quantity: number,
      price: number,
      subtotal: number
    }
  ],
  totalAmount: number,
  status: "pending" | "shipped" | "delivered",
  createdAt: Date
}
```

---

## 📝 Quick Start Guide

### 1. Access the API Documentation
Visit the live deployment:
```
https://ecommerce-backend-peach-six.vercel.app/
```

### 2. Sign Up a New User
```bash
curl -X POST https://ecommerce-backend-peach-six.vercel.app/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Login and Get Token
```bash
curl -X POST https://ecommerce-backend-peach-six.vercel.app/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 4. View All Products
```bash
curl -X GET https://ecommerce-backend-peach-six.vercel.app/products
```

### 5. Add Product to Cart
```bash
curl -X POST https://ecommerce-backend-peach-six.vercel.app/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token_here>" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

### 6. Place an Order
```bash
curl -X POST https://ecommerce-backend-peach-six.vercel.app/orders \
  -H "Authorization: Bearer <your_token_here>"
```

---

## 🔧 Configuration Files

### jwt.js
Handles JWT token generation and verification using `jsonwebtoken` library.

### validate.middleware.js
Defines validation rules for all endpoints using `express-validator`.

### auth.middleware.js
Verifies JWT tokens and attaches user information to requests.

### error.middleware.js
Centralized error handler for all API errors.

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "jsonwebtoken": "^9.1.2",
  "bcryptjs": "^2.4.3",
  "express-validator": "^7.0.0",
  "dotenv": "^16.3.1"
}
```

---

## 🌍 Deployment

The API is deployed on **Vercel** and is accessible globally at:

```
https://ecommerce-backend-peach-six.vercel.app
```

All endpoints work exactly the same way as on localhost. Just replace the base URL in your requests.

---

## 🎯 Notes

- All data is stored in-memory; data will be lost on server restart
- For persistence in production, implement a database (MongoDB, PostgreSQL, etc.)
- JWT secret in `.env` should be changed for production use
- Add rate limiting for production use
- Implement email verification for production
- Implement password reset functionality
- Add more comprehensive logging

---

## 🔄 API Workflow Example

**Complete workflow from signup to order placement:**

```
1. User Signs Up
   POST /users/signup

2. User Logs In
   POST /users/login → Receives JWT Token

3. User Views Products
   GET /products

4. User Selects a Product
   GET /products/:id

5. User Adds to Cart
   POST /cart/add
   (requires token)

6. User Views Cart
   GET /cart
   (requires token)

7. User Places Order
   POST /orders
   (requires token)

8. User Views Orders
   GET /orders
   (requires token)
```

---

## 🤝 Testing the API

### Using Postman

1. Import the API endpoints into Postman
2. Set the base URL to `https://ecommerce-backend-peach-six.vercel.app`
3. Create a login request and save the token
4. Use the token in the Authorization header for protected routes

### Using cURL

All examples in this documentation use cURL. Replace `<token>` with your actual JWT token.

### Using Thunder Client / Insomnia

Same process as Postman - set base URL and use the token for protected routes.

---

## 📄 License

ISC

---

## 👨‍💻 Author

Created as a production-grade backend starter template for e-commerce platforms.

**Created:** February 13, 2026

---

## 📞 Support

For issues or questions regarding the API:
1. Check the documentation above
2. Review error messages carefully
3. Ensure correct request format
4. Verify authorization headers for protected routes

---