const router = require("express").Router();
let User = require("../models/user.model");
const { check, validationResult } = require('express-validator');
var fs = require('fs');
var path = require('path');

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
            email: user.email,
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
         res.status(200).json(user.templates)
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/templates/add").post([
   check("name").not().isEmpty(),
   check("description").not().isEmpty(),

], (req, res) => {
   const username = req.decoded.user;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   User.findOne({ email: username })
      .then(user => {
         if (typeof user.templates === "undefined") {
            user.templates = []
         }
         user.templates.push({name: req.body.name, description: req.body.description})
         user.save()
         res.status(200).json("New template added...")
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/templates/delete").post([
   check("_id").not().isEmpty(),
], (req, res) => {
   const username = req.decoded.user;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   User.findOne({ email: username })
      .then(user => {
         user.templates = user.templates.filter(item =>  item._id != req.body._id)
         user.save()
         res.status(200).json("Template deleted")
      })
      .catch(err => res.status(404).json("Error" + err));
});


// CRUD per i custom field di default per i nuovi clienti

router.route("/customFields").get((req, res) => {
   const username = req.decoded.user;
   User.findOne({ email: username })
      .then(user => {
         res.status(200).json(user.defaultCustomFields)
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/customFields/add").post([
   check("key").not().isEmpty(),
   check("value").not().isEmpty(),

], (req, res) => {
   const username = req.decoded.user;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   User.findOne({ email: username })
      .then(user => {
         if (typeof user.defaultCustomFields === "undefined") {
            user.defaultCustomFields = []
         }
         user.defaultCustomFields.push({key: req.body.key, value: req.body.value})
         user.save()
         res.status(200).json("New default custom field added...")
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/customFields/delete").delete([
   check("_id").not().isEmpty(),
], (req, res) => {
   const username = req.decoded.user;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   User.findOne({ email: username })
      .then(user => {
         user.defaultCustomFields = user.defaultCustomFields.filter(item =>  item._id != req.body._id)
         user.save()
         res.status(200).json("Default custom field deleted")
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/customFields/update").post([
   check("_id").not().isEmpty(),
   check("key").not().isEmpty(),
   check("value").not().isEmpty(),
], (req, res) => {
   const username = req.decoded.user;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   User.findOne({ email: username })
      .then(user => {
         console.log("Username trovato");
         for(let i = 0; i < user.defaultCustomFields.length; i++){
            console.log(user.defaultCustomFields[i]._id);
            if(user.defaultCustomFields[i]._id == req.body._id){
               console.log("Trovato")
               user.defaultCustomFields[i] = {_id: user.defaultCustomFields[i]._id,
                  key:req.body.key, 
                  value:req.body.value}
            }
         }

         user.save()
         res.status(200).json("Template updated")
      })
      .catch(err => res.status(404).json("Error" + err));
});



// Altra roba


router.route("/logFile").get((req, res) => {
   const username = req.decoded.user;

   let jsonPath = path.join(__dirname, "..", 'files', 'logs', username + ".log");

   fs.readFile(jsonPath, { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
         res.status(200).json(data)
      } else {
         res.status(404).json("Cannot find file")

      }
   });
});




   module.exports = router;

