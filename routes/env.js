const router = require("express").Router();
let Env = require("../models/env.model");
const mongoose = require("mongoose")
const { check, validationResult } = require('express-validator');

require("dotenv").config();



router.route("/").get((req, res) => {

   Env.find()
      .then(env => {
         res.status(200).json(env)
      })
      .catch(err => res.status(404).json("Error" + err));
});



router.route("/add").post([
   check("name").not().isEmpty(),
   check("variable").not().isEmpty(),

],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const env = new Env({ name:req.body.name, variable:req.body.variable, description:req.body.description });

      env.save()
         .then(() => {
            res.status(200).json("New client created")
         })
         .catch(err => {
            if (err.code == 11000) {
               res.status(400).json("Error" + err)
            }
            res.status(401).json("Error" + err);
         });

   });



router.route("/delete").delete([
   check("id").not().isEmpty(),

], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }

   Env.findOneAndDelete({ _id: req.body.id })
      .then(doc => {       
         res.status(200).json("Env deleted")
      })
      .catch(err => {
         res.status(401).json("Error" + err);
      });
})


module.exports = router;

