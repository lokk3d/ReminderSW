const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
let middleware = require('./routes/auth/middleware');
const path = require("path");

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


//******************** ROUTERS *************************
const registerRouter = require("./routes/auth/register");
app.use("/api/singup", registerRouter);

const loginRouter = require("./routes/auth/login");
app.use("/api/login", loginRouter);

const userRouter = require("./routes/user");
app.use("/api/user", middleware.checkToken, userRouter);

const clientRouter = require("./routes/client");
app.use("/api/client", middleware.checkToken, clientRouter);

const meetingRouter = require("./routes/meeting");
app.use("/api/meeting", middleware.checkToken, meetingRouter);





if(process.env.NODE_ENV ==="production"){
    app.use(express.static("client/build") );
    app.get("*",(req, res) =>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.listen(port, ()=>{
    console.log('Server running... on port: ' + port);
})