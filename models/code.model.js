const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema({

    name:{
        type: String,
        required:true,
        trim:true
    },
    code:{
        type: Number,
        required:true,
        trim:true
    },
    message:{
        type: String,
        trim:true
    },

    //Add here more info in the schema
}, {
    timestamps: true,
})

const Code = mongoose.model("Code", codeSchema);

module.exports = Code; 