const router = require("express").Router();
require("dotenv").config();
const { check, validationResult } = require('express-validator');
const login = require("facebook-chat-api");
const Axios = require("axios")
const { IgApiClient } = require('instagram-private-api');



router.route("/send").post((req, res) => {
    console.log("*************** Mando un messaggio da IG ***************")
    
    const seed = req.body.user+"IG_ACCESS"
    const username = req.body.username
    const password = req.body.password
    const clientUsername = req.body.clientUsername
    const message = req.body.message
    const ig = new IgApiClient();

    ig.state.generateDevice(seed);
    // Optionally you can setup proxy url

    (async () => {
        // Execute all requests prior to authorization in the real Android application
        // Not required but recommended
        await ig.simulate.preLoginFlow();

        const loggedInUser = await ig.account.login(username, password)
            .then(res=>{
                (async ()=>{
                    // The same as preLoginFlow()
                    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
                    process.nextTick(async () => await ig.simulate.postLoginFlow());
                    // Create UserFeed instance to get loggedInUser's posts

                    const userId = await ig.user.getIdByUsername(clientUsername);
                    const thread = ig.entity.directThread([userId.toString()]);
                    await thread.broadcastText(message);
                    res.status(200).json({success:true})
                })
            })
            .catch(err => {
                res.status(400).json("Errore nel login")
            })

    })();


});


router.route("/test").get((req, res) => {
    res.status(200).json({ text: "Tutto ok" })

});



module.exports = router;