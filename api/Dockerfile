# pull official base image
FROM node:14.4.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install --silent

# add app
COPY . .

ARG PG_USER
ARG PG_HOST
ARG PG_DATABASE
ARG PG_PASSWORD
ARG PG_PORT

ENV PG_USER $PG_USER
ENV PG_HOST $PG_HOST
ENV PG_DATABASE $PG_DATABASE
ENV PG_PASSWORD $PG_PASSWORD
ENV PG_PORT $PG_PORT

# start app
EXPOSE 3000
ENTRYPOINT npx sequelize db:migrate && npm run test && node src/index.js
