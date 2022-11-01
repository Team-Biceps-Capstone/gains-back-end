const requireAuth = require('../middleware/requireAuth')
var express = require('express');
var router = express.Router();

//require auth for all workout routes
//router.use(requireAuth)

function createChallenge(name){
  let challenge = {
      "name" : name
  }
  return challenge
}

// mongo
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const challenges = 'challenges' //Collection name in MongoDb
require('dotenv').config()

/* POST Challenge listing. */
router.post('/', function(req, res) {
  // Mongo Object ID
  var name = req.body.name;
  if (name) {
      db.collection(challenges).findOne({"name": name}, (err, results) => {
          if (err) { return console.log(err) }
          console.log(results);
          // If a challenge exists then return null
          if (results !== null) { return res.send(null) }

          // register challenge
          db.collection(challenges).insertOne(createChallenge(name), (err, results) => {
              if (err) { return console.log(err) }
              console.log(results);
              res.send({ identification: { identification: results["insertedId"] } });
          });
      });
  } else {
      res.send(null);
  }
});

module.exports = router;