const router = require("express").Router();
let Test = require("../models/test.model");
const mongoose = require("mongoose")
const { check, validationResult } = require('express-validator')
require("dotenv").config();


router.route("/").get((req, res) => {

    Test.find()
        .then(test => {
            res.status(200).json(test)
        })
        .catch(err => res.status(404).json("Error" + err));
});


router.route("/:id").get((req, res) => {
    Test.findOne({ _id: req.params.id })
        .then(test => {
            res.status(200).json(test)
        })
        .catch(err => res.status(404).json("Error" + err));
});



router.route("/add").post([
    check("foo").not().isEmpty(),
    check("bar").not().isEmpty(),
    //add here your variables to validate
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const test = new Test({ foo: req.body.foo });

        test.save()
            .then(() => {
                res.status(200).json("New test created")
            })
            .catch(err => {
                if (err.code == 11000) {
                    res.status(400).json("Error" + err)
                }
                res.status(401).json("Error" + err);
            });
    });



router.route("/delete").delete([
    check("_id").not().isEmpty(),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    Test.findOneAndDelete({ _id: req.body._id })
        .then(doc => {
            res.status(200).json("Test with id " + req.body._id + "deleted")
        })
        .catch(err => {
            res.status(401).json("Error" + err);
        });
})



router.route("/update").post([
    check("_id").not().isEmpty(),

    check("foo").not().isEmpty(),
    check("bar").not().isEmpty(),
    //add here your variables to validate
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        Test.findOne({ _id: req.body._id })
            .then(test => {

                //Add here something to modify
                test.foo = req.body.foo

                test.save()
                res.status(200).json("testwith id " + req.body._id + " correctly updated")
            })
            .catch(err => res.status(404).json("Error" + err));
    });


module.exports = router;

