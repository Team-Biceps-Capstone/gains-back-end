const express = require("express");
const requireAuth = require("../middleware/requireAuth");

//controller functions
const {
  loginUser,
  signupUser,
  viewProgress,
  viewCompleted,
  addProgress,
  deleteProgress,
  addWOF,
  viewWOF,
  removeWOF,
  getUserBadges,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

//get the view challenges
router.get("/view", requireAuth, viewProgress);

//get the completed challenges
router.get("/completed", requireAuth, viewCompleted);

//put new progress in user's inProgress property
router.put("/:id/addProgress/:userid", addProgress);

//delete progress from user's inProgress property
router.delete("/:id/deleteProgress/:userid", deleteProgress);

//add completed challenge to wall of fame
router.put("/:id/addWOF/:userid", addWOF);

//delete challenge from wall of fame
router.delete("/:id/removeWOF/:userid", removeWOF);

//get all completed WOF challenges
router.get("/viewWOF/:userid", viewWOF);

// get all user badges
router.get("/badges/:userid", getUserBadges);

module.exports = router;
