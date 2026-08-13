# Vue.js Mock Server Project

This project provides a small browser demo and a Node.js mock API that can be used by other clients such as Flutter Web.

## Prerequisites

> [!NOTE]
> Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Mock API

The initial stub exposes two GET endpoints:

```text
GET /api/health
GET /api/users/1
```

Example responses:

```json
{
  "status": "ok",
  "service": "mock_server_JS"
}
```

```json
{
  "id": 1,
  "name": "Mock User",
  "email": "mock.user@example.com",
  "role": "demo"
}
```

CORS is enabled for these mock endpoints so that a separately hosted Flutter Web client can call them during development.

## Setup and Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/myon-bioinformatics/mock_server_JS.git
cd mock_server_JS
```

### 2. Build the Docker Image

```bash
docker build -t vuejs-mock-server:latest .
```

### 3. Run the Docker Container

```bash
docker-compose up -d
```

### 4. Verify the Mock API

```bash
curl http://localhost:8080/api/health
curl http://localhost:8080/api/users/1
```

Open `http://localhost:8080` in a browser to view the existing static demo.

## GitHub Actions

`.github/workflows/mock-api.yml` starts the Node.js mock server and smoke-tests both endpoints on pull requests and pushes to `main`.

This workflow verifies the stub; it does not provide a permanent public server. A separate hosting target can be added later when the Flutter client is ready to consume the API.

## Stopping the Application

```bash
docker container ls
docker stop [container id]
```

## Cleaning Up

```bash
docker image ls
docker rmi [image id]
docker container ls
docker rm [container id]
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
