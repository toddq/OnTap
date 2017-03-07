FROM node:alpine

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
RUN npm run build

EXPOSE 8080

# To run production code instead, override the command with `npm start`
CMD [ "npm", "run", "dev" ]
