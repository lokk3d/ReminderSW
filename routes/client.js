const router = require("express").Router();
let User = require("../models/user.model");
let Client = require("../models/client.model");
const mongoose = require("mongoose")

var bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

require("dotenv").config();


router.route("/").get((req, res) => {
   const username = req.decoded.user;

   User.findOne({ email: username })
      .then(user => {
         res.status(200).json(user.clients)
      })
      .catch(err => res.status(401).json("Error" + err));
});



router.route("/getbyid").post((req, res) => {
   const username = req.decoded.user;

   Client.findOne({ _id: req.body.id })
      .then(client => {
         res.status(200).json({ firstName: client.firstName, lastName: client.lastName, fiscalCode: client.fiscalCode })
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/allinfo").post((req, res) => {
   const username = req.decoded.user;

   Client.findOne({ _id: req.body.id })
      .then(client => {
         res.status(200).json(client)
      })
      .catch(err => res.status(404).json("Error" + err));
});




router.route("/add").post((req, res) => {
   const username = req.decoded.user;

   var _id = new mongoose.mongo.ObjectId();
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const fiscalCode = req.body.fiscalCode;
   const details = ""
   const meetings = []
   const defaultMessage = "*"
   const contacts = { 
      whatsapp: defaultMessage, 
      instagram: defaultMessage, 
      facebook: defaultMessage, 
      email: defaultMessage, 
      sms: defaultMessage }
   const newClient = new Client({ _id, firstName, lastName, fiscalCode, details, meetings, contacts });


   newClient.save()
      .then(() => {
         User.findOne({ email: username })
            .then(user => {
               user.clients.push(_id)
               user.save()
               res.status(200).json("New client created")
            })
            .catch(err => res.status(401).json("Error" + err));
      })
      .catch(err => {
         if (err.code == 11000) {
            res.status(400).json("Error" + err)
         }
         res.status(401).json("Error" + err);
      });

});

router.route("/contacts").post((req, res) => {
   Client.findOne({ _id: req.body.id })
      .then(client => {
         console.log(client.contacts);
         res.status(200).json(client.contacts)
      })
      .catch(err => res.status(401).json("Error" + err));

});

router.route("/deleteClient").post((req, res) => {
   const username = req.decoded.user;

   Client.findOneAndDelete({ _id: req.body.id })
      .then(client => {
         User.findOne({email: username})
            .then(user => {
               var index = user.clients.indexOf(req.body.id);
               if (index !== -1) user.clients.splice(index, 1);

               user.save()
               res.status(200).json("Client deleted")
            })
            .catch(err => {
               console.log(err);
               res.status(401).json("Error" + err)
            });
      })
      .catch(err => {
         console.log(err);
         res.status(401).json("Error" + err)
         });

});



router.route("/saveContacts").post((req, res) => {
   Client.findOne({ _id: req.body.id })
      .then(client => {
         client.contacts = req.body.contacts;
         client.save() 
         res.status(200).json("Done")
      })
      .catch(err => res.status(401).json("Error" + err));

});

router.route("/addMeeting").post((req, res) => {

});



router.route("/getMeeting").get((req, res) => {

});



router.route("/update").post((req, res) => {
   const username = req.decoded.user;
   console.log(req.body)
   Client.findOne({ _id: req.body.id })
      .then(client => {
         client.firstName = req.body.firstName
         client.lastName = req.body.lastName
         client.fiscalCode = req.body.fiscalCode
         client.save()

         res.status(200).json("Client updated...")
      })
      .catch(err => {
         console.log(err)
         res.status(401).json("Error" + err)
      });
});





module.exports = router;

