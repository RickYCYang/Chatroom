# Chatroom - frontend (REACT APP)

Install dependencies with `npm install`

Run with `npm start`

Launches the test runner in the interactive watch mode with `npm test`

Builds the app for production to the `build` folder with `npm run build`

Note: If the application is not launched by docker-compose, please unmark line 2 and 4, and mark line 3 and 5 in `/frontend/.env` since there is a nginx server working as a proxy server. Please refer to `/nginx/nginx.conf` or `nginx.dev.conf` for the settings.

### Run in Docker

The frontend can be launched by docker even for developping purpose. For that case, you don't need to run `npm install` and `npm start`. Just simply build the docker image and run the container.

#### Development mode

Create docker image with

`docker build -f ./dev.Dockerfile -t chatroom-frontend .`

Run docker container with

`docker run -p 4000:3001 -v "$(pwd):/usr/src/app/" --name chatroom-frontend chatroom-frontend`
The argument -v is to set docker volume to the local machine - in the other words, it connects the directory of local machine to container, and allows us to modify the code in our computer, and compile it in the container. Therefore, we don't need to install all dependencies in advance, all of them would be installed while building the docker image.

After the container launched, it is available on http://localhost:4000.

#### Production mode

Create docker image with

`docker build -f ./Dockerfile -t chatroom-frontend`

Run docker container with

`docker run -p 4000:80 --name chatroom-frontend chatroom-frontend`

After the container is launched, it is available on http://localhost:4000
