const NewsArticle = require('../models/article');

// Obtener todos los artículos del usuario
const getArticles = async (req, res, next) => {
  try {
    const articles = await NewsArticle.find({ owner: req.user._id });
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

// Crear un nuevo artículo
const createArticle = async (req, res, next) => {
  try {
    const { keyword, title, description, date, source, url, image } = req.body;
    const article = await NewsArticle.create({
      keyword,
      title,
      description,
      date,
      source,
      url,
      image,
      owner: req.user._id
    });
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};

// Eliminar un artículo
const deleteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await NewsArticle.findOne({
      _id: articleId,
      owner: req.user._id
    });

    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    await article.remove();
    res.json({ message: 'Artículo eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle
};