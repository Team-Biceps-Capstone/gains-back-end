const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  tags: {
    type: Array,
    required: [true, "Please add tags"],
  },
  challenge: {
    type: String,
    required: [true, "Please add a challenge"],
  },
  goals: {
    type: Array,
    required: [true, "Please add goals"],
  },
  image: {
    type: String,
    required: [true, "Please add a Image"],
  },
  favorites: {
    type: Number,
    required: [true, "Please add number of favorites"],
  },
  badge: {
    type: String,
    required: [true, "Please add a Badge"],
  },
});

challengeSchema.statics.createChallenge = async function (
  name,
  description,
  tags,
  challenge,
  goals,
  image,
  favorites,
  badge
) {
  if (
    !name ||
    !description ||
    !tags ||
    !challenge ||
    !goals ||
    !image ||
    !badge
  ) {
    throw Error("Missing Field");
  }

  // Check if name already exists
  const exist = await this.findOne({ name });
  if (exist) {
    throw Error("Name Already Exists");
  }

  const challengeObj = await this.create({
    name,
    description,
    tags,
    challenge,
    goals,
    image,
    favorites,
    badge,
  });

  return challengeObj;
};

//added by adrian to display users inProgress challenges
challengeSchema.statics.getUserDisplayChallenges = async function (userArray) {
  const filter = {};
  //you get all the challenges
  const all = await this.find(filter);

  //need to get the ones found in the user only
  let inProgressArray = [];
  let allChallengeArray = [];
  let finalArray = [];
  let challengeLength = Object.keys(all).length;
  let userLength = Object.keys(userArray).length;

  //itereate through challenge and append to allChallengeArray
  for (let i = 0; i < challengeLength; i++) {
    let challengeStr = all[i].id;
    allChallengeArray.push(challengeStr);
  }

  //if challenge found in userArray append to inProgressArray
  for (let j = 0; j < userLength; j++) {
    for (let k = 0; k < challengeLength; k++) {
      if (userArray[j] === allChallengeArray[k]) {
        inProgressArray.push(allChallengeArray[k]);
      }
    }
  }

  let inProgressArrayLength = Object.keys(inProgressArray).length;

  //get the object info
  for (let l = 0; l < inProgressArrayLength; l++) {
    for (let m = 0; m < challengeLength; m++) {
      if (all[m].id === inProgressArray[l]) {
        finalArray.push(all[m]);
      }
    }
  }

  return finalArray;
};

challengeSchema.statics.getDisplayChallenges = async function () {
  const filter = {};
  const all = await this.find(filter);
  return all;
};

module.exports = mongoose.model("Challenge", challengeSchema);
