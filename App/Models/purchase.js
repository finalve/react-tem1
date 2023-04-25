const mongoose = require("mongoose");

const Purchases = mongoose.model(
    "Purchases",
    new mongoose.Schema({
        orderid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stores"
        },
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        product:String,
        price:Number,
        createAt: Date,
        expiry: Date,
        expired: {
            type: Boolean,
            default: false
          },
    })
);

module.exports = Purchases;