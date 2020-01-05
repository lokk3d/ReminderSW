const router = require("express").Router();
var nodemailer = require('nodemailer');
require("dotenv").config();
const { check, validationResult } = require('express-validator');


router.route("/send").post([

    check("email").isEmail().withMessage("Please use a valid email! "),
    check("password").not().isEmpty(),
    check("toEmail").isEmail().withMessage("Please use a valid reciver email!"),
    check("subject").not().isEmpty(),
    check("text").not().isEmpty(),


],(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.body.email,
            pass: req.body.password
        },
        tls: {rejectUnauthorized: false}
    });

    var mailOptions = {
        from: req.body.email,
        to: req.body.toEmail,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json({error: error, sent:false})
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({sent:true})
        }
    });
});


router.route("/test").get((req, res) => {
    res.status(200).json({text: "Tutto ok"})
   
});



module.exports = router;