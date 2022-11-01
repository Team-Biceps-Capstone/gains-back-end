require('dotenv').config();

//Mongo Connection credentials
const CONNECTION_URI = process.env.CONNECTION_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;
const MongoClient = require('mongodb').MongoClient;
let _db;
module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(CONNECTION_URI, function (err, client) {
            _db = client.db(DATABASE_NAME);
            console.log('Connected to database: ' + DATABASE_NAME);
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    },
};