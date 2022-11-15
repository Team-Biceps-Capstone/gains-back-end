var express = require("express");
var router = express.Router();
var cloudinary = require("cloudinary").v2;

// Change cloud name, API Key, and API Secret below

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.delete("/", (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.send("no image to be deleted");
  }
  cloudinary.uploader.destroy(id, function (err, result) {
    console.log(result);
    res.status(200).send("image deleted");
  });
});

module.exports = router;
