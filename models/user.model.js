const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    firstName:{
        type: String,
        required: true,
        trim:true
    },
    lastName:{
        type: String,        
        required: true,
        trim:true
    },
    fiscalCode:{
        type: String,   
        trim:true
    },
    details:{
        type: String,   
        trim:true
    },
    clients:[{type: mongoose.Schema.Types.ObjectId, ref: 'Clients'}],
    sessions:{
        email:{
            username: {
                type: String, 
                trim:true
            },
            password:{
                type:String, 
                trim: true
            }
        },
        whatsapp: {
            sessionId: {
                type: String,
                trim: true
            }
        }
    }

    
    //Add here more info in the schema
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema);

module.exports = User; 