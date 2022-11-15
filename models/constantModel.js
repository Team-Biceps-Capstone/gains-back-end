const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  items: {
    type: Array,
  },
});

constantSchema.statics.getConstant = async function (name) {
  // validation: email or password filled
  if (!name) {
    throw Error("No Name Found for Constant");
  }

  // validation: email already exist check
  const constant = await this.findOne({ name });
  if (!constant) {
    throw Error("Incorrect name");
  }

  return constant;
};

module.exports = mongoose.model("Constant", constantSchema);
