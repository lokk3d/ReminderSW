const router = require("express").Router();
let Client = require("../../models/client.model");
const { check, validationResult } = require('express-validator')
require("dotenv").config();


router.route("/").get((req, res) => {
    const username = req.decoded.user;

    Client.find({professional: username})
      .then(client => {
         res.status(200).json(client)
      })
      .catch(err => res.status(404).json("Error" + err));
});


router.route("/:id").get((req, res) => {
    const professional = req.decoded.user;

    Client.findOne({_id: req.params.id, professional: professional })
      .then(client => {
         res.status(200).json(client)
      })
      .catch(err => res.status(404).json("Error" + err));
});



router.route("/add").post([
    check("firstName").isLength({ min: 2 }),
    check("lastName").isLength({ min: 2 }),
    check("fiscalCode").isLength({ min: 2 }),
],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const professional = req.decoded.user;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const fiscalCode = req.body.fiscalCode;

      const client = new Client({ professional ,firstName, lastName, fiscalCode });

      client.save()
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
   check("_id").not().isEmpty(),

], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   const username = req.decoded.user;

   Client.findOneAndDelete({ _id: req.body._id, professional: username })
      .then(doc => {       
         res.status(200).json("Client with id "+ req.body._id +"deleted")
      })
      .catch(err => {
         res.status(401).json("Error" + err);
      });
})



router.route("/update").post([
    check("_id").not().isEmpty(), 
 ],
    (req, res) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
       }
       const professional = req.decoded.user;

       Client.findOne({_id: req.body._id, professional: professional })
       .then(client => {

         client.firstName = req.body.firstName || client.firstName;
         client.lastName = req.body.lastName || client.lastName;
         client.fiscalCode = req.body.fiscalCode || client.fiscalCode;

          client.save()
          res.status(200).json("client with id "+ req.body._id +" correctly updated")
       })
       .catch(err => res.status(404).json("Error" + err));
    });
 
    //TODO: Aggiungi api modifica contatti

    router.route("/contacts").post([
      check("_id").not().isEmpty(), 
   ],
      (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }
         const professional = req.decoded.user;
  
         Client.findOne({_id: req.body._id, professional: professional })
         .then(client => {
            res.status(200).json(client.contacts)
         })
         .catch(err => res.status(404).json("Error" + err));
      });

      
router.route("/contacts/update").post([
   check("_id").not().isEmpty(), 
   check("contacts").not().isEmpty(), 

],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         console.log(errors.array())
         return res.status(422).json({ errors: errors.array() });
      }
      const professional = req.decoded.user;

      Client.findOne({_id: req.body._id, professional: professional })
      .then(client => {

         if(typeof client.contacts === "undefined"){
            client.contacts = {}
         }

        client.contacts.whatsapp = req.body.contacts.whatsapp || client.contacts.whatsapp;
        client.contacts.sms = req.body.contacts.sms || client.contacts.sms;
        client.contacts.email = req.body.contacts.email || client.contacts.email;
        client.contacts.facebook = req.body.contacts.facebook || client.contacts.facebook;
        client.contacts.instagram = req.body.contacts.instagram || client.contacts.instagram;

         client.save()
         res.status(200).json("client with id "+ req.body._id +" correctly updated")
      })
      .catch(err => res.status(404).json("Error" + err));
   });
module.exports = router;

