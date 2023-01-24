export const Game = mongoose => {
  var gameSchema = mongoose.Schema({
    gameId: {
      type: String,
      required: true,
      unique: true
    },
    input: {
      type: Number
    },
    result: {
      type: Number
    },
    userId: {
      type: String,
      required: true
    }
  });
  return mongoose.model("Game", gameSchema);
};

//add constraint that role is either "buyer" or "seller"
export const User = mongoose => {
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
      default: 0
    }
  });
  return mongoose.model("User", userSchema);
};
