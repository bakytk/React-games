import { Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  username: string;
  password: string;
  balance: number;
  firstName: string;
  lastName: string;
}

export interface ISpin extends Document {
  spinId: string;
  reels: string[];
  reward: number;
  userId: string;
}

export interface TokenData {
  userId: string;
}
