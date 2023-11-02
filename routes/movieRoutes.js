const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

// get movie items
router.get('/', movieController.movie_index);

//
router.get('/create', movieController.movie_create_get);

// sending movie items to database
router.post('/', movieController.movie_create_post);

module.exports = router;