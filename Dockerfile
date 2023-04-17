FROM node:17.8-alpine3.14 as builder
WORKDIR /lectrum-auth
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn run build
EXPOSE 3000 80 6008
