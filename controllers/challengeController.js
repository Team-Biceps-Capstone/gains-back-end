const { mongo } = require("mongoose");
const Challenge = require("../models/challengeModel");

const createChallenge = async (req, res) => {
  const { name, description, tags, challenge, goals, image, badge, createdBy, favoritedBy } = req.body;
  try {
    const challengeObj = await Challenge.createChallenge(
      name,
      description,
      tags,
      challenge,
      goals,
      image,
      0,
      badge,
      createdBy,
      favoritedBy
    );
    res.status(200).json({
      _id: challengeObj.id,
      name: challengeObj.name,
      description: challengeObj.description,
      tags: challengeObj.tags,
      challenge: challengeObj.challenge,
      goals: challengeObj.goals,
      image: challengeObj.image,
      badge: challengeObj.badge,
      createdBy: challengeObj.createdBy,
      favoritedBy: challengeObj.favoritedBy
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get all challenges
const getDisplayChallenges = async (req, res) => {
  try {
    const displayChallenges = await Challenge.getDisplayChallenges();
    res.status(200).send(displayChallenges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//Get users created challenges
const getMyChallenges = async (req, res) => {
  try {
    console.log(req.params.id)
    const myChallenges = await Challenge.getMyChallenges(req.params.id);
    res.status(200).send(myChallenges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateFavorite = async (req, res) => {
  try {
    //challenge id
    const myFavorite = await Challenge.findById(req.params.id);
    console.log("hi", req.params.userid )

    if (myFavorite.favoritedBy.includes(req.params.userid)){
      res.status(200).send("User has already favorited");
    } else {
    //save user to challnge
    const myFavUpdate2 = await Challenge.findByIdAndUpdate(req.params.id, {favoritedBy: req.params.userid})

    //update the favorites by one on the challenge
    const myFavUpdate = await Challenge.findByIdAndUpdate(req.params.id, {favorites: myFavorite.favorites+1})

    res.status(200).send(myFavUpdate);
    }
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUnfavorite = async (req, res) => {
  try {
    //challenge id
    const myUnfavorite = await Challenge.findById(req.params.id);
    
    if (myUnfavorite.favoritedBy.includes(req.params.userid)){
      console.log("in here")
     
      //remove userid from the favoritedby property of the challenge and save changes
      myUnfavorite.favoritedBy.remove(req.params.userid)
      myUnfavorite.save()
     
      //update the favorites by one on the challenge
      const myUnfavUpdate = await Challenge.findByIdAndUpdate(req.params.id, {favorites: myUnfavorite.favorites-1})
      
      res.status(200).send(myUnfavUpdate);
    } else {
      res.status(200).send("User has already unfavorited");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { createChallenge, getDisplayChallenges, getMyChallenges, updateFavorite, updateUnfavorite };
