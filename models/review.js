const mongoose = require('mongoose');

module.exports = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,

});
