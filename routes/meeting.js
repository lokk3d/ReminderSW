const router = require("express").Router();
let Meeting = require("../models/meeting.model");
let Client = require("../models/client.model");
const mongoose = require("mongoose")
const moment = require('moment')

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

   Meeting.find({ professional: username, client: req.body.client })
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
   console.log(reminder)

   const newMeeting = new Meeting(
      { _id, professional, client, meetingDate, description, reminder });

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


router.route("/getTodayReminders").get((req, res) => {
   const username = req.decoded.user;
   const today = moment().startOf('day')

   const filter = {
      'reminder.date': {
         $gte: today.toDate(),
         $lte: moment(today).endOf('day').toDate()
      },
      'reminder.executed': false
   }

   Meeting.find(filter)
      .then(meetings => {
         res.status(200).json(meetings)
      })
      .catch(err => {
         res.status(400).json(err)
      })

});

//TODO: aggiungere il check dell'id
router.route("/delete").post((req, res) => {
   const username = req.decoded.user;
   
   console.log(req.body.id);
   console.log(req.body.client);

   Meeting.findOneAndDelete({_id: req.body.id})
      .then(meetings => {
         Client.findOne({ _id: req.body.client })
         .then(client => {
            var index = client.meetings.indexOf(req.body.id);
            if (index !== -1) client.meetings.splice(index, 1);

            client.save()
            res.status(200).json("Meeting deleted")
         })
         .catch(err => {
            console.log(err);
            res.status(401).json("Error" + err)
         });
      })
      .catch(err => {
         res.status(400).json(err)
      })

});



module.exports = router;

