/*

//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'Documents');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
});

*/
const router = require("express").Router();
let User = require("../models/user.model");
const mongoose = require("mongoose")
const { check, validationResult } = require('express-validator');

require("dotenv").config();


router.route("/").get((req, res) => {
    const username = req.decoded.user;

    User.findOne({ _id: username })
       .then(user => {
          res.status(200).json(user.homeBg)
       })
       .catch(err => res.status(404).json("Error" + err));
 });

 router.route("/").get((req, res) => {
    const username = req.decoded.user;

    if(typeof req.body.backgroundType !== "undefined"){
        if(req.body.backgroundType === "image"){
            if()
        }else if( req.body.backgroundType === "color"){

        }
        else{
            res.status(422).json("Insalid input, set only background type as 'image' or 'color'")
        }
    }

    User.findOne({ _id: username })
       .then(user => {
          res.status(200).json(user.homeBg)
       })
       .catch(err => res.status(404).json("Error" + err));
 });


module.exports = router;

