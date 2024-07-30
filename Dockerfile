FROM node:20 as node

RUN mkdir /home/app

WORKDIR /home/app

RUN npm install @angular-devkit/build-angular --force
RUN npm install -g @angular/cli@13

# COPY package.json .
# COPY package-lock.json .
COPY . .

RUN npm install --force
