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

  router.delete('/:id', function (req, res) {
    console.log("DELETE comment")
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    })
  })
module.exports = router
