const router = require("express").Router();
let User = require("../models/user.model");
var fs = require('fs');
const { check, validationResult } = require('express-validator');

require("dotenv").config();

// req.decoded.user Returns the decoded user (by the middleware)

router.route("/getName").get((req, res) => {
   const username = req.decoded.user;
   User.findOne({ email: username })
      .then(user => {
         res.status(200).json({ firstName: user.firstName, lastName: user.lastName })
      })
      .catch(err => res.status(401).json("Error" + err));
});


router.route("/").get((req, res) => {
   const username = req.decoded.user;
   User.findOne({ email: username })
      .then(user => {
         res.status(200).json({
            email:user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            fiscalCode: user.fiscalCode,
            details: user.details,
            clients: user.clients
         })
      })
      .catch(err => res.status(401).json("Error" + err));
});


router.route("/update").post((req, res) => {
   const username = req.decoded.user;
   User.findOne({ email: username })
      .then(user => {
            user.firstName = req.body.firstName
            user.lastName = req.body.lastName
            user.fiscalCode = req.body.fiscalCode
            user.save()

         res.status(200).json("User updated...")
      })
      .catch(err => res.status(401).json("Error" + err));
});


router.route("/getClients").get((req, res) => {
   const username = req.decoded.user;
   User.findOne({ email: username })
      .then(user => {
         res.status(200).json(user.clients)
      })
      .catch(err => res.status(401).json("Error" + err));
});

router.route("/getEmailSession").get((req, res) => {
   const username = req.decoded.user;
   User.findOne({ email: username })
      .then(user => {
         res.status(200).json(user.sessions.email)
      })
      .catch(err => res.status(401).json("Error" + err));
});



// CRUD per i template degli utenti

router.route("/templates").get((req, res) => {
   const username = req.decoded.user;
   User.findOne({ email: username })
      .then(user => {
         res.status(200).json( user.templates )
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/templates/add").post([
   check("template").not().isEmpty(),
   
   ],(req, res) => {
   const username = req.decoded.user;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   User.findOne({ email: username })
      .then(user => {
         if(typeof user.templates === "undefined"){
            user.templates = []
         }
         user.templates.push(req.body.template)
         user.save()
         res.status(200).json("New template added...")
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/templates/delete").post([
   check("index").not().isEmpty(),
   
   ],(req, res) => {
   const username = req.decoded.user;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   User.findOne({ email: username })
      .then(user => {  
         user.templates.splice(req.body.index, 1);

         user.save()
         res.status(200).json("Template deleted")
      })
      .catch(err => res.status(404).json("Error" + err));
});




module.exports = router;

