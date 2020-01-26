const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    professional:{type:String, required:true},
    client:{type: mongoose.Schema.Types.ObjectId, ref: 'Client', required:true},
    meeting:{type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required:true},

    description:{
        type: String,
        required:true,
        trim:true
    },
    date:{
        type: Date,
        required:true
    },
    contacts:{
            whatsapp: {
                active: Boolean,
                sent: Boolean,
                statusCode: Number
            },
            email: {
                active: Boolean,
                sent: Boolean,
                statusCode: Number
            },
            sms: {
                active: Boolean,
                sent: Boolean,
                statusCode: Number
            }
    },
    
}, {
    timestamps: true,
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message; 