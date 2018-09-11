const express = require('express')
const methodOverride = require('method-override')
const app = express()
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {
    userNewUrlParser: true
});

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

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
    movieRatings: String
});

// NEW
app.get('/reviews/new', (req, res) => {
    console.log(req.params);

    res.render('reviews-new', {});
});

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', {
            review: review
        })
    }).catch((err) => {
        console.log(err.message);
    });
});

// EDIT
app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})


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
