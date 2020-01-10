const router = require("express").Router();

let jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

require("dotenv").config(); 


router.route("/generateUserToken").post([
    check("email").isEmail().withMessage("Please use a valid email! "),

],(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    if(req.decoded === "admin"){
        const email = req.body.email
        var token = jwt.sign({ user: email }, process.env.SECRET);
        res.status(200).json({authToken: token});

        
    }else{
        res.status(400).json("Error")

    }

    
}); 




module.exports = router;