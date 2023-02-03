"use strict";
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
exports.__esModule = true;
exports.reelsReward = exports.wheelReels = exports.REELS = void 0;
exports.REELS = {
    "1": [
        "cherry",
        "lemon",
        "apple",
        "lemon",
        "banana",
        "banana",
        "lemon",
        "lemon"
    ],
    "2": [
        "lemon",
        "apple",
        "lemon",
        "lemon",
        "cherry",
        "apple",
        "banana",
        "lemon"
    ],
    "3": [
        "lemon",
        "apple",
        "lemon",
        "apple",
        "cherry",
        "lemon",
        "banana",
        "lemon"
    ]
};
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
var wheelReels = function (REELS) {
    return __awaiter(this, void 0, void 0, function () {
        var reels, _a, _b, key, randomInt, value;
        var e_1, _c;
        return __generator(this, function (_d) {
            reels = [];
            try {
                for (_a = __values(Object.keys(REELS)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    key = _b.value;
                    randomInt = getRandomInt(REELS[key].length);
                    value = REELS[key][randomInt];
                    reels.push(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return [2 /*return*/, reels];
        });
    });
};
exports.wheelReels = wheelReels;
/*
  3 cherries in a row: 50 coins, 2 cherries in a row: 40 coins
  3 Apples in a row: 20 coins, 2 Apples in a row: 10 coins
  3 Bananas in a row: 15 coins, 2 Bananas in a row: 5 coins
  3 lemons in a row: 3 coins
*/
var reelsReward = function (reels) { return __awaiter(void 0, void 0, void 0, function () {
    var reward, matches;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reward = 0;
                return [4 /*yield*/, countMatches(reels)];
            case 1:
                matches = _a.sent();
                if (matches.count) {
                    if (matches.count === 3) {
                        switch (matches.value) {
                            case "cherry":
                                reward = 50;
                                break;
                            case "apple":
                                reward = 20;
                                break;
                            case "banana":
                                reward = 15;
                                break;
                            case "lemon":
                                reward = 3;
                                break;
                            default:
                                reward = 0;
                        }
                    }
                    else if (matches.count === 2) {
                        switch (matches.value) {
                            case "cherry":
                                reward = 40;
                                break;
                            case "apple":
                                reward = 10;
                                break;
                            case "banana":
                                reward = 5;
                                break;
                            default:
                                reward = 0;
                        }
                    }
                }
                return [2 /*return*/, reward];
        }
    });
}); };
exports.reelsReward = reelsReward;
var countMatches = function (reels) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (reels[0] === reels[1] && reels[1] !== reels[2]) {
            return [2 /*return*/, {
                    value: reels[0],
                    count: 2
                }];
        }
        else if (reels[1] === reels[2] && reels[0] !== reels[1]) {
            return [2 /*return*/, {
                    value: reels[1],
                    count: 2
                }];
        }
        else if (reels[0] === reels[1] && reels[1] === reels[2]) {
            return [2 /*return*/, {
                    value: reels[0],
                    count: 3
                }];
        }
        return [2 /*return*/, {
                value: "",
                count: 0
            }];
    });
}); };
//# sourceMappingURL=reel.js.map