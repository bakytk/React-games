import { userControllers } from "./user";

export const controllers = {
  fallback: (req, res) => {
    return res.status(401).json({ message: "Invalid endpoint or method" });
  },

  ping: (req, res) => {
    return res.status(200).json({ message: "Pong!" });
  },

  signup: (req, res) => userControllers.signup(req, res),
  signin: (req, res) => userControllers.signin(req, res),
  allUsers: (req, res) => userControllers.allUsers(req, res)

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
