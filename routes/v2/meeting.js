const router = require("express").Router();
let Meeting = require("../../models/meeting.model");
let Client = require("../../models/client.model");

const mongoose = require("mongoose")
const axios = require("axios")

const moment = require('moment')
const { check, validationResult } = require('express-validator');

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
router.route("/:id").get((req, res) => {
   const username = req.decoded.user;
   Meeting.findOne({ _id: req.params.id })
      .then(meeting => {
         res.status(200).json(meeting)
      })
      .catch(err => res.status(404).json("Error" + err));
});

router.route("/delete").delete((req, res) => {
   const username = req.decoded.user;
   Meeting.findOneAndDelete({ _id: req.body.id })
      .then(meeting => {
         res.status(200).json(meeting)
      })
      .catch(err => res.status(404).json("Error" + err));
});

/*
Retrive all the meetings of one client matched with the professional
*/
router.route("/getMeetingsByClient").post([
   check("client").not().isEmpty(),

], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   const username = req.decoded.user;

   Meeting.find({ professional: username, client: req.body.client }).sort([['updatedAt', 'descending']])
      .then(meeting => {
         res.status(200).json(meeting)
      })
      .catch(err => res.status(404).json("Error" + err));
});



/*
Add meeting
*/
router.route("/add").post([
   check("client").not().isEmpty(),
   check("date").not().isEmpty(),
   check("description").not().isEmpty(),
   check("clientName").not().isEmpty(),

], (req, res) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      console.log(errors.array())

      return res.status(422).json({ errors: errors.array() });
   }
   const username = req.decoded.user;
   const token = req.token;

   var _id = new mongoose.mongo.ObjectId();
   const professional = username;
   const client = req.body.client;
   const date = req.body.date;
   const description = req.body.description
   const myMessages = req.body.messages
   const clientName = req.body.clientName

   const newMeeting = new Meeting(
      { _id, professional, client, date, description, clientName });

   newMeeting.save()
      .then(() => {
         if (Array.isArray(myMessages)) {

            let finishedRequests = 1
            myMessages.forEach(message => {
               message = message.message
               
               axios.post('http://localhost:5000/api/message/add',
               {
                  client: client,
                  meeting: _id,
                  date: message.date,
                  description: message.description,
                  contacts: message.contacts,
               },
               { headers: { authorization: "Bearer " + token } })
                 .then((respose) => {
                     if(finishedRequests === myMessages.length){
                        res.status(200).json("Meeting created!")
                     }else{
                        finishedRequests ++
                     }
                 })
                 .catch((err) => {
                   console.log("Errore")
                   res.status(405).json("Error" + err); //Uso 405 perchè mi serve per debug

                 })

            })

            if(myMessages.length === 0){
               res.status(200).json("Meeting created!")
            }

         }else{
            res.status(200).json("Meeting created!")
         }

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
   const today = moment().startOf('day')

   const filter = {
      'reminder.date': {
         $gte: today.toDate(),
         $lte: moment(today).endOf('day').toDate()
      }
   }

   Meeting.find(filter)
      .then(meetings => {
         res.status(200).json(meetings)
      })
      .catch(err => {
         res.status(400).json(err)
      })

});


router.route("/update").post((req, res) => {
   const username = req.decoded.user;
   const myMeeting = req.body.meeting;
   const meetingId = myMeeting._id;

   Meeting.findOne({ _id: meetingId })
      .then(meeting => {
         meeting.reminder = myMeeting.reminder;
         meeting.save();
         res.status(200).json("Meeting aggiornato....")
      })
      .catch(err => {
         res.status(400).json(err)
      })

});



module.exports = router;

