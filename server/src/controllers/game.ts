import { DB_POOL } from "../db/config";
import {
  UPDATE_USER_BALANCE,
  GET_USER,
  GET_ALL_GAMES,
  GET_FAVORITE_GAMES,
  GET_ALL_USER_GAMES
} from "../db/queries/index";
import { REELS, wheelReels, reelsReward } from "./reel";
import { runSeed } from "../db/seed/index";

export const gameControllers = {
  deposit: async (req, res) => {
    try {
      let { username } = req.decode;
      if (!username) {
        throw new Error("'username' not validated");
      }
      let { coin } = req.body;
      if (!coin) {
        throw new Error("'coin' value not passed");
      }

      //getBalance
      let query_str: string = GET_USER();
      let result = await DB_POOL.query(query_str, [username]);
      if (!(result.rows.length > 0)) {
        throw new Error("Username not found!");
      }
      let { balance } = result.rows[0];

      //updateBalance
      balance += Number(coin);
      query_str = UPDATE_USER_BALANCE();
      await DB_POOL.query(query_str, [balance, username]);
      return res.json({
        message: "Coin successfully deposited!",
        data: {
          username,
          balance
        }
      });
    } catch (e) {
      console.error(e);
      res.send(`Deposit error: ${e.message}`);
    }
  },

  spin: async (req, res) => {
    try {
      let { username } = req.decode;
      if (!username) {
        throw new Error("'username' not validated");
      }

      //getBalance
      let query_str: string = GET_USER();
      let result = await DB_POOL.query(query_str, [username]);
      if (!(result.rows.length > 0)) {
        throw new Error("Username not found!");
      }
      let { balance } = result.rows[0];
      if (!(balance > 1)) {
        throw new Error(`Insufficient balance.`);
      }

      //calculateReward
      let reels = await wheelReels(REELS);
      let reward = await reelsReward(reels);

      //updateBalance: -1+reward;
      balance = balance - 1 + reward;
      query_str = UPDATE_USER_BALANCE();
      await DB_POOL.query(query_str, [balance, username]);

      return res.json({
        reels,
        reward,
        balance
      });
    } catch (e) {
      console.error("spin error", e);
      res.send(`spin error: ${e.message}`);
    }
  },

  allGames: async (req, res) => {
    try {
      let { username } = req.decode;
      if (!username) {
        throw new Error("'username' not validated");
      }
      let query_str: string = GET_ALL_GAMES();
      let result = await DB_POOL.query(query_str);
      if (!(result.rows.length > 0)) {
        throw new Error("Games not found!");
      }
      res.send(JSON.stringify({ data: result.rows }));
    } catch (e) {
      console.error(e);
      res.send(`loadGames error: ${e.message}`);
    }
  },

  seedGames: async (req, res) => {
    try {
      let { username } = req.decode;
      if (!username) {
        throw new Error("'username' not validated");
      }
      let result: string = await runSeed();
      res.send(JSON.stringify({ message: result }));
    } catch (e) {
      console.error(e);
      res.send(`seedGames error: ${e.message}`);
    }
  },

  favoriteGames: async (req, res) => {
    try {
      let { username } = req.decode;
      if (!username) {
        throw new Error("'username' not validated");
      }
      //let query = GET_ALL_USER_GAMES();
      //let result = await DB_POOL.query(query);
      //console.log("User_games", result.rows);

      let query = GET_FAVORITE_GAMES();
      let result = await DB_POOL.query(query);
      console.log("result", result);
      res.send(JSON.stringify({ data: result.rows }));
    } catch (e) {
      console.error(e);
      res.send(`seedGames error: ${e.message}`);
    }
  }
};
