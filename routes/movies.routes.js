// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/", (req, res) => {
  Movie.find().then((moviesFromDb) => {
    res.render("movies/movies", { movies: moviesFromDb });
  });
});

router.get("/create", (req, res) => {
  Celebrity.find().then((celebritiesFromDb) => {
    res.render("movies/new-movie", { celebrities: celebritiesFromDb });
  });
});
router.post("/create", async (req, res) => {
  const { title, genre, plot, cast } = req.body;
  if (
    title.length === 0 ||
    genre.length === 0 ||
    plot.length === 0 ||
    cast.length === 0
  ) {
    res.render("movies/new-movie");
  } else {
    Movie.create({ title, genre, plot, cast }).then((newMovie) => {
      Movie.find().then((movies) => {
        res.render("movies/movies", { movies });
      });
    });
  }
});
router.get("/:id", (req, res) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movieFromDb) => {
      res.render("movies/movie-details", { movie: movieFromDb });
    });
});
router.get("/:id/update", (req, res) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movieFromDb) => {
      Celebrity.find().then((celebritiesFromDb) => {
        console.log(celebritiesFromDb);
        console.log(Array.isArray(celebritiesFromDb));
        res.render("movies/edit-movie", {
          movie: movieFromDb,
          allCast: celebritiesFromDb,
        });
      });
    });
});
router.post("/:id/update", (req, res) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(
    movieId,
    { title, genre, plot, cast },
    { new: true }
  ).then((movieFrmDb) => {
    Movie.find().then((movies) => {
      res.render("movies/movies", { movies });
    });
  });
});

router.post("/:id/delete", (req, res) => {
  const movieId = req.params.id;
  console.log(movieId);

  Movie.findByIdAndRemove(movieId).then((movieFromDb) => {
    Movie.find().then((movies) => {
      res.render("movies/movies", { movies });
    });
  });
});

module.exports = router;
