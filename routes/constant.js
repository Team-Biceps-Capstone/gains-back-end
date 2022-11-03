var express = require('express');
var router = express.Router();

//controller functions
const {getConstant} = require('../controllers/constantController')

router.post('/', getConstant);

module.exports = router;
