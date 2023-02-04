import { IUser, ISpin } from "../types/index";
import { model, Schema, Model } from "mongoose";

const UserSchema: Schema = new Schema<IUser>({
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
  balance: {
    type: Number,
    validate: {
      validator: function(input) {
        return typeof input === "number";
      },
      message: "Balance must be a number"
    },
    default: 0
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

const SpinSchema: Schema = new Schema<ISpin>({
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

export const User = model("User", UserSchema);
export const Spin = model("Spin", SpinSchema);
