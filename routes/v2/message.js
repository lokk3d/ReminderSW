const router = require("express").Router();
let Message = require("../../models/message.model");

const { check, validationResult } = require('express-validator');

require("dotenv").config();


router.route("/").get((req, res) => {
   const username = req.decoded.user;

   Message.find({professional: username}).populate("client")
      .then(message => {
         res.status(200).json(message)
      })
      .catch(err => res.status(404).json("Error" + err));
});





router.route("/add").post([
   check("client").not().isEmpty(),
   check("meeting").not().isEmpty(),

   check("description").not().isEmpty(),
   check("date").not().isEmpty()

],
   (req, res) => {

      const username = req.decoded.user;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const pendingStatusCode = 200

      if(typeof req.body.contacts ==="undefined" ){
         req.body.contacts = {}
      }

      const myContacts = {
         whatsapp: {
            active: req.body.contacts.whatsapp || false,
            sent: false,
            statusCode: pendingStatusCode
         },
         email: {
            active: req.body.contacts.email || false,
            sent: false,
            statusCode: pendingStatusCode
         },
         sms: {
            active: req.body.contacts.sms || false,
            sent: false,
            statusCode: pendingStatusCode
         },
      }
      const message = new Message({
         professional: username,
         client: req.body.client,
         meeting: req.body.meeting,

         contacts: myContacts,
         description: req.body.description,
         meeting: req.body.meeting,
         date: req.body.date,


      });

      message.save()
         .then(() => {
            res.status(200).json("New message created")
         })
         .catch(err => {
            console.log(err);
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

