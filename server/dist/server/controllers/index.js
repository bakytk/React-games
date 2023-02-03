"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.controllers = void 0;
var JWT_SECRET = process.env.JWT_SECRET;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var uuidv4_1 = require("uuidv4");
var index_js_1 = __importDefault(require("../../db/index.js"));
var fs_1 = require("fs");
var reel_js_1 = require("./reel.js");
if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET env");
}
index_js_1["default"].mongoose
    .connect(index_js_1["default"].url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () {
    console.log("Connected to the database2!");
})["catch"](function (err) {
    console.log("Cannot connect to the database!", err);
    process.exit();
});
var User = index_js_1["default"].user;
var Spin = index_js_1["default"].spin;
exports.controllers = {
    fallback: function (req, res) {
        return res.status(401).json({ message: "Invalid endpoint or method" });
    },
    ping: function (req, res) {
        return res.status(200).json({ message: "Pong!" });
    },
    signup: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, firstName, lastName, username, password, names, names_1, names_1_1, name_1, userId, data, user, tokenData, token, e_1;
        var e_2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, username = _a.username, password = _a.password;
                    //console.log("req.body", req.body);
                    if (!(username && password)) {
                        throw new Error("Username or password absent!");
                    }
                    names = [firstName, lastName];
                    try {
                        for (names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                            name_1 = names_1_1.value;
                            name_1 = name_1 ? name_1 : "";
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (names_1_1 && !names_1_1.done && (_b = names_1["return"])) _b.call(names_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    userId = (0, uuidv4_1.uuid)();
                    data = {
                        username: username,
                        password: password,
                        userId: userId,
                        firstName: firstName,
                        lastName: lastName
                    };
                    user = new User(__assign({}, data));
                    return [4 /*yield*/, user.save()];
                case 1:
                    _c.sent();
                    tokenData = {
                        userId: userId
                    };
                    token = jsonwebtoken_1["default"].sign(tokenData, JWT_SECRET, { expiresIn: "30m" });
                    res.json({
                        message: "Successful registration!",
                        access_token: token
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _c.sent();
                    console.log("signup error", e_1);
                    res.send("Signup error: ".concat(e_1.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    signin: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, user, _b, db_password, userId, tokenData, token, e_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _a = req.body, username = _a.username, password = _a.password;
                    if (!(username && password)) {
                        throw new Error("Username or password absent!");
                    }
                    return [4 /*yield*/, User.find({
                            username: username,
                            password: password
                        })];
                case 1:
                    user = _c.sent();
                    //console.log("user", user);
                    if (!(user.length > 0)) {
                        throw new Error("Username not found!");
                    }
                    _b = user[0], db_password = _b.password, userId = _b.userId;
                    if (db_password != password) {
                        throw new Error("Incorrect password!");
                    }
                    tokenData = {
                        userId: userId
                    };
                    token = jsonwebtoken_1["default"].sign(tokenData, JWT_SECRET, { expiresIn: "30m" });
                    res.json({
                        message: "Successful authentication!",
                        access_token: token
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _c.sent();
                    console.log("signin error", e_3);
                    res.send("Signin error: ".concat(e_3.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getGames: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var fileString, arr, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_1.promises.readFile("./src/db/game-data.json", "utf-8")];
                case 1:
                    fileString = _a.sent();
                    arr = JSON.parse(fileString);
                    res.send(JSON.stringify(arr));
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    console.error(e_4);
                    res.send("loadGames error: ".concat(e_4.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    deposit: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, coin, user, balance, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    userId = req.decode.userId;
                    if (!userId) {
                        throw new Error("'userId' not validated");
                    }
                    coin = req.body.coin;
                    if (!coin) {
                        throw new Error("'coin' value not passed");
                    }
                    return [4 /*yield*/, User.find({
                            userId: userId
                        })];
                case 1:
                    user = _a.sent();
                    //console.log("user", user[0]);
                    if (!(user.length > 0)) {
                        throw new Error("User not found!");
                    }
                    balance = user[0].balance;
                    balance += Number(coin);
                    return [4 /*yield*/, User.findOneAndUpdate({ userId: userId }, { balance: balance })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.json({
                            message: "Coin successfully deposited!",
                            data: {
                                userId: userId,
                                balance: balance
                            }
                        })];
                case 3:
                    e_5 = _a.sent();
                    console.error(e_5);
                    res.send("Deposit error: ".concat(e_5.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    spin: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, user, balance, reels, reward, spinId, spin, updateData, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    userId = req.decode.userId;
                    if (!userId) {
                        throw new Error("'userId' not validated");
                    }
                    return [4 /*yield*/, User.find({
                            userId: userId
                        })];
                case 1:
                    user = _a.sent();
                    if (!(user.length > 0)) {
                        throw new Error("User not found!");
                    }
                    balance = user[0].balance;
                    if (!(balance > 1)) {
                        throw new Error("Insufficient balance.");
                    }
                    return [4 /*yield*/, (0, reel_js_1.wheelReels)(reel_js_1.REELS)];
                case 2:
                    reels = _a.sent();
                    return [4 /*yield*/, (0, reel_js_1.reelsReward)(reels)];
                case 3:
                    reward = _a.sent();
                    spinId = (0, uuidv4_1.uuid)();
                    spin = new Spin({
                        spinId: spinId,
                        reels: reels,
                        reward: reward,
                        userId: userId
                    });
                    return [4 /*yield*/, spin.save()];
                case 4:
                    _a.sent();
                    //decrease balance by 1 point
                    balance -= 1;
                    updateData = {
                        balance: balance
                    };
                    return [4 /*yield*/, User.findOneAndUpdate({ userId: userId }, __assign({}, updateData))];
                case 5:
                    _a.sent();
                    return [2 /*return*/, res.json({
                            reels: reels,
                            reward: reward,
                            balance: balance
                        })];
                case 6:
                    e_6 = _a.sent();
                    console.error("spin error", e_6);
                    res.send("spin error: ".concat(e_6.message));
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); }
};
//# sourceMappingURL=index.js.map