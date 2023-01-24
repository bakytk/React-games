const { JWT_SECRET } = process.env;

import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import db from "../../db/index.js";

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
const Game = db.game;

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
      console.log("req.body", req.body);
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
  }

  // startSlot: async (req, res) => {
  //   try {
  //     let { userId } = req.decode;
  //     if (!userId) {
  //       throw new Error("'userId' not validated");
  //     }
  //     let { gridSize: gridsize, walls, entrance } = req.body;
  //     if (!(userId && walls && entrance)) {
  //       throw new Error("One of required params not passed.");
  //     }
  //     let mazeId = uuid();
  //     let gridSize = gridsize.split("x").map(v => Number(v));
  //     let maze = new Maze({
  //       mazeId,
  //       gridSize,
  //       walls,
  //       entrance,
  //       ownerId: userId
  //     });
  //     //console.log("maze created: ", maze);
  //     await maze.save();
  //     return res.json({
  //       message: "Maze successfully created!",
  //       data: { mazeId }
  //     });
  //   } catch (e) {
  //     console.error("createMaze error", e);
  //     res.send(`createMaze error: ${e.message}`);
  //   }
  // }
};
