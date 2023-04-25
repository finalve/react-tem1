const mongoose = require("mongoose");

const Stores = mongoose.model(
  "Stores",
  new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products"
    },
    email: String,
    password: String,
    sold: {
      type: Boolean,
      default: false
    },
    options: [{
      name: String,
      value: String
    }],
    createAt: Date,
    expiry: Date
  })
);

module.exports = Stores;