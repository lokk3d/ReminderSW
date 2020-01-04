const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({

    firstName:{
        type: String,
        required:true,
        trim:true
    },
    lastName:{
        type: String,
        required:true,
        trim:true
    },
    fiscalCode:{
        type: String,
        required:true,
        trim:true
    },
    details:{
        type: String,
        trim:true
    },
    meetings:[{type: mongoose.Schema.Types.ObjectId, ref: 'Meeting'}],
    contacts:{
        whatsapp:{type: String, trim:true},
        instagram:{type: String, trim:true},
        facebook:{type: String, trim:true},
        email:{type: String, trim:true},
        sms:{type: String, trim:true}
    },


    //Add here more info in the schema
}, {
    timestamps: true,
})

const Client = mongoose.model("Client", clientSchema);

module.exports = Client; 