const Comment = require('../models/comment')
const express = require('express')
router = express.Router()


  // NEW Comment
  router.post('/', (req, res) => {
      Comment.create(req.body).then((comment) => {
          console.log(comment)
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });
 // router.get('/:id', (req, res) => {
    //res.send('reviews comment')
  //})
module.exports = router
