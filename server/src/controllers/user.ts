const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env");
}

import jwt from "jsonwebtoken";
import { DB } from "../db/models/index";
import { DB_POOL } from "../db/config";
import { GET_USERS, INSERT_USER } from "../db/queries/index";
console.log("DB", DB, Object.keys(DB));

export const userControllers = {
  signup: async (req, res) => {
    try {
      //validate Body
      let { username, password } = req.body;
      console.log("req.body", req.body);
      if (!(username && password)) {
        throw new Error("Username or password absent!");
      }
      let data = {
        username,
        password
      };
      let query_str: string = INSERT_USER();
      console.log("query", query_str, username, password);
      let result = await DB_POOL.query(query_str, [username, password]);
      console.log("Result: ", result);
      //await user.save();
      let tokenData = {
        username
      };
      let token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "30m" });
      res.json({
        message: "Successful registration!",
        access_token: token
      });
    } catch (e) {
      console.log("signup error", e);
      res.send(`Signup error: ${e.message}`);
    }
  }

  /*
  signin: async (req, res) => {
    try {
      let { username, password } = req.body;
      if (!(username && password)) {
        throw new Error("Username or password absent!");
      }
      let user = await User.find({
        username,
        password
      });
      //console.log("user", user);
      if (!(user.length > 0)) {
        throw new Error("Username not found!");
      }
      let { password: db_password, userId } = user[0];
      if (db_password != password) {
        throw new Error("Incorrect password!");
      }
      let tokenData = {
        userId
      };
      let token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "30m" });
      res.json({
        message: "Successful authentication!",
        access_token: token
      });
    } catch (e) {
      console.log("signin error", e);
      res.send(`Signin error: ${e.message}`);
    }
  },

  getGames: async (req, res) => {
    try {
      // let { userId } = req.decode;
      // if (!userId) {
      //   throw new Error("'userId' not validated");
      // }
      let fileString = await fs.readFile("./src/db/game-data.json", "utf-8");
      const arr = JSON.parse(fileString);
      res.send(JSON.stringify(arr));
    } catch (e) {
      console.error(e);
      res.send(`loadGames error: ${e.message}`);
    }
  },

  deposit: async (req, res) => {
    try {
      let { userId } = req.decode;
      if (!userId) {
        throw new Error("'userId' not validated");
      }
      let { coin } = req.body;
      if (!coin) {
        throw new Error("'coin' value not passed");
      }
      //Get currentBalance of Deposit
      let user = await User.find({
        userId
      });
      //console.log("user", user[0]);
      if (!(user.length > 0)) {
        throw new Error("User not found!");
      }
      let { balance } = user[0];
      balance += Number(coin);
      await User.findOneAndUpdate({ userId }, { balance });
      return res.json({
        message: "Coin successfully deposited!",
        data: {
          userId,
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
      let { userId } = req.decode;
      if (!userId) {
        throw new Error("'userId' not validated");
      }

      //check currentBalance
      let user = await User.find({
        userId
      });
      if (!(user.length > 0)) {
        throw new Error("User not found!");
      }
      let { balance } = user[0];
      if (!(balance > 1)) {
        throw new Error(`Insufficient balance.`);
      }

      //log spin game into db with result
      let reels = await wheelReels(REELS);
      let reward = await reelsReward(reels);
      let spinId = uuid();
      let spin = new Spin({
        spinId,
        reels,
        reward,
        userId
      });
      await spin.save();

      //decrease balance by 1 point
      balance -= 1;
      let updateData = {
        balance
      };
      await User.findOneAndUpdate({ userId }, { ...updateData });

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
  */
};
