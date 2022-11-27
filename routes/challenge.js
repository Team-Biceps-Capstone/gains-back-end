var express = require('express');
var router = express.Router();

//controller functions
const {createChallenge, getDisplayChallenges, getMyChallenges, updateFavorite, updateUnfavorite} = require('../controllers/challengeController')

router.post('/', createChallenge);

router.get('/display', getDisplayChallenges);

router.get('/:id/myChallenges', getMyChallenges)

router.put('/:id/favorite/:userid', updateFavorite)

router.put('/:id/unfavorite/:userid', updateUnfavorite)




module.exports = router;
