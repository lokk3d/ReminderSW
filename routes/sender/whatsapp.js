const router = require("express").Router();
require("dotenv").config();
const { check, validationResult } = require('express-validator');
const login = require("facebook-chat-api");
const Axios = require("axios")

router.route("/send").post([

    check("instance").not().isEmpty(),
    check("chatId").not().isEmpty(),
    check("msg").not().isEmpty(),

],(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let query = 'https://api.mercury.chat/sdk/whatsapp/sendMessage?api_token='+
    process.env.WHATSAPP_TOKEN +'&instance='+ req.body.instance 

    try{
        const response = Axios.post(query,
            {
                "chatId": req.body.chatId+"@c.us",
                "body": req.body.msg
            });
          
          res.status(200).json({status: true, message:"Messagge sent..."});

    }catch(error){
        res.status(400).json({status: false, message:"Error!", error:error});

    }
   
   
    

});


router.route("/test").get((req, res) => {
    res.status(200).json({text: "Tutto ok"})
   
});



module.exports = router;