const express = require('express')
const methodOverride = require('method-override')
const app = express()
const bodyParser = require('body-parser');
const reviews = require('./controllers/reviews.js');
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

app.use('/', reviews)

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
