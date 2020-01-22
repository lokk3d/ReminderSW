const router = require("express").Router();
let User = require("../models/user.model");
let Client = require("../models/client.model");
const mongoose = require("mongoose")
const { check, validationResult } = require('express-validator');

require("dotenv").config();



router.route("/getbyid").post([
   check("id").not().isEmpty()
], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }

   Client.findOne({ _id: req.body.id })
      .then(client => {
         res.status(200).json({ firstName: client.firstName, lastName: client.lastName, fiscalCode: client.fiscalCode })
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/:id").get((req, res) => {
   Client.findOne({ _id: req.params.id })
      .then(client => {
         res.status(200).json(client)
      })
      .catch(err => res.status(404).json("Error" + err));
});


router.route("/allinfo").post([
   check("id").not().isEmpty()
],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      Client.findOne({ _id: req.body.id })
         .then(client => {
            res.status(200).json(client)
         })
         .catch(err => res.status(404).json("Error" + err));
   });




router.route("/add").post([
   check("firstName").isLength({ min: 2 }),
   check("lastName").isLength({ min: 2 }),
   check("fiscalCode").isLength({ min: 2 }),

]
   , (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }
      const username = req.decoded.user;

      var _id = new mongoose.mongo.ObjectId();
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const fiscalCode = req.body.fiscalCode;

      const newClient = new Client({ _id, firstName, lastName, fiscalCode });


      newClient.save()
         .then(() => {
            User.findOne({ email: username })
               .then(user => {
                  user.clients.push(_id)
                  user.save()
                  res.status(200).json("New env var created")
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

router.route("/contacts").post([
   check("id").not().isEmpty()

], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }

   Client.findOne({ _id: req.body.id })
      .then(client => {
         console.log(client.contacts);
         res.status(200).json(client.contacts)
      })
      .catch(err => res.status(401).json("Error" + err));

});

router.route("/deleteClient").post([
   check("id").not().isEmpty()

], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }

   const username = req.decoded.user;

   Client.findOneAndDelete({ _id: req.body.id })
      .then(client => {
         User.findOne({ email: username })
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



router.route("/saveContacts").post([
   check("id").not().isEmpty(),
   check("contacts").not().isEmpty()

], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }

   Client.findOne({ _id: req.body.id })
      .then(client => {
         client.contacts = req.body.contacts;
         client.save()
         res.status(200).json("Done")
      })
      .catch(err => res.status(401).json("Error" + err));

});



router.route("/update").post([
   check("firstName").isLength({ min: 2 }),
   check("lastName").isLength({ min: 2 }),
   check("fiscalCode").isLength({ min: 2 }),
   check("id").not().isEmpty(),

], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }

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




//*************************** CRUD CUSTOM FIELDS ***************************************** */


router.route("/customFields").post(
   [
      check("id").not().isEmpty()
   ],  (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         Client.findOne({ _id:req.body.id})
            .then(client => {
               res.status(200).json(client.customFields)
            })
            .catch(err => res.status(404).json("Error" + err));
      });



router.route("/customFields/add").post([
   check("key").not().isEmpty(),
   check("value").not().isEmpty(),
   check("id").not().isEmpty()

],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      Client.findOne({ _id: req.body.id })
      .then( client => {
         let _id = new mongoose.mongo.ObjectId();

         client.customFields = [...client.customFields, {_id:_id, key:req.body.key, value:req.body.value}]
         console.log(client.customFields)
         client.save()
         .then(() => {
            res.status(200).json("New custom fields added")
         })
         .catch(err => {
            if (err.code == 11000) {
               res.status(400).json("Error" + err)
               console.log(err)
            }
            res.status(401).json("Error" + err);
         });

      }
         
      ).catch(err => res.status(400).json("Error"))
       
   });



router.route("/customFields/delete").delete([
   check("id").not().isEmpty(),
   check("customFieldId").not().isEmpty(),

], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }

   Client.findOne({ _id: req.body.id })
      .then(client => {
         client.customFields = client.customFields.filter(value => value._id != req.body.customFieldId)
         console.log(client.customFields)
         client.save()
         res.status(200).json("Custom field deleted")
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

   let jsonPath = path.join(__dirname, "..", 'Test API', "generateErrors.txt");


   fs.readFile(jsonPath, { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
         //console.log('received data: ' + data);
         let lines = data.split("\n");
         lines.forEach(line => {
            const code = line.split("->")[0].trim()
            const name = line.split("->")[1].trim()

            axios.post('http://localhost:5000/api/codes/add',
               { code: code, name: name },
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

