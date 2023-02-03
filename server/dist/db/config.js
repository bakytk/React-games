"use strict";
exports.__esModule = true;
var _a = process.env, DB_USER = _a.DB_USER, DB_PWD = _a.DB_PWD, DB_HOST = _a.DB_HOST, DB_PORT = _a.DB_PORT, DB_NAME = _a.DB_NAME, DOCKER_ENV = _a.DOCKER_ENV, MONGODB_URI = _a.MONGODB_URI;
var CONNECTION_URL = "";
if (DOCKER_ENV) {
    CONNECTION_URL =
        "mongodb://".concat(DB_USER, ":").concat(DB_PWD, "@") +
            "".concat(DB_HOST, ":").concat(DB_PORT, "/").concat(DB_NAME, "?authSource=admin");
}
else {
    CONNECTION_URL = MONGODB_URI;
}
exports["default"] = {
    url: CONNECTION_URL
};
//# sourceMappingURL=config.js.map