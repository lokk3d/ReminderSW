const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
let middleware = require('./routes/auth/middleware');
const path = require("path");

const cronSender = require("./cron/sender");

require("dotenv").config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err){
        console.log("Errore nella connessione al DB...");
        console.log(err)
    }
});
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Connessione al DB effettuata...");
})

cronSender.cron();

//******************** ROUTERS *************************
const registerRouter = require("./routes/auth/register"); //ok
app.use("/api/singup", registerRouter);

const loginRouter = require("./routes/auth/login"); // ok
app.use("/api/login", loginRouter);

const adminRouter = require("./routes/auth/admin"); //ok
app.use("/api/admin",middleware.checkToken, adminRouter);

const userRouter = require("./routes/v2/user"); //ok
app.use("/api/user", middleware.checkToken, userRouter);

const templateRouter = require("./routes/v2/template"); // ok
app.use("/api/template", middleware.checkToken, templateRouter);

const clientRouter = require("./routes/v2/client");
app.use("/api/client", middleware.checkToken, clientRouter);

const meetingRouter = require("./routes/v2/meeting");
app.use("/api/meeting", middleware.checkToken, meetingRouter);

const messageRouter = require("./routes/v2/message");
app.use("/api/message", middleware.checkToken, messageRouter);


const cronRouter = require("./cron/mycron");
app.use("/api/cron", cronRouter);


//SESSIONI
const sessionRouter = require("./routes/sessions");
app.use("/api/user/session", middleware.checkToken, sessionRouter);


//******************** SENDERS *************************

const emailSenderRouter = require("./routes/sender/email");
app.use("/api/sender/email", emailSenderRouter);

const fbSenderRouter = require("./routes/sender/facebook");
app.use("/api/sender/facebook", fbSenderRouter);

const whatsappSenderRouter = require("./routes/sender/whatsapp");
app.use("/api/sender/whatsapp", whatsappSenderRouter);

const instagramSenderRouter = require("./routes/sender/instagram");
app.use("/api/sender/instagram", instagramSenderRouter);



//******************** CODICI *************************
const codesRouter = require("./routes/codes");
app.use("/api/codes", codesRouter);

const envRouter = require("./routes/env");
app.use("/api/envTag", envRouter);

const testRouter = require("./routes/test");
app.use("/api/test", testRouter);


if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    
    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(_dirname, "client", "build", "index.html"))
    })
}

app.listen(port, ()=>{
    console.log('Server running... on port: ' + port);
})