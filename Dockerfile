FROM node:lts as builder
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci

COPY . ./

CMD [ "npm", "start" ]