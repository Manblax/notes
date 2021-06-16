FROM node:latest

COPY package* ./

RUN npm install

WORKDIR /app

COPY . .

EXPOSE 8080