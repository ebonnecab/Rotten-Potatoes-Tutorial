// movies.js
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('bbf76ad15ebe85d024290832d8614342')
const express = require('express')
router = express.Router()

router.get('/', (req, res) => {
  moviedb.miscNowPlayingMovies().then((response) => {
    console.log(response.results);
    res.render('movies-index', {movies: response.results });
  }).catch((error) => {
    console.error(error)
  })
})

router.get('/movies/:id', (req, res) => {
  var movieId = req.params.id
  console.log(movieId)
  moviedb.movieInfo({id:movieId}).then((movies) => {
    res.render('movies-show', {
      movies
    })
  }).catch((err) =>{ console.log(err)})
})
module.exports = router;