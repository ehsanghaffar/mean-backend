const Joi = require("joi");
require("dotenv").config();

const Article = require("../models/Article");
const User = require("../models/User");

const articleSchema = Joi.object().keys({
  title: Joi.string().required().min(4).max(50),
  description: Joi.string().required().min(10).max(255),
  content: Joi.string().required().min(20),
  author: Joi.string()
});

// this is the function that will be called when we call the POST method on /articles
// add article
exports.addArticle = async (req, res) => {
  try {
    const result = articleSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }

    const newArticle = new Article(result.value);
    await newArticle.save();

    const author = await User.findById(req.body.author);
    author.articles.push(newArticle);
    await author.save();

    return res.status(200).json({
      success: true,
      message: "Article saved successfully",
    });
  } catch (err) {
    console.error("Add Article Error", err);
    return res.status(500).json({
      error: true,
      message: "Article Couldn't be saved successfully",
    });
  }
};

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    return res.status(200).json({
      success: true,
      articlesCount: articles.length,
      articles: articles.map((article) => {
          return {
            id: article._id,
            title: article.title,
            description: article.description,
            author: article.author,
          };
        })
    });
  } catch (err) {
    console.error("Get Articles Error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't get articles",
    });
  }
};

// Get article by id
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)

    return res.status(200).json({
      success: true,
      data: article,
    });
  } catch (err) {
    console.error("Get Article By Id Error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't get article",
    });
  }
};

// Update article by id
exports.updateArticle = async (req, res, next) => {
  try {
    const result = articleSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }

    const article = await Article.findByIdAndUpdate(
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

    const author = await User.findById(req.body.author);
    author.articles.push(article);
    await author.save();


  } catch (err) {
    console.error("Update Article By Id Error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't update article",
    });
  }
};

// Delete article by id
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      success: true,
      data: article,
    });
  } catch (err) {
    console.error("Delete Article By Id Error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't delete article",
    });
  }
};
