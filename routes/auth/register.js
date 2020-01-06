const router = require("express").Router();
let User = require("../../models/user.model");
var bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
var fs = require('fs');
const mongoose = require("mongoose")
var path = require('path');


router.route("/").post([
    check("email").isEmail().withMessage("Please use a valid email! "),
    check("firstName").isLength({min:2}),
    check("lastName").isLength({min:2}),
    check("password").isLength({min:6})
        .withMessage("Password lenght min is 6 charachers"),

],
    (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const noHashedPassword = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(noHashedPassword, salt);
    const sessions = {
        email:{},
        whatsapp:{}
    }

   
    const newUser = new User({email, password, firstName, lastName, sessions});

    newUser.save()
        .then(()=> {
            var jsonPath = path.join(__dirname,"..","..", 'files', 'logs', email+".log");
            fs.appendFile(jsonPath, 'Log di sistema per ' + firstName + " " + lastName, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
            res.status(200).json("New user added added")
        })
        .catch(err=> {
            if(err.code == 11000){
                res.status(400).json({
                    err: "Email already used..."
                })
            }
            res.status(401).json("Error" + err);
        });
}); 



module.exports = router;