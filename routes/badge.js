var express = require("express");
var router = express.Router();

//controller functions
const { getBadge } = require("../controllers/badgeController");

router.post("/", getBadge);

module.exports = router;
