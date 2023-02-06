import { INSERT_USER, GET_GAME, INSERT_GAME } from "../queries/index";
import { DB_POOL } from "../config";
import { promises as fs } from "fs";
import { GameArray } from "./games-data";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const COUNTRIES: string[] = ["Malta", "Sweden", "Germany"];
const GAME_TYPES: string[] = ["SLOT", "NON_SLOT"];
let RANDOM_USERS = [];

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
  return "Games and users seeded.";
}
