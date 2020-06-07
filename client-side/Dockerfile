# build environment
FROM node:14.4.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci --silent
COPY . ./

ARG APIURL
ENV API_URL $APIURL

RUN npm run bundle

# TODO tests can run in docker

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
