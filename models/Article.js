const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Article = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    collection: "articles",
  }
);
module.exports = mongoose.model("Article", Article);
