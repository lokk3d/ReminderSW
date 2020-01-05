const router = require("express").Router();
let User = require("../models/user.model");
const { check, validationResult } = require('express-validator');
var nodemailer = require('nodemailer');


router.route("/getEmailSession").get((req, res) => {
    const username = req.decoded.user;
    User.findOne({ email: username })
        .then(user => {

            if(typeof user.sessions !== "undefined"){
                if(typeof user.sessions.email.username === "undefined"){
                    res.status(404).json(
                        {
                            defined: false,
                            username: ""
                        })
                 
                }else{
                    res.status(200).json(
                        {
                            defined: true,
                            username: user.sessions.email.username
                        })
                }
            }
           
        })
        .catch(err => res.status(401).json("Error" + err));
});

router.route("/removeEmailSession").post((req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
  
    const username = req.decoded.user;
    User.findOne({ email: username })
        .then(user => {
            user.sessions.email = undefined;

            user.save()
            res.status(200).json("Email removed...")
        })
        .catch(err => {
            console.log(err)
            res.status(401).json("Error" + err)
        });

   
});

router.route("/setEmailSession").post([
    check("username").isEmail().withMessage("Please use a valid email! "),
    check("password").not().isEmpty(),
    

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.body.username,
            pass: req.body.password
        },
        tls: {rejectUnauthorized: false}
    });

    var mailOptions = {
        from: req.body.username,
        to: req.body.username,
        subject: "Email correttamente connessa a Reminder SW",
        text: "Complimenti, hai collegato questa email al tuo Reminder!"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json({error: error, sent:false})
        } else {
            const username = req.decoded.user;
            User.findOne({ email: username })
                .then(user => {
                    user.sessions.email.username = req.body.username;
                    user.sessions.email.password = req.body.password;
        
                    user.save()
                    console.log("Set...")
                    res.status(200).json({message: "Email correctly connected!"})
                })
                .catch(err => {
                    console.log(err)
                    res.status(401).json("Error" + err)
                });
        }
    });

   
});


//*******************************************************************
router.route("/getWhatsappSession").get((req, res) => {
    const username = req.decoded.user;
    User.findOne({ email: username })
        .then(user => {

            if(typeof user.sessions !== "undefined"){
                if(typeof user.sessions.whatsapp.sessionId === "undefined"){
                    res.status(404).json(
                        {
                            defined: false,
                            sessionId: ""
                        })
                 
                }else{
                    res.status(200).json(
                        {
                            defined: true,
                            sessionId: user.sessions.whatsapp.sessionId 
                        })
                }
            }
           
        })
        .catch(err => res.status(401).json("Error" + err));
});

router.route("/removeWhatsappSession").post((req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
  
    const username = req.decoded.user;
    User.findOne({ email: username })
        .then(user => {
            user.sessions.whatsapp = undefined;

            user.save()
            res.status(200).json("Whatsapp removed...")
        })
        .catch(err => {
            console.log(err)
            res.status(401).json("Error" + err)
        });

   
});

router.route("/setWhatsappSession").post([
    check("sessionId").not().isEmpty(),
    
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const username = req.decoded.user;

    User.findOne({ email: username })
    .then(user => {
        user.sessions.whatsapp.sessionId = req.body.sessionId;

        user.save()
        res.status(200).json({message: "Whatsapp correctly connected!"})
    })
    .catch(err => {
        console.log(err)
        res.status(401).json("Error" + err)
    });
  
});




module.exports = router;

