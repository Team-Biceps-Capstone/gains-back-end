const { mongo } = require("mongoose");
const Challenge = require("../models/challengeModel");

const createChallenge = async (req, res) => {
  const { name, description, tags, challenge, goals, image, badge } = req.body;
  try {
    const challengeObj = await Challenge.createChallenge(
      name,
      description,
      tags,
      challenge,
      goals,
      image,
      0,
      badge
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
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDisplayChallenges = async (req, res) => {
  try {
    const displayChallenges = await Challenge.getDisplayChallenges();
    res.status(200).send(displayChallenges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createChallenge, getDisplayChallenges };
