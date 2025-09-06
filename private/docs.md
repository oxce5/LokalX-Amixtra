# API Documentation for Frontend Developers

This document describes the available API endpoints, authentication, and example payloads for interacting with the backend server.

---

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

### 6. Posts

#### a. Get All Posts

- **GET** `/posts`
- **Optional Query:** `?by_user=username`
- **Response:**
    ```json
    [
      {
        "id": 1,
        "by_user": "alice",
        "title": "Hello World",
        "content": "This is my first post.",
        "created_at": "2025-09-06T12:00:00.000Z",
        "updated_at": "2025-09-06T12:00:00.000Z",
        "edit_history": []
      },
      ...
    ]
    ```

#### b. Get Single Post

- **GET** `/posts/:id`
- **Response:**
    ```json
    {
      "id": 1,
      "by_user": "alice",
      "title": "Hello World",
      "content": "This is my first post.",
      "created_at": "2025-09-06T12:00:00.000Z",
      "updated_at": "2025-09-06T12:00:00.000Z",
      "edit_history": []
    }
    ```

#### c. Create Post

- **POST** `/posts`
- **Headers:**  
    `Authorization: Bearer <token>`
- **Body:**
    ```json
    {
      "title": "Hello World",
      "content": "This is my first post."
    }
    ```
- **Response:**
    ```json
    { "message": "Post created" }
    ```

#### d. Update Post

- **PATCH** `/posts/:id`
- **Headers:**  
    `Authorization: Bearer <token>`
- **Body:** (any fields to update)
    ```json
    {
      "title": "Updated Title",
      "content": "Updated content."
    }
    ```
- **Response:**
    ```json
    { "message": "Post updated" }
    ```

#### e. Delete Post

- **DELETE** `/posts/:id`
- **Headers:**  
    `Authorization: Bearer <token>`
- **Response:**
    ```json
    { "message": "Post deleted" }
    ```

---

## Notes

- All responses are JSON.
- All errors return `{ "error": "..." }` with appropriate HTTP status codes.
- The `edit_history` field in posts is an array of previous versions.

---

## Example JS Fetch Usage

```js
// Create a post example
fetch('http://localhost:3000/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: "Hello World",
    content: "This is my first post."
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
