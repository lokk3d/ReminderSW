const router = require("express").Router();
require("dotenv").config();
const { check, validationResult } = require('express-validator');
const login = require("facebook-chat-api");


router.route("/send").post([

    check("email").isEmail().withMessage("Please use a valid email! "),
    check("password").not().isEmpty(),
    check("contactId").not().isEmpty(),
    check("msg").not().isEmpty(),


],(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
   
    login({email: req.body.email, password: req.body.password}, (err, api) => {
        if(err) {
            res.status(400).json({error:err});
        }

        api.sendMessage(req.body.msg, req.body.messageId);
        api.logout(()=>{
            res.status(200).json({text:"Message sent...", login:"Logged out..."});
        })
    });

});


router.route("/test").get((req, res) => {
    res.status(200).json({text: "Tutto ok"})
   
});



module.exports = router;