const express = require("express");
const app = express();

const articleRoute = express.Router();
const cleanBody = require("../middleware/cleanbody");
const ArticleController = require("../controllers/article.controller");
let Article = require("../models/Article");
const auth = require("../middleware/validateToken");

// create new article route
// Refactored
articleRoute.route('/add-article').post(auth.validateToken ,cleanBody, ArticleController.addArticle);

// get all articles route
// Refactored
articleRoute.route('/').get(ArticleController.getArticles);

// Get Article
// Refactored
articleRoute.route('/:id').get(ArticleController.getArticleById);

// Update Article
// Refactored
articleRoute.route('/:id').put(cleanBody ,ArticleController.updateArticle);

// Delete Article
// Refactored
articleRoute.route('/:id').delete(cleanBody ,ArticleController.deleteArticle);

module.exports = articleRoute;
