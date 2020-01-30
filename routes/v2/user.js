const router = require("express").Router();
let User = require("../../models/user.model");
const mongoose = require("mongoose")
const { check, validationResult } = require('express-validator')
require("dotenv").config();


router.route("/").get((req, res) => {
    const username = req.decoded.user;

    User.findOne({ email: username })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(404).json("Error" + err));
});

//L'add non c'è perchè la registrazione viene gestita dal modulo "register" nella cartella "auth"

router.route("/delete").delete((req, res) => {
    const username = req.decoded.user;

    User.findOneAndDelete({ email: username })
        .then(doc => {
            res.status(200).json("User with email " + username + " deleted")
        })
        .catch(err => {
            res.status(401).json("Error" + err);
        });
})



router.route("/update").post((req, res) => {
    const username = req.decoded.user;

    User.findOne({ email: username })
        .then(user => {

            //Add here something to modify
            user.firstName = req.body.firstName || user.firstName
            user.lastName = req.body.lastName || user.lastName
            user.fiscalCode = req.body.fiscalCode || user.fiscalCode
            user.avatar = req.body.avatar || user.avatar

            user.save()
            res.status(200).json("user with id " + req.body._id + " correctly updated")
        })
        .catch(err => res.status(404).json("Error" + err));
});


//TODO: Gestisci i default custom fields e i custom fields

module.exports = router;

