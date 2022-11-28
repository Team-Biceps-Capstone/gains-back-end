//CITATION YOUTUBE TUTORIAL: THE NET NINJA, "MERN Authentiation Tuturial", 2022
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Challenge = require("../models/challengeModel");
const Badge = require("../models/badgeModel");

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
const viewProgress = async (req, res) => {
  try {
    var info = JSON.stringify(req.user);
    var infoJson = JSON.parse(info);

    //displayChallenges contains array of inProgress from user
    const displayChallenges = await User.viewChallenges(infoJson);

    //Get all challenges from mongoDB and only push values found in user inProgress
    const displayChallengesFinal = await Challenge.getUserDisplayChallenges(
      displayChallenges
    );
    res.status(200).send(displayChallengesFinal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//gets you array of completed challenges
const viewCompleted = async (req, res) => {
  try {
    var info = JSON.stringify(req.user);
    var infoJson = JSON.parse(info);

    //displayChallenges contains array of inProgress from user
    const displayChallenges = await User.viewCompleted(infoJson);

    //Get all challenges from mongoDB and only push values found in user inProgress
    const displayChallengesFinal = await Challenge.getUserDisplayChallenges(
      displayChallenges
    );
    res.status(200).send(displayChallengesFinal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add progress to user inProgress
const addProgress = async (req, res) => {
  try {
    var userId = JSON.stringify(req.params.userid);
    var userIdJson = JSON.parse(userId);

    //displayChallenges contains array of inProgress from user
    const displayUser = await User.findById(userIdJson);

    if (displayUser.inProgress.includes(req.params.id)) {
      res.status(200).send("Challenge already in progress");
    } else {
      displayUser.inProgress.push(req.params.id);
      displayUser.save();
      res.status(200).send(displayUser.inProgress);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add progress to user inProgress
const deleteProgress = async (req, res) => {
  try {
    var userId = JSON.stringify(req.params.userid);
    var userIdJson = JSON.parse(userId);

    //displayChallenges contains array of inProgress from user
    const displayUser = await User.findById(userIdJson);

    if (displayUser.inProgress.includes(req.params.id)) {
      displayUser.inProgress.remove(req.params.id);
      displayUser.save();
      res.status(200).send(displayUser.inProgress);
    } else {
      res.status(200).send("challenge already completed");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add completed challenge to complete property for wall of fame
const addWOF = async (req, res) => {
  try {
    var userId = JSON.stringify(req.params.userid);
    var userIdJson = JSON.parse(userId);

    //displayChallenges contains array of completed from user
    const displayUser = await User.findById(userIdJson);

    if (displayUser.completed.includes(req.params.id)) {
      res.status(200).send("Challenge already completed");
    } else {
      let counter = {
        cardio: 0,
        biking: 0,
        calistheics: 0,
        gym: 0,
      };
      // Check to add badge to user
      let len = Object.keys(displayUser.completed).length;
      let HOFarray = [];

      //Get all challenges from mongoDB and only push values found in user completed array
      for (let i = 0; i < len; i++) {
        let completedChallenges = await Challenge.findById(
          displayUser.completed[i]
        );
        HOFarray.push(completedChallenges);
      }
      HOFarray.push(await Challenge.findById(req.params.id));

      HOFarray.forEach((challenge) => {
        counter[challenge.challenge]++;
      });

      for (const [key, value] of Object.entries(counter)) {
        if (value >= 10) {
          displayUser.badges.push(key);
        }
      }

      displayUser.completed.push(req.params.id);
      displayUser.save();
      res.status(200).send(displayUser.completed);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//gets you array of Hall of Fame challenges
const viewWOF = async (req, res) => {
  try {
    var info = JSON.stringify(req.params.userid);
    var infoJson = JSON.parse(info);

    //UserInfo contains user properties
    const UserInfo = await User.findById(infoJson);

    let len = Object.keys(UserInfo.completed).length;
    let HOFarray = [];

    //Get all challenges from mongoDB and only push values found in user completed array
    for (let i = 0; i < len; i++) {
      let completedChallenges = await Challenge.findById(UserInfo.completed[i]);
      HOFarray.push(completedChallenges);
    }
    res.status(200).send(HOFarray);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//remove completed challenge from complete property of wall of fame
const removeWOF = async (req, res) => {
  try {
    var userId = JSON.stringify(req.params.userid);
    var userIdJson = JSON.parse(userId);

    //displayChallenges contains array of completed from user
    const displayUser = await User.findById(userIdJson);

    if (displayUser.completed.includes(req.params.id)) {
      // Remove badge if needed
      let removedChallenge = await Challenge.findById(req.params.id);
      let len = Object.keys(displayUser.completed).length;
      let HOFarray = [];

      //Get all challenges from mongoDB and only push values found in user completed array
      for (let i = 0; i < len; i++) {
        let completedChallenges = await Challenge.findById(
          displayUser.completed[i]
        );
        HOFarray.push(completedChallenges);
      }
      const filteredArray = HOFarray.filter(
        (challenge) => challenge.challenge === removedChallenge.challenge
      );

      if (filteredArray.length === 10) {
        displayUser.badges.remove(removedChallenge.challenge);
      }

      displayUser.completed.remove(req.params.id);
      displayUser.inProgress.push(req.params.id);
      displayUser.save();
      res
        .status(200)
        .send(
          `${req.params.id} removed from completed property and added back to inProgress`
        );
    } else {
      res.status(200).send("Challenge not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//gets you array of Hall of Fame challenges
const getUserBadges = async (req, res) => {
  try {
    var info = JSON.stringify(req.params.userid);
    var infoJson = JSON.parse(info);

    //UserInfo contains user properties
    const UserInfo = await User.findById(infoJson);

    let len = Object.keys(UserInfo.badges).length;
    let badgeArray = [];

    //Get all challenges from mongoDB and only push values found in user completed array
    for (let i = 0; i < len; i++) {
      let badge = await Badge.getBadge(UserInfo.badges[i]);
      badgeArray.push(badge);
    }
    res.status(200).send(badgeArray);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  viewProgress,
  viewCompleted,
  getUserBadges,
  addProgress,
  deleteProgress,
  addWOF,
  viewWOF,
  removeWOF,
};
