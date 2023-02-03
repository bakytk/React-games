"use strict";
exports.__esModule = true;
exports.User = exports.Spin = void 0;
var Spin = function (mongoose) {
    var spinSchema = mongoose.Schema({
        spinId: {
            type: String,
            required: true,
            unique: true
        },
        reels: [
            {
                type: String
            }
        ],
        reward: {
            type: Number
        },
        userId: {
            type: String,
            required: true
        }
    });
    return mongoose.model("Spin", spinSchema);
};
exports.Spin = Spin;
//add constraint that role is either "buyer" or "seller"
var User = function (mongoose) {
    var userSchema = mongoose.Schema({
        userId: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        balance: {
            type: Number,
            required: true,
            "default": 0
        }
    });
    return mongoose.model("User", userSchema);
};
exports.User = User;
//# sourceMappingURL=models.js.map