const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CartSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref:"Product"},
    quantity: {type: Number},
}, {timestamps: true});

module.exports = mongoose.model("Cart", CartSchema)
