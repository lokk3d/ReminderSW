const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const envSchema = new Schema({

    name:{
        type: String,
        required:true,
        trim:true
    },
    variable:{
        type: String,
        required:true,
        trim:true
    },
    description:{
        type: String,
        trim:true
    },
})

const ENV = mongoose.model("ENV", envSchema);

module.exports = ENV; 