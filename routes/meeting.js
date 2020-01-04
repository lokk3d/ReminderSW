const router = require("express").Router();
let Meeting = require("../models/meeting.model");
let Client = require("../models/client.model");
const mongoose = require("mongoose")

require("dotenv").config();

/*
Retrive all the meetings of the logged in user
*/
router.route("/").get((req, res) => {
   const username = req.decoded.user;

   Meeting.find({ professional: username })
      .then(meetings => {
         res.status(200).json(meetings)
      })
      .catch(err => res.status(401).json("Error" + err));
});


/*
Retrive the meeting by its ID
*/
router.route("/getbyid").post((req, res) => {
   const username = req.decoded.user;

   Meeting.findOne({ _id: req.body.id })
      .then(meeting => {
         res.status(200).json(meeting)
      })
      .catch(err => res.status(404).json("Error" + err));
});

/*
Retrive all the meetings of one client matched with the professional
*/
router.route("/getMeetingsByClient").post((req, res) => {
   const username = req.decoded.user;

   Meeting.find({ professional:username, client:req.body.client })
      .then(meeting => {
         res.status(200).json(meeting)
      })
      .catch(err => res.status(404).json("Error" + err));
});



/*
Add meeting
*/
router.route("/add").post((req, res) => {
   const username = req.decoded.user;

   var _id = new mongoose.mongo.ObjectId();
   const professional = username;
   const client = req.body.client;
   const meetingDate = req.body.meetingDate;
   const description = req.body.description
   const reminder = req.body.reminder
   const reminderText = req.body.reminderText
   const reminderDate = req.body.reminderDate
   const sendTo = req.body.sendTo;

   const newMeeting = new Meeting(
      { _id,professional, client, meetingDate, description,
      reminder, reminderText, reminderDate, sendTo });
      
   newMeeting.save()
      .then(() => {
         Client.findOne({ _id: client })
            .then(client => {
               client.meetings.push(_id)
               client.save()
               res.status(200).json("New meeting created")
            })
            .catch(err => res.status(401).json("Error" + err));
      })
      .catch(err => {
         if (err.code == 11000) {
            res.status(400).json("Error" + err)
         }
         console.log(err)
         res.status(401).json("Error" + err);
      });

});

/*
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


*/


module.exports = router;

