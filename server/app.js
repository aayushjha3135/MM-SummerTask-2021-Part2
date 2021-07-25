const express = require('express');
const mongoose = require('mongoose');
const app = express();
const article = require('./models/article');


//connect to mongoosedb
const dbURI = 'mongodb+srv://Aayushjha:<aayushj>@cluster0.u9tgk.mongodb.net/Aayushjha?retryWrites=true&w=majority'


//connect to mongoose
mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(result =>console.log())
  .catch(err => console.log(err));


  //route
app.listen(3000, () => console.log("Server started"));


//listing all 
app.get('/article/all', (req, res) => {
  article.find()
  then(result => {
    res.send( { article: result, title: 'article' });
  })
  .catch(err => {
    console.log(err);
  });
});


//trending articles
app.get('/article', (req, res) => {
  article.find().sort({ clicks: -1 })
    .then(result => {
      res.render( { article: result, title: 'article' });
    })
    .catch(err => {
      console.log(err);
    });
});


//read article
app.get('/article/:id', (req, res) => {
  const id = req.params.id;
  article.findById(id)
    .then(result => {
      res.send({ article: result, title: 'read article' });
    })
    .catch(err => {
      console.log(err);
    });
});


//create article
app.post('/article', (req, res) => {
  const article = new article(req.body)({

  title: 'new article',
    description: 'article',
  });
  app.save()
    .then(result => {
      res.redirect('/article');
    })
    .catch(err => {
      console.log(err);
    });
});


// Update article
app.put('/article/:id',  (req, res) => {
  const updatedAd = req.body;
  await updateAd(req.params.id, updatedAd);
  res.send({ article: result, title: ' updated.' });
})
.catch(err => {
  console.log(err);
});


//delete article
app.delete('/article/:id', (req, res) => {
  const id = req.params.id;
  
  app.findByIdAndDelete(id)
    .then(result => {
      res.send({ article: result, title: 'deleted' });
    })
    .catch(err => {
      console.log(err);
    });
});


//like article
app.post('/article/id/like',  (req, res) => {
    const article = req.article;
    article.likes = ++article.likes;
    console.log(article);
    article.save((err, newarticle) => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    })
});

//dislike article
app.delete('/article/id/like', (req, res) => {

    const article = req.article;
    if (article.likes >= 1) article.likes = --article.likes;
    article.save((err, newarticle) => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    })
});


// 404 page
app.use((req, res) => {
  res.status(404).render('404');
});
