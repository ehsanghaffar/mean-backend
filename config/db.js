const mongoose = require("mongoose");

// http://localhost:27017/node-angular
// const url = "mongodb://localhost:27017/node-angular";
const MONGOURI = process.env.DB_CONNECTION;
// const MONGOURI = "mongodb+srv://mongoUser:j*e6HeYLPAM&-sZ@cluster0.rnytx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;