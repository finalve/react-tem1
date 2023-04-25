const mongoose = require("mongoose");

const Types = mongoose.model(
  "Types",
  new mongoose.Schema({
    name: String,
    description:String
  })
);

module.exports = Types;