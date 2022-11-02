var express = require('express');
var router = express.Router();

// mongo
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const constants = 'constants' //Collection name in MongoDb
require('dotenv').config()

/* GET home page. */
router.get('/:name', function(req, res, next) {
    const name = req.params.name
    if (name) {
        db.collection(constants).findOne({"name": name}, (err, results) => {
            if (err) { return console.log(err) }
            console.log(results);

            // If a name exists then return null
            if (results !== null) { return res.send(results)}

            return res.send(null)
        });
    } else {
        res.send(null);
    }
});

module.exports = router;
  