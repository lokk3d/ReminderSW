
const router = require("express").Router();
let User = require("../models/user.model");
const { check, validationResult } = require('express-validator');

var fs = require('fs');
const path = require("path");

require("dotenv").config();


router.route("/default").get((req, res) => {

    const dir = path.join(__dirname, "..", 'public', "bg_images", "default")

    const baseUrl = "http://localhost:5000/public/bg_images/default/"

    let files = []

    fs.readdir(dir, function (err, filenames) {
        if (err) {
            res.status(400).json("Error in reading folder")
        }
        filenames.forEach(function (filename) {
            if (filename.indexOf(".min.jpg") !== -1) {
                files.push(baseUrl + filename)
            }
        });

        res.status(200).json(files)

    });

});


router.route("/").get((req, res) => {

    const username = req.decoded.user;
    User.findOne({ email: username })
        .then(user => {

            res.status(200).json(user.homeBg)
        })
        .catch(err => res.status(401).json("Error" + err));
});



router.route("/update").post([
    check("type").not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    if (req.body.type !== "image" && req.body.type !== "color") {
        res.status(422).json("Param 'type' could only be 'image' or 'color' ");
    }

    const username = req.decoded.user;

    /*
      homeBg:{
      type: {type: String, trim: true},
      url: {type: String, trim:true},
      hexColor: {type: String, trim: true}
      }

    */

    User.findOne({ email: username })
        .then(user => {
            user.homeBg.type = req.body.type

            if (req.body.type === "color") {
                if (typeof req.body.hexColor !== "undefined") {
                    user.homeBg.hexColor = req.body.hexColor
                } else {
                    res.status(422).json("Param 'hexColor' couldn't be empty ");
                }
            }

            if (req.body.type === "image") {
                if (typeof req.body.url !== "undefined") {
                    user.homeBg.url = req.body.url
                } else {
                    res.status(422).json("Param 'url' couldn't be empty ");
                }
            }

            user.save()
            res.status(200).json("Background updated")
        })
        .catch(err => res.status(401).json("Error" + err));

});




module.exports = router;

