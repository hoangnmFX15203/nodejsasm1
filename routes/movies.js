const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const movieController = require('../controller/movies');

router.get('/home', movieController.getMovies);
router.get('/api/movies/trending', movieController.getTrendingMovies);
router.get('/api/movies/top-rate', movieController.getRatingMovies);
router.get('/api/movies/genre', movieController.getGenreList);
router.get('/api/movies/discover/:genreId', movieController.getMoviesByGenre);
router.post('/api/movies/video', movieController.getVideoByMovieId);
router.post('/api/movies/search', movieController.searchMovies);

module.exports = router;
