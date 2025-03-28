FROM --platform=linux/amd64 node:20 AS build 

WORKDIR /usr/app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]