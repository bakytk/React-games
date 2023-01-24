import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import config from "./config.js";
import { Game, User } from "./models.js";

var mongo_db = {};
mongo_db.mongoose = mongoose;
mongo_db.url = config.url;
mongo_db.game = Game(mongoose);
mongo_db.user = User(mongoose);

export default mongo_db;
