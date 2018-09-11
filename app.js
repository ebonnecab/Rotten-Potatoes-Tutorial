const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {
    userNewUrlParser: true
});


app.use(bodyParser.urlencoded({
    extended: true
}));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    movieRatings: Number
});

app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})


// NEW
app.get('/reviews/new', (req, res) => {
    console.log(req.params);

    res.render('reviews-new', {});
});

// SHOW
app.get('/reviews/:id', (req, res) => {
    console.log('my id:'+ req.params.id);
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', {
            review: review
        })
    }).catch((err) => {
        console.log(err.message);
    });
});


// INDEX
app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {
                reviews: reviews
            });
        })
        .catch(err => {
            console.log(err);
        });
});



app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
