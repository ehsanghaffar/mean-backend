const mongoose = require("mongoose");

const Role = mongoose.Model(
  'Role',
  new mongoose.Schema({
    name: String
  })
);

modules.exports = Role;