import { userControllers } from "./user";
import { gameControllers } from "./game";
import { DB } from "../db/models/index";
console.log("Initializing sequelize: ", Object.keys(DB).length);

export const controllers = {
  fallback: (req, res) => {
    return res.status(401).json({ message: "Invalid endpoint or method" });
  },

  ping: (req, res) => {
    return res.status(200).json({ message: "Pong!" });
  },

  signup: (req, res) => userControllers.signup(req, res),
  signin: (req, res) => userControllers.signin(req, res),
  allUsers: (req, res) => userControllers.allUsers(req, res),

  deposit: (req, res) => gameControllers.deposit(req, res),
  spin: (req, res) => gameControllers.spin(req, res),
  allGames: (req, res) => gameControllers.allGames(req, res),
  seedGames: (req, res) => gameControllers.seedGames(req, res)

  /*
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
  }
  */
};
