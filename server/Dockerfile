FROM node:14-alpine

ADD . /reel-game
WORKDIR /reel-game

COPY package*.json ./reel-game/
COPY nodemon.json ./reel-game/
RUN npm install

EXPOSE 15500
CMD [ "npm", "run", "dev" ]
