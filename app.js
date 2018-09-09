const express = require('express')
const app = express()


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
  title: String
});
