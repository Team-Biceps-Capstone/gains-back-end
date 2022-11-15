const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const badgeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

badgeSchema.statics.getBadge = async function (name) {
  // validation: email or password filled
  if (!name) {
    throw Error("No Name Found for Badge");
  }

  // validation: email already exist check
  const badge = await this.findOne({ name });
  if (!badge) {
    throw Error("Incorrect name");
  }

  return badge;
};

module.exports = mongoose.model("Badge", badgeSchema);
