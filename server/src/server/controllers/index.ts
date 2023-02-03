const { JWT_SECRET } = process.env;

import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import db from "../../db/index.js";
import { promises as fs } from "fs";
import { REELS, wheelReels, reelsReward } from "./reel.js";

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env");
}

db.mongoose
  .connect(
    db.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to the database2!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const User = db.user;
const Spin = db.spin;

export const controllers = {
  fallback: (req, res) => {
    return res.status(401).json({ message: "Invalid endpoint or method" });
  },

  ping: (req, res) => {
    return res.status(200).json({ message: "Pong!" });
  },

  signup: async (req, res) => {
    try {
      let { firstName, lastName, username, password } = req.body;
      //console.log("req.body", req.body);
      if (!(username && password)) {
        throw new Error("Username or password absent!");
      }
      let names = [firstName, lastName];
      for (let name of names) {
        name = name ? name : "";
      }
      let userId = uuid();
      let data = {
        username,
        password,
        userId,
        firstName,
        lastName
      };
      let user = new User({
        ...data
      });
      await user.save();
      let tokenData = {
        userId
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
  },

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
};
