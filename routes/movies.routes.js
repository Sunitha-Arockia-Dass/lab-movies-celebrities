const { Router } = require("express");
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');
const router = Router();
// Route to render the new movie form
router.get('/create', (req, res) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render('movies/new-movie', { celebrities: celebritiesFromDB });
        })
        .catch(error => {
            console.error('Error fetching celebrities:', error);
            res.render('error', { errorMessage: 'An error occurred' }); 
        });
});

// Route to handle new movie form submission
router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })
        .then(newMovie => {
            res.redirect('/movies'); 
        })
        .catch(error => {
            console.error('Error creating movie:', error);
            res.render('error', { errorMessage: 'An error occurred' }); 
        });
});

module.exports = router;
