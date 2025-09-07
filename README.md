
## Running with Docker (Windows & Linux)

You can use Docker to run the backend on both Windows and Linux.  
The steps are almost identical.

### 1. Build the Docker image

Open a terminal (Windows: Command Prompt or PowerShell, Linux: Terminal) and run:

```sh
docker build -t localx .
```

### 2. Run the Container

#### Expose required ports:

- 3000 (Express/WS API)
- 5672 (RabbitMQ AMQP)
- 15672 (RabbitMQ Management UI)
- 3306 (MySQL)

#### Example command:

```sh
docker run -p 3000:3000 -p 5672:5672 -p 15672:15672 -p 3306:3306 localx
```

- On Windows, use `cmd` or PowerShell.  
- On Linux, use any shell.

#### (Optional) Set environment variables

Use `-e` flags to override secrets or DB credentials:

```sh
docker run \
  -p 3000:3000 -p 5672:5672 -p 15672:15672 -p 3306:3306 \
  -e JWT_SECRET=your-secret \
  -e DB_PASSWORD=your-db-password \
  localx
```

### 3. Access the services

- **Backend API:** http://localhost:3000
- **WebSocket:** ws://localhost:3000
- **RabbitMQ UI:** http://localhost:15672 (user/pass: guest/guest)
- **MySQL:** localhost:3306 (user/pass: userManager/quitethelongpasswordaintit, db: appdb)

---

### Notes

- On **Windows**, ensure Docker Desktop is running.
- On **Linux**, you may need `sudo` for Docker commands unless your user is in the `docker` group.
- If you want to persist MySQL/RabbitMQ data, use `-v` flags to mount volumes.
- You can add `EXPOSE` commands to your Dockerfile for documentation, but `-p` is mandatory for host access.

---

### Troubleshooting

- **Port already in use:** Change the left side of `-p <host>:<container>` (e.g., `-p 3307:3306`).
- **Environment not working?** Check logs with `docker logs <container-id>`.
- **Windows line endings:** If you get shell errors, check for CRLF issues in your Dockerfile/scripts.
