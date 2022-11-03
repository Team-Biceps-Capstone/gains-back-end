var express = require('express');
var router = express.Router();

//controller functions
const {createChallenge, getDisplayChallenges} = require('../controllers/challengeController')

router.post('/', createChallenge);

router.get('/display', getDisplayChallenges);

module.exports = router;
