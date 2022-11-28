var express = require("express");
var router = express.Router();

//controller functions
const { getBadge, getBadgeInfo } = require("../controllers/badgeController");

router.post("/", getBadge);

router.get("/:name", getBadgeInfo)

module.exports = router;
