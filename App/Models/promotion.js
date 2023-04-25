const mongoose = require("mongoose");

const Promotions = mongoose.model(
  "Promotions",
  new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products"
    },
    promotion: [{
      remainingdays: Number,
      price: Number
    }]
  })
);

module.exports = Promotions;