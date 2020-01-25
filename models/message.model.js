const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    professional:{type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required:true},
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
            whatsapp: Boolean,
            email: Boolean,
            sms: Boolean
    },
    
}, {
    timestamps: true,
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message; 