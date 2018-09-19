const mongoose = require('mongoose');
const Review = module.exports = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,

});
module.exports = Review
