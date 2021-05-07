FROM node:latest
EXPOSE 8080
WORKDIR /app
COPY package* ./
RUN npm install
COPY . .
ENTRYPOINT npm run serve