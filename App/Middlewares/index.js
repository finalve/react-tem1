const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verify = require("./validator");
const uploadImage = require("./uploadImage.js")
module.exports = {
  authJwt,
  verifySignUp,
  verify,
  uploadImage
};