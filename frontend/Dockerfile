# The first FROM is now a stage called build-stage
FROM node:16 AS build-stage
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm install
# RUN CI=true npm test # No test currently
RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the docker hub page
COPY --chown=node:node ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html