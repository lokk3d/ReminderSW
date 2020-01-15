
const router = require("express").Router();
let Code = require("../models/code.model");
const { check, validationResult } = require('express-validator');
require("dotenv").config();
const axios = require("axios")
var fs = require('fs');
var path = require('path');


/*
CRUD per la gestione dei codici di risposta e relativi messaggi
[Es. 5xxx se è un errore,
51xx se è un errore riguardo il cliente,
5101 se è un errore nella creazione del meeting con l'utente]
*/


router.route("/").get((req, res) => {

   Code.find()
      .then(codes => {
         res.status(200).json(codes)
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/errors").get((req, res) => {

   Code.find({})
      .where('code').gt(4999).lt(5999)
      .then(codes => {
         res.status(200).json(codes)
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/success").get((req, res) => {

   Code.find({})
      .where('code').gt(1999).lt(2999)
      .then(codes => {
         res.status(200).json(codes)
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/:code").get((req, res) => {
   const reqCode = parseInt(req.params.code)

   Code.findOne({ code: reqCode })
      .then(code => {
         if (code !== null) {
            res.status(200).json(code)
         } else {
            res.status(404).json("Code not found")

         }

      })
      .catch(err => res.status(404).json("Error" + err));
});


router.route("/add").post([
   check("name").not().isEmpty(),
   check("code").isNumeric()
],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      Code.find({ code: req.body.code }, function (err, docs) {
         if (docs.length) {
            res.status(401).json("Code already exists");
         } else {
            const newCode = new Code({ name: req.body.name, code: req.body.code, message: req.body.message });

            newCode.save()
               .then(() => {
                  res.status(200).json("New code created")
               })
               .catch(err => {
                  if (err.code == 11000) {
                     res.status(400).json("Error" + err)
                  }
                  res.status(401).json("Error" + err);
               });
         }
      });


   });



router.route("/delete").delete([
   check("code").isNumeric(),
], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }

   Code.findOneAndDelete({ code: req.body.code })
      .then(code => {
         res.status(200).json("Code " + req.body.code + " deleted")
      })
      .catch(err => {
         res.status(401).json("Error" + err);
      });
})

router.route("/update").put([
   check("name").not().isEmpty(),
   check("code").isNumeric(),
   check("message").not().isEmpty(),
   check("id").not().isEmpty()

],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      Code.findOne({ _id: req.body.id })
         .then(code => {
            code.name = req.body.name
            code.code = req.body.code
            code.message = req.body.message

            code.save()
               .then(() => {
                  res.status(200).json("Code " + req.body.id + " updated...")
               })
               .catch(err => {
                  res.status(401).json("Error" + err);
               });
         })
         .catch(err => {
            res.status(401).json("Error" + err);
         });

   });


router.route("/test").get((req, res) => {
   res.status(200).json("Api per i codici...")
})


router.route("/addAllCodes").post((req, res) => {

   let jsonPath = path.join(__dirname, "..",'Test API', "generateErrors.txt");


   fs.readFile(jsonPath, { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
         //console.log('received data: ' + data);
         let lines = data.split("\n");
         lines.forEach(line => {
            const code =line.split("->")[0].trim()
            const name =line.split("->")[1].trim()

            axios.post('http://localhost:5000/api/codes/add',
            {code:code, name:name},
            { headers: { authorization: "Bearer " + process.env.ADMIN_AUTH } })
              .then((res) => {
                console.log(res.data)
              })
              .catch((err) => {
                console.log("Errore")
              })

            console.log(code + " " + name)
         }); 
        
      } else {
         console.log(err);
      }
   });

})



module.exports = router;

