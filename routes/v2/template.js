const router = require("express").Router();
let Template = require("../../models/template.model");
const { check, validationResult } = require('express-validator')
require("dotenv").config();


router.route("/").get((req, res) => {
    const username = req.decoded.user;

    Template.find({professional:username})
      .then(template => {
         res.status(200).json(template)
      })
      .catch(err => res.status(404).json("Error" + err));
});


router.route("/:id").get((req, res) => {
    const username = req.decoded.user;

    Template.findOne({_id: req.params.id, professional: username })
      .then(template => {
         res.status(200).json(template)
      })
      .catch(err => res.status(404).json("Error" + err));
});



router.route("/add").post([
   check("name").not().isEmpty(), 
   check("description").not().isEmpty(), 
],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }
      const username = req.decoded.user;

      const template = new Template({ 
          name: req.body.name, 
          description: req.body.description, 
          professional: username 
        });

      template.save()
         .then(() => {
            res.status(200).json("New template created")
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

   Template.findOneAndDelete({ _id: req.body._id, professional: username })
      .then(doc => {       
         res.status(200).json("Template with id "+ req.body._id +"deleted")
      })
      .catch(err => {
         res.status(401).json("Error" + err);
      });
})



router.route("/update").post([
    check("_id").not().isEmpty(), 

    check("name").not().isEmpty(), 
    check("description").not().isEmpty(), 
    //add here your variables to validate
 ],
    (req, res) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
       }
       const username = req.decoded.user;

       Template.findOne({_id: req.body._id, professional: username })
       .then(template => {

          //Add here something to modify
          template.name = req.body.name         
          template.description = req.body.description         

          template.save()
          res.status(200).json("template with id "+ req.body._id +" correctly updated")
       })
       .catch(err => res.status(404).json("Error" + err));
    });
 

module.exports = router;

