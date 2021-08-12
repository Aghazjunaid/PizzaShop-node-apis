const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CartSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref:"product"},
    quantity: {type: Number, required: true},
}, {timestamps: true});

Cart = mongoose.model("cart",CartSchema);

module.exports={ 
    Cart
}