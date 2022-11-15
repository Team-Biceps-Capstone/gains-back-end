//CITATION YOUTUBE TUTORIAL: THE NET NINJA, "MERN Authentiation Tuturial", 2022
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Challenge = require("../models/challengeModel");

// Generate JWT
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: createToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const {
    name,
    email,
    password,
    city,
    state,
    zip,
    favorites,
    inProgress,
    completed,
    badges,
  } = req.body;
  try {
    const user = await User.signup(
      name,
      email,
      password,
      city,
      state,
      zip,
      favorites,
      inProgress,
      completed,
      badges
    );
    // create a token
    //const token = createToken(user._id)
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      city: user.city,
      state: user.state,
      zip: user.zip,
      favorites: user.favorites,
      inProgress: user.inProgress,
      completed: user.completed,
      badges: user.badges,
      token: createToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//gets you array of inProgress challenges
const viewChallenges = async (req, res) => {
  try {
    var info = JSON.stringify(req.user);
    var info2 = JSON.parse(info);

    //displayChallenges contains array of inProgress from user
    const displayChallenges = await User.viewChallenges(info2);

    //Get all challenges from mongoDB and only push values found in user inProgress
    const displayChallenges2 = await Challenge.getUserDisplayChallenges(
      displayChallenges
    );

    res.status(200).send(displayChallenges2);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, viewChallenges };
