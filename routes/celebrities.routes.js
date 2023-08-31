const { Router } = require("express");
const Celebrity = require('../models/Celebrity.model')
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = Router();

// all your routes here
router.get('/', (req,res)=>{
    Celebrity.find()
    .then(celebritiesFromDB=>{
        res.render('celebrities/celebrities',{celebs: celebritiesFromDB})
    })
})
router.get ('/create', (req,res) => { 
    res.render('celebrities/new-celebrity')
})
router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    console.log(name.length);
    
    if (name.length === 0 || occupation.length === 0 || catchPhrase.length === 0) {
        res.render('celebrities/new-celebrity'); // Adjust the view path as needed
    } else {
        Celebrity.create({ name, occupation, catchPhrase })
            .then(newCelebrity => {
                res.render('celebrities/celebrities'); // Adjust the view path as needed
            })
            .catch(error => {
                console.error('Error creating celebrity:', error);
                res.render('error', { errorMessage: "An error occurred" }); // Adjust the view path as needed
            });
    }
});


module.exports = router;
