const express = require("express");
const requireAuth = require("../middleware/requireAuth");

//controller functions
const {
  loginUser,
  signupUser,
  viewProgress,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

//get the view challenges
router.get("/view", requireAuth, viewProgress);

//get the view challenges
router.get('/view', requireAuth, viewProgress)

module.exports = router;
