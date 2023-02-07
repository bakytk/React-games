## Reel games

#### Backend (complete)

- Express-based server, supporting the following endpoints:

1.  `/login`[POST]: sign-up, expecting `username` and `password` both mandatory
1.  `/user` [POST]: `username`, `password`, `country` fields are mandatory, `firstName` and `lastName` nullable, but not undefined
After `login` Bearer JWT-token will be issued, and required for endpoints:
1.  `/games` [GET]: to fetch list of games in JSON format
1.  `/deposit` [POST]: insert "coin" into slot machine, default value: 20
1.  `/spin` [POST]: spin the reels, returning reward, with following logic:

###### Instructions for reel machine reward

```
# slot machines only consider pairs a match if they are in order from left to right:
● Apple, Cherry, Apple - no win
● Apple, Apple, Cherry - win

Rewards
● 3 cherries in a row: 50 coins, 2 cherries in a row: 40 coins
● 3 Apples in a row: 20 coins, 2 Apples in a row: 10 coins
● 3 Bananas in a row: 15 coins, 2 Bananas in a row: 5 coins
● 3 lemons in a row: 3 coins
```

###### Database

1. `sequlize` is used to create (initiate) tables, schema is left as default `public`
1. For seeding data with `games.json` and inserting custom users, `db/seed/index.ts` is used
1. For deployment, `fly.io` service is used, as it has free support for `postgres` database

Use the following commands to run and deploy:

```
cd server

# local development with docker-hosted postgres
docker-compose run --build

#deploy
fly auth signup
fly launch

# provided with following url: https://reels.fly.dev
```

To check the work of backend from POSTMAN, consult `postman` with json-file of a collection with requests

#### Front-end

The web app was built with Vue.js SPA

1. On the front-end, `/login-register` are available to register and get JWT-token, and stored in-memory
1. On the protected page, `/dashboard`, a user can:
    1.  see a list of games from backend as per `games.json` file
    1.  With `deposit` button, a user can `20` coins to his balance
    1.  While `spin` button, wheels the reels on the backend, returing reward outcome & debiting balance by `1` coin
    1.  `search` for a game with dynamic list - not implemented

To deploy, `netlify` service was used as follows:

```
cd client 

# development
npm run serve
npm run build

# deploy
netlify login
netlify init

netlify deploy --build
# provided with following link: https://reels-game.netlify.app/
```
