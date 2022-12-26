# Chatroom - backend (EXPRESS)

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

### Run in Docker

The backend can be launched by docker even for developping purpose. For that case, you don't need to run `npm run install` and `npm run start / npm run dev`. Just simply build the docker image and run the container.

#### Development mode

Create docker image with

`docker build -f ./dev.Dockerfile -t chatroom-backend .`

Run docker container with

`docker run -p 3000:3000 -v "$(pwd):/usr/src/app/" --name chatroom-backend chatroom-backend`

The argument -v is to set docker volume to the local machine - in the other words, it connects the directory of local machine to container, and allows us to modify the code in our computer, and compile it in the container. Therefore, we don't need to install all dependencies in advance, all of them would be installed while building the docker image.

After the container launched, it is available on http://localhost:3000.

#### Production mode

Create docker image with

`docker build -t chatroom-backend .`

Run docker container with

`docker run -p 3000:3000 --name chatroom-backend chatroom-backend`

After the container is launched, it is available on http://localhost:3000
