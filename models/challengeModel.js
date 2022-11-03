const mongoose = require('mongoose')
const Schema = mongoose.Schema

const challengeSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    description:{
        type: String,
        required: [true, 'Please add a description']
    }, 
    tags:{
        type: Array,
        required: [true, 'Please add tags']
    }, 
    challenge:{
        type: String,
        required: [true, 'Please add a challenge']
    }, 
    goals:{
        type: Array,
        required: [true, 'Please add goals']
    }
  })

  challengeSchema.statics.createChallenge = async function(name, description, tags, challenge, goals) {
    if (!name || !description || !tags || !challenge || !goals){
        throw Error('Missing Field');
    }

    // Check if name already exists
    const exist = await this.findOne({ name })
    if (exist) {
        throw Error('Name Already Exists');
    }

    const challengeObj = await this.create({name, description, tags, challenge, goals})

    return challengeObj;
  }

  challengeSchema.statics.getDisplayChallenges = async function(){
    const filter = {};
    const all = await this.find(filter);
    return all;
  }
  

module.exports = mongoose.model('Challenge', challengeSchema)
  