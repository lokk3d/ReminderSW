const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**/


const meetingSchema = new Schema({
    professional:{
        type:String,
        required:true,
        trim: true, 
},
    client:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client',
        required:true,
        trim: true,
    },
    clientName:{
        type:String,
        required:true,
        trim: true,
    },


    description:{
        type:String
    },
    date:{
        type: Date
    }
    //Add here more info in the schema
}, {
    timestamps: true,
})

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting; 