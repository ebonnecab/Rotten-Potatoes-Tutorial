// movies.js
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('bbf76ad15ebe85d024290832d8614342')
const express = require('express')
router = express.Router()
//index
router.get('/', (req, res) => {
  moviedb.miscNowPlayingMovies().then((response) => {
    console.log(response.results);
    res.render('movies-index', {movies: response.results });
  }).catch((error) => {
    console.error(error)
  })
})
//show
router.get('/movies/:id', (req, res) => {
  var movieId = req.params.id
  console.log(movieId)
  moviedb.movieInfo({id:movieId}).then((movie) => {
    res.render('movies-show', {
      movie
    })
  }).catch((err) =>{ console.log(err)})
})

//trailer

router.get('/movies/:id', (req, res) => {
  moviedb.movieInfo({
    id: req.params.id
  }).then(movie => {
    if (movie.video) {
      moviedb.movieVideos({
        id: req.params.id
      }).then(videos => {
        movie.trailer_youtube_id = videos.results[0].key
        renderTemplate(movie)
      })
    } else {
      renderTemplate(movie)
    }

    function renderTemplate(movie) {
      res.render('movies-show', {
        movie: movie
      });
    }

  }).catch(console.error)
})
module.exports = router;

