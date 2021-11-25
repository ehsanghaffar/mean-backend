const express = require("express");
const app = express();

const articleRoute = express.Router();
const cleanBody = require("../middleware/cleanbody");
const ArticleController = require("../controllers/article.controller");
let Article = require("../models/Article");

// Add Article
// articleRoute.route("/add-article").post((req, res, next) => {
//   Article.create(req.body, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.json(data);
//     }
//   });
// });
articleRoute.route('/add-article').post(cleanBody, ArticleController.addArticle);

// Get All Article
articleRoute.route("/").get((req, res) => {
  Article.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Article
articleRoute.route("/:id").get((req, res) => {
  Article.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Article
articleRoute.route("/update-article/:id").put((req, res, next) => {
  Article.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Article updated successfully!");
      }
    }
  );
});

// Delete Article
articleRoute.route("/delete-article/:id").delete((req, res, next) => {
  Article.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = articleRoute;
