var express = require('express');
var router = express.Router();
var Article = require('../models/Article');

router.get('/', (req, res, next) => {
  Article.find({} , (err , articles) => {
    res.render('articles', {
      articles: articles,
    });

  });
})

router.get('/create', ensureAuthenticated, (req, res, next) => {
  res.render('newarticle');

})
router.post('/create', ensureAuthenticated, (req, res, next) => {
  const header = req.body.header;
  const body = req.body.body;
  const createdDate = new Date();
  const createdBy = req.user._id;
  const estimatedReadTime = req.body.estimatedReadTime;
  const tags = [];
  console.log(req.body.tags);
  const bodyTags = req.body.tags.split(',');
  bodyTags.forEach((tag) => {
    tags.push(tag);
  })
  
  let newArticle = new Article({
    header : header,
    body: body,
    createdDate: createdDate,
    createdBy: createdBy,
    estimatedReadTime: estimatedReadTime,
    tags: tags,
  })

  newArticle.save((err) => {
    if (err) {
      console.log(err);
      return
    }
    // else {
      res.redirect('/articles');
    // }
  })
})

router.delete('/article/:id',ensureAuthenticated, (req ,res ,next) => {
  let query = {_id: req.params.id};
  Article.remove(query , (err) => {
    if (err) {
      console.log(err);
      return false;
    }
    res.send('article removed')
  })

})

function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()) {
    return next()
  }
  else {
    req.flash('danger' , 'please login');
    res.redirect('/');
  }
}
module.exports = router;
