const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    professional:{type: String, trim: true, required:true},
    name:{type: String, trim: true, required:true},        
    description:{type: String, trim: true, required: true},
}, {
    timestamps: true,
})

const Template = mongoose.model("Template", templateSchema);

module.exports = Template; 