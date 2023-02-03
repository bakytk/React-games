"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var JWT_SECRET = process.env.JWT_SECRET;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router = express_1["default"].Router();
var body_parser_1 = __importDefault(require("body-parser"));
router.use(body_parser_1["default"].urlencoded({ extended: false }));
router.use(body_parser_1["default"].json());
router.use((0, cors_1["default"])());
var index_js_1 = require("./controllers/index.js");
var auth_js_1 = require("./auth.js");
if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET token");
}
var confirmToken = (0, auth_js_1.authenticate)(JWT_SECRET);
//router.post("/auth", authenticate);
router.get("/alive", index_js_1.controllers.ping);
// router.post("/user", controllers.signup);
// router.post("/login", controllers.signin);
// router.get("/games", controllers.getGames);
// router.post("/deposit", confirmToken, controllers.deposit);
// router.post("/spin", confirmToken, controllers.spin);
router.all("/*", index_js_1.controllers.fallback);
router.use(function (error, _, res, __) {
    console.error("Processing err: ".concat(error));
    return res.status(500).json({ error: "Processing error." });
});
exports["default"] = router;
//# sourceMappingURL=routes.js.map