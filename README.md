# Chatroom

Practice for React, Express, Web Socket, Firebase, and Docker.

The application can be simply starting by running the backend and frontend individually, please refer to the

### Run in Docker

#### Developping Mode

Build and launch the application for both backend and frontend by docker-compose

`docker-compose -f docker-compose.dev.yml up --build`

Launch the application for both backend and frontend by docker-compose, -d means executing in background

`docker-compose -f docker-compose.dev.yml up -d`

Stop the application for both backend and frontend by docker-compose

`docker-compose -f docker-compose.dev.yml down`

After all containers are launched, the application is available on http://localhost:8080

#### Production Mode

Build and launch the application for both backend and frontend by docker-compose

`docker-compose -f docker-compose.yml up --build`

Launch the application for both backend and frontend by docker-compose, -d means executing in background

`docker-compose -f docker-compose.yml up -d`

Stop the application for both backend and frontend by docker-compose

`docker-compose -f docker-compose.yml down`

After all containers are launched, the application is available on http://localhost:8080
