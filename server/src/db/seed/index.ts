import {
  INSERT_USER,
  GET_GAME,
  INSERT_GAME,
  ADD_COL_USER_GAMES,
  GET_ALL_USERS,
  GET_ALL_GAMES,
  INSERT_USER_GAME,
  GET_ALL_USER_GAMES
} from "../queries/index";
import { DB_POOL } from "../config";
import { promises as fs } from "fs";
import { GameArray } from "./games-data";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const COUNTRIES: string[] = ["Malta", "Sweden", "Germany"];
const GAME_TYPES: string[] = ["SLOT", "NON_SLOT"];
const FAVORITE_STATUS: boolean[] = [true, false];

export async function runSeed() {
  //seed five random Users
  let k: number = 0;
  let username: string = "";
  let password: string = "";
  let country: string = "";
  let query: string = "";
  let type: string = "";

  for (let i of [1, 2, 3]) {
    k = getRandomInt(3);
    country = COUNTRIES[k];
    username = `User-${getRandomInt(1000000)}`;
    password = `Pwd-${getRandomInt(100)}`;
    query = INSERT_USER();
    await DB_POOL.query(query, [username, password, country]);
  }
  for (let game of GameArray) {
    let { id, slug, title, providerName, thumb } = game;
    let thumbUrl = "";
    if (thumb) {
      let { url } = thumb;
      if (url) {
        thumbUrl = url;
      }
    }

    //check if Game already inserted in DB
    //if not, insert
    query = GET_GAME();
    let result = await DB_POOL.query(query, [id]);
    if (result.rows.length > 0) {
      continue;
    } else {
      k = getRandomInt(2);
      type = GAME_TYPES[k];
      query = INSERT_GAME();
      result = await DB_POOL.query(query, [
        id,
        type,
        slug,
        title,
        providerName,
        thumbUrl
      ]);
    }
  }

  //add Favorite boolean col to "User_Games"
  query = ADD_COL_USER_GAMES();
  await DB_POOL.query(query);

  //get userId list, & insert into "User_Games" with random "Favorite value"
  query = GET_ALL_USERS();
  let result = await DB_POOL.query(query);
  let users = result.rows;
  let userIds = [];
  for (let user of users) {
    let { id } = user;
    userIds.push(id);
  }
  //Get GamedIds
  query = GET_ALL_GAMES();
  result = await DB_POOL.query(query);
  let games = result.rows;
  let gameIds = [];
  for (let game of games) {
    let { id } = game;
    gameIds.push(id);
  }
  //Seed "User_Game"
  for (let gameId of gameIds) {
    //randomize userId choice
    k = getRandomInt(userIds.length);
    let userId: number = userIds[k];
    //randomize Favourite bool choice
    k = getRandomInt(FAVORITE_STATUS.length);
    let isFavorite: boolean = FAVORITE_STATUS[k];
    query = INSERT_USER_GAME();
    await DB_POOL.query(query, [userId, gameId, isFavorite]);
  }

  //check userGame inserts
  query = GET_ALL_USER_GAMES();
  result = await DB_POOL.query(query);
  console.log("User_games", result.rows);
  return "Games and users seeded.";
}
