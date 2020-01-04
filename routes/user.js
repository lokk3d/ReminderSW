const router = require("express").Router();
let User = require("../models/user.model");

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

router.route("/setEmailSession").post((req, res) => {
   const username = req.decoded.user;
   User.findOne({ email: username })
      .then(user => {
         user.sessions.email.username = req.body.username;
         user.sessions.email.password = req.body.password;

         user.save()
         console.log("Set...")
         res.status(200).json("Email setted...")
      })
      .catch(err =>{
         console.log(err)
         res.status(401).json("Error" + err)
      });
});




module.exports = router;

