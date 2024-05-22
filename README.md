# Vue.js Mock Server Project

This project demonstrates how to set up a Vue.js application with a mock server using Docker and Docker Compose.

## Prerequisites

> [!NOTE]
> Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup and Running the Project

Follow these steps to set up and run the project.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```
### 2. Build the Docker Image
```bash
docker build -t vuejs-mock-server:latest .
```
### 3. Run the Docker Container
```bash
docker-compose up -d
```

### 4. Access the Application
Open your browser and navigate to http://localhost:8080 to view the application.


### Stopping the Application
To stop the running Docker containers, use:
```bash
docker-compose down
```
### Cleaning Up
To remove the Docker image, use:
```bash
docker image ls
docker rmi [image id]
docker container ls
docker rm [container id]
```

### License
This project is licensed under the MIT License - see the LICENSE file for details.
