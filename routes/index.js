var express = require('express');
var router = express.Router();
var Article = require('../models/Article.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  Article.find({} , (err , articles) => {
    res.render('index', {
      title: 'All Articles',
      articles: articles
    });
  });
});

module.exports = router;
