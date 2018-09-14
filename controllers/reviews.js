const Review = require('../models/review')
const express = require('express')
router = express.Router()


router.get('/', (req, res) => {
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
// NEW
router.get('/reviews/new', (req, res) => {
    console.log(req.params);

    res.render('reviews-new', {});
});

// CREATE
router.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review)
        res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
    }).catch((err) => {
        console.log(err.message)
    })
})
// SHOW
router.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', {
            review: review
        })
    }).catch((err) => {
        console.log(err.message);
    });
});

// EDIT
router.get('/reviews/:id/edit', function(req, res) {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {
            review: review
        });
    })
})


// UPDATE
router.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})

//DELETE

router.delete('/reviews/:id', function(req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})

module.exports = router
