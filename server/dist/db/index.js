"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1["default"].Promise = global.Promise;
var config_js_1 = __importDefault(require("./config.js"));
var models_js_1 = require("./models.js");
var mongo_db = {};
mongo_db.mongoose = mongoose_1["default"];
mongo_db.url = config_js_1["default"].url;
mongo_db.spin = (0, models_js_1.Spin)(mongoose_1["default"]);
mongo_db.user = (0, models_js_1.User)(mongoose_1["default"]);
exports["default"] = mongo_db;
//# sourceMappingURL=index.js.map