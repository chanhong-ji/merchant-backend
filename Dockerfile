FROM --platform=linux/amd64 node:20 AS build 

WORKDIR /usr/src/my-app 

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# production code 

FROM --platform=linux/amd64 node:20 AS production

WORKDIR /usr/src/my-app

COPY --from=build usr/src/my-app/build ./build
COPY --from=build usr/src/my-app/package.json ./package.json
COPY --from=build usr/src/my-app/package-lock.json ./package-lock.json

RUN npm install --only=production

CMD ["npm", "start"]