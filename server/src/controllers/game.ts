import { DB_POOL } from "../db/config";
import { UPDATE_USER_BALANCE, GET_USER } from "../db/queries/index";
import { REELS, wheelReels, reelsReward } from "./reel";

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
  }
};
