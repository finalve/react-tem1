const mongoose = require("mongoose");

const Products = mongoose.model(
  "Products",
  new mongoose.Schema({
    name: String,
    cost: Number,
    price: Number,
    type: String,
    img: String,
    description:String
  })
);

module.exports = Products;