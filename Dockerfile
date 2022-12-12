FROM node:14-alpine as base
EXPOSE 8080

WORKDIR /app

COPY package.json .
RUN npm install

ADD . /app

COPY . /app
RUN npm run build

CMD [ "npm", "run", "serve"]
