var express = require('express');
var router = express.Router();

function createChallengeObj(name, description, tags, challenge, goals){

  let challengeObj = {
      "name" : name,
      "description" : description,
      "tags": tags,
      "challenge": challenge,
      "goals": goals
  }
  return challengeObj
}

function parseTags(tags){
    const newTags = tags.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
    return newTags.trim().split(" ");
}

// mongo
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const challenges = 'challenges' //Collection name in MongoDb
require('dotenv').config()

/* POST Challenge listing. */
router.post('/', function(req, res) {
  // Mongo Object ID
  console.log(req.body);
  var name = req.body.name;
  var description = req.body.description;
  var challenge = req.body.challenge;
  var tags = req.body.tags;
  var goals = req.body.goals;
  if (name && description && tags && challenge && goals) {
      db.collection(challenges).findOne({"name": name}, (err, results) => {
          if (err) { return console.log(err) }
          console.log(results);
          // If a challenge exists then return null
          if (results !== null) { return res.send(null) }

          // register challenge
          db.collection(challenges).insertOne(createChallengeObj(name, description, parseTags(tags), challenge, goals), (err, results) => {
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
