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

router.get('/create', /*ensureAuthenticated,*/ (req, res, next) => {
  res.render('newarticle');
})
router.get('/:id', (req,res) => {
  console.log(req.params.id);
  Article.findById(req.params.id , (err, article) => {
    console.log(article);
    if (err) {
      console.log(err);
    }
    var parsedBody = JSON.parse(article.body);
    res.render('singleArticle', {
      article: article,
      parsedBody: parsedBody,
    })
  });
  // console.log(article);

  // res.send(article)
})

router.post('/create', /*ensureAuthenticated,*/ (req, res, next) => {
	// console.log('body: ' + JSON.stringify(req.body));
  // res.send(req.body)
  console.log(req.body);
  const header = req.body.header;
  const text = req.body.text;
  const createdDate = new Date();
  // const createdBy = req.user._id;
  const estimatedReadTime = req.body.estimatedReadTime;
  const tags = [];
  // console.log('qwerqwer');
  const bodyTags = req.body.tags.split(',');
  bodyTags.forEach((tag) => {
    tags.push(tag);
  })

  let newArticle = new Article({
    header : header,
    body: text,
    createdDate: createdDate,
    // createdBy: createdBy,
    estimatedReadTime: estimatedReadTime,
    tags: tags,
  })

  newArticle.save((err) => {
    if (err) {
      console.log(err);
      return
    }
    // else {
    res.send('qwer')
    // res.redirect('/articles');
    // }
  })
})

router.delete('/:id',ensureAuthenticated, (req ,res ,next) => {
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
