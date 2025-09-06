# Amixtra Hackathon Backend

Backend for user authentication, profiles, content, posts, and real-time messaging using MySQL and RabbitMQ.

## Features

- **User authentication** (register/login with JWT)
- **Profile management** (view/update display name and bio)
- **User content management** (CRUD for user_content)
- **Posts endpoint** (see routes/posts.js)
- **Messaging system:**  
  - Send messages via REST API  
  - Real-time delivery via WebSocket, powered by RabbitMQ

---

## Setup

### Prerequisites

- Node.js >= 18
- MySQL
- RabbitMQ
- Nix (optional, for reproducible environment)

### Environment Setup (recommended: [devenv.sh](https://devenv.sh/))

Your `devenv.nix` will provide MySQL and RabbitMQ out of the box.

### Manual setup

1. Install dependencies:
    ```sh
    npm install
    ```
2. Create a `.env` file with (or set environment variables):
    ```
    JWT_SECRET=your-very-secret-key
    DB_HOST=127.0.0.1
    DB_USER=userManager
    DB_PASSWORD=test
    DB_NAME=appdb
    RABBIT_URL=amqp://guest:guest@localhost:5672
    RABBIT_QUEUE=user-events
    ```

---

## Running

```sh
node private/entrypoint.js
```

- REST API runs on [http://localhost:3000](http://localhost:3000)
- WebSocket server runs at `ws://localhost:3000` (see below)

---

## REST API

### Auth

- **POST /auth/register**  
  `{ username, email, password }`  
  Returns: `{ message, token }`

- **POST /auth/login**  
  `{ username, password }`  
  Returns: `{ token }`

### Profile

- **GET /profile**  
  Requires: `Authorization: Bearer <token>`
- **PATCH /profile**  
  `{ displayName?, bio? }`

### User Content

- **GET /user-content**
- **POST /user-content**
- **PATCH /user-content/:id**
- **DELETE /user-content/:id`
  (see code for payload structure, requires JWT)

### Messaging

- **POST /messages**  
  Requires: `Authorization: Bearer <token>`  
  `{ to, message }`  
  Sends a message to another user (delivered in real-time if they are connected).

---

## Real-Time Messaging

### How it works

- Messages are sent via `/messages` endpoint and published to RabbitMQ.
- WebSocket server listens on `ws://localhost:3000?token=JWT_HERE`.
- When a user is connected via WebSocket, any messages addressed to them are delivered instantly.

### Connecting from frontend or CLI

Use [websocat](https://github.com/vi/websocat) or any WebSocket client.

```sh
websocat "ws://localhost:3000?token=YOUR_JWT_TOKEN"
```

You will receive JSON messages like:
```json
{
  "type": "user-message",
  "from": "alice",
  "to": "bob",
  "message": "Hello Bob!",
  "sentAt": "2025-09-06T15:19:21.000Z"
}
```

---

## Example Usage

### 1. Register Users

```sh
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"password123"}'
```

### 2. Login

```sh
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"password123"}'
```
- Copy the `"token"` from the response.

### 3. Send a Message

```sh
curl -X POST http://localhost:3000/messages \
  -H "Authorization: Bearer ALICE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to":"bob","message":"Hello Bob!"}'
```

### 4. Receive Message

Connect as "bob" using websocat or similar:

```sh
websocat "ws://localhost:3000?token=BOB_TOKEN"
```

---

## Dev/Debug

- To see all RabbitMQ messages, run:
    ```sh
    node private/services/rabbitmq-consumer.js
    ```
- All backend logs will print to stdout.

---

## Extending

- Add more event types as needed to the messaging or RabbitMQ layers.
- You can persist messages in the database by modifying `private/routes/messages.js`.

---

## License

MIT
