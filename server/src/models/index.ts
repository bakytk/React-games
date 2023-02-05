import { Options, Sequelize } from "sequelize";

import User from "./user";
import Game from "./game";

import { DB_NAME, DB_USER, DB_HOST, DB_PWD } from "./config";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
  host: DB_HOST,
  dialect: "postgres"
});

// init models before associations
let models = [User, Game];
models.forEach(model => model.initialize(sequelize));

// define many-to-many relation
User.belongsToMany(Game, { through: "User_Games" });
Game.belongsToMany(User, { through: "User_Games" });

// create tables & reset with: "force: true"
sequelize.sync({ force: true });

export { sequelize as DB, User, Game };
