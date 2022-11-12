const mongoose = require("mongoose");

const url = "mongodb://localhost:27020/test";
const MONGOURI = process.env.DB_CONNECTION;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;