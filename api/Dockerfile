FROM node:latest
EXPOSE 3000
WORKDIR /app
COPY package* ./
RUN npm install
COPY . .
ENTRYPOINT npm run api