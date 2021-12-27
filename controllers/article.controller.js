const Joi = require("joi");
require("dotenv").config();

const Article = require("../models/Article");

const articleSchema = Joi.object().keys({
  title: Joi.string().required().min(4),
  description: Joi.string().required().min(10),
  content: Joi.string().required().min(20)
})

// Article Controllers with new method
exports.addArticle = async (req, res) => {
  try {
    const result = articleSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message
      })
    }

    const newArticle = new Article(result.value);
    await newArticle.save();

    return res.status(200).json({
      success: true,
      message: 'Article saved successfully'
    });
  } catch (err) {
    console.error("Add Article Error", err)
    return res.status(500).json({
      error: true,
      message: 'Article Couldn\'t be saved successfully'
    })
  }
}