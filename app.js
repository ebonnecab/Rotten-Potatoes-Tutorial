
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const bodyParser = require('body-parser');
const reviews = require('./controllers/reviews.js');
const comment = require('./controllers/comments.js')
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes')

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

app.use('/', reviews)

app.use ('/reviews/comments', comment)

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app;
