# API Documentation for Frontend Developers

This document describes the available API endpoints, authentication, and example payloads for interacting with the backend server.

## Authentication

All endpoints (except `/auth/register` and `/auth/login`) require JWT authentication.  
Include the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Register

- **POST** `/auth/register`
- **Body:**
    ```json
    {
      "username": "alice",
      "email": "alice@example.com",
      "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
      "message": "User registered",
      "token": "<jwt>"
    }
    ```

---

### 2. Login

- **POST** `/auth/login`
- **Body:**
    ```json
    {
      "username": "alice",
      "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
      "token": "<jwt>"
    }
    ```

---

### 3. Get Profile

- **GET** `/profile`
- **Headers:**  
    `Authorization: Bearer <token>`
- **Response:**
    ```json
    {
      "username": "alice",
      "email": "alice@example.com",
      "displayName": "Alice",
      "bio": "Hello world"
    }
    ```

---

### 4. Update Profile

- **PATCH** `/profile`
- **Headers:**  
    `Authorization: Bearer <token>`
- **Body:** (one or both fields)
    ```json
    {
      "displayName": "Alice",
      "bio": "I like cats"
    }
    ```
- **Response:**
    ```json
    { "message": "Profile updated" }
    ```

---

### 5. User Content

#### a. Get All Content

- **GET** `/user-content`
- **Headers:**  
    `Authorization: Bearer <token>`
- **Response:**
    ```json
    [
      {
        "id": 1,
        "username": "alice",
        "market_products": [ ... ],
        "bidding_products": [ ... ],
        "description": "...",
        "tags": [ ... ],
        "created_at": "...",
        "updated_at": "..."
      },
      ...
    ]
    ```

#### b. Create Content

- **POST** `/user-content`
- **Headers:**  
    `Authorization: Bearer <token>`
- **Body:**
    ```json
    {
      "marketProducts": [
        { "title": "Lamp", "imageUrl": "lamp.jpg", "status": "active" }
      ],
      "biddingProducts": [
        { "title": "Poster", "content": "Signed", "imageUrl": "poster.jpg", "status": "archived" }
      ],
      "description": "My first content",
      "tags": ["art", "sale"]
    }
    ```
- **Response:**
    ```json
    { "message": "Content created" }
    ```

#### c. Update Content

- **PATCH** `/user-content/:id`
- **Headers:**  
    `Authorization: Bearer <token>`
- **Body:** (any fields to update)
    ```json
    {
      "marketProducts": [ ... ],
      "biddingProducts": [ ... ],
      "description": "...",
      "tags": [ ... ]
    }
    ```
- **Response:**
    ```json
    { "message": "Content updated" }
    ```

#### d. Delete Content

- **DELETE** `/user-content/:id`
- **Headers:**  
    `Authorization: Bearer <token>`
- **Response:**
    ```json
    { "message": "Content deleted" }
    ```

---

## Notes

- All responses are JSON.
- All errors return `{ "error": "..." }` with appropriate HTTP status codes.
- The `marketProducts` and `biddingProducts` fields are arrays of objects, each with a `status` property (e.g., `"active"`, `"archived"`).

---

## Example JS Fetch Usage

```js
// Example: POST new user content
fetch('http://localhost:3000/user-content', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    marketProducts: [ { title: "Lamp", imageUrl: "lamp.jpg", status: "active" } ],
    biddingProducts: [ { title: "Poster", content: "Signed", imageUrl: "poster.jpg", status: "archived" } ],
    description: "My first content",
    tags: ["art", "sale"]
  })
});
```

---

## Troubleshooting

- If you change backend code, always restart the server (`kill` then `node private/entrypoint.js`).
- If you get a `"Database error"`, check the backend server logs for the real error.

---

## Contact

For any issues or questions, contact the backend developer.