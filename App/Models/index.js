const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./users");
db.role = require("./role");
db.products = require("./products")
db.stores = require("./stores")
db.types = require("./types")
db.purchase = require("./purchase")
db.promotions = require("./promotion")
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;