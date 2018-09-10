const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      console.log(review)
      res.redirect(`/reviews/${review._id}`)
    }).catch((err) => {
      console.log(err.message)
    })
  })
  // SHOW
  app.get('/reviews/:id', (req, res) => {
   Review.findById(req.params.id).then((review) => {
     res.render('reviews-show', { review: review })
   }).catch((err) => {
     console.log(err.message);
   })
 })


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let reviews = [
  { title: "Great Review" },
  { title: "Bad Review" }
]

// INDEX
app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
  res.render('reviews-index', { reviews: reviews });
})
.catch(err => {
      console.log(err);
    })
})

// var reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" }
// ]

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  movieRatings: String
});

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})
