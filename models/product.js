const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type:String, required:true},
    price: {type: Number, required: true},
    image: {type: String},
    description: {type: String},
}, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema)