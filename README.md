# LocalHelp Frontend Documentation

## Overview

LocalHelp frontend is a React application used by users to browse medicines, manage cart items, place orders, and view previous orders.

## Technology

- React
- JavaScript
- React Router
- Fetch API
- CSS


# Features


## 1. User Authentication

Users can login using username and password.

After successful login:

- JWT token is stored in browser localStorage
- JWT token is attached with secured API requests
- User session is maintained until logout


Stored data:

```
token
username
role
```


API:

```
POST /auth/login
```


Request:

```json
{
  "username": "user",
  "password": "password"
}
```


Response:

```json
{
  "username": "user",
  "role": "USER",
  "token": "JWT_TOKEN"
}
```


---

# 2. Medicine Listing

Users can view available medicines with:

- Medicine name
- Price
- Available stock


API:

```
GET /medicines
```


Response Example:

```json
[
  {
    "id":1,
    "name":"Paracetamol",
    "price":20,
    "stock":50
  }
]
```


---

# 3. Cart Management

Users can:

- Add medicine to cart
- Increase quantity
- Decrease quantity
- Remove medicine from cart


Cart data contains:

```
medicineId
medicineName
price
quantity
```


Cart management is handled using React Context.


---

# 4. Place Order

When user confirms the cart, frontend sends order details to backend.


API:

```
POST /orders
```


Headers:

```
Authorization: Bearer JWT_TOKEN
```


Request:

```json
{
  "items":[
    {
      "medicineId":2,
      "quantity":2
    }
  ]
}
```


Response:

```json
{
  "orderId":9,
  "totalAmount":70,
  "message":"ORDER PLACED SUCCESSFULLY"
}
```


---

# 5. Order History

Users can view their previous orders.


API:

```
GET /orders/my-orders
```


Headers:

```
Authorization: Bearer JWT_TOKEN
```


Response:

```json
[
  {
    "orderId":9,
    "totalAmount":70,
    "items":[
      {
        "medicineName":"Dolo 650",
        "quantity":2,
        "price":35
      }
    ]
  }
]
```


---

# Frontend Pages


```
Login
 |
Home
 |
Medicine List
 |
Cart
 |
Checkout
 |
My Orders
```


---

# API Communication Flow


```
React Frontend

      |
      |
      | HTTP Request + JWT Token

      v

Spring Boot Backend

      |
      |
      v

JSON Response

      |
      |
      v

React UI Update
```


---

# Current Completed Features

- User login
- JWT token handling
- Medicine listing
- Cart management
- Order placement
- Order history display
