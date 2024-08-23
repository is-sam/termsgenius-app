FROM node:20 as node

WORKDIR /app

RUN npm install -g @angular/cli@18

COPY package*.json .
RUN npm install

COPY . .
