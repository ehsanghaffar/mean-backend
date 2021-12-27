const mongoose = require("mongoose");


//  this feature is not yet implemented and will be added in the future
const Role = mongoose.Model(
  'Role',
  new mongoose.Schema({
    name: String
  })
);
modules.exports = Role;