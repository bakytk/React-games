export const REELS = {
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

export const wheelReels = async function(REELS) {
  let reels = [];
  for (let key of Object.keys(REELS)) {
    let randomInt = getRandomInt(REELS[key].length);
    let value = REELS[key][randomInt];
    reels.push(value);
  }
  return reels;
};

/*
  3 cherries in a row: 50 coins, 2 cherries in a row: 40 coins
  3 Apples in a row: 20 coins, 2 Apples in a row: 10 coins
  3 Bananas in a row: 15 coins, 2 Bananas in a row: 5 coins
  3 lemons in a row: 3 coins
*/

export const reelsReward = async reels => {
  let reward = 0;
  let matches = await countMatches(reels);
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
    } else if (matches.count === 2) {
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
  return reward;
};

const countMatches = async reels => {
  if (reels[0] === reels[1] && reels[1] !== reels[2]) {
    return {
      value: reels[0],
      count: 2
    };
  } else if (reels[1] === reels[2] && reels[0] !== reels[1]) {
    return {
      value: reels[1],
      count: 2
    };
  } else if (reels[0] === reels[1] && reels[1] === reels[2]) {
    return {
      value: reels[0],
      count: 3
    };
  }
  return {
    value: "",
    count: 0
  };
};
