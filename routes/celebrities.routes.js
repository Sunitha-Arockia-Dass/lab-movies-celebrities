// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/", (req, res) => {
  Celebrity.find().then((celebritiesFromDb) => {
    res.render("celebrities/celebrities", { celebrities: celebritiesFromDb });
  });
});

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});
router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(name.length);
  if (
    name.length === 0 ||
    occupation.length === 0 ||
    catchPhrase.length === 0
  ) {
    res.render("celebrities/new-celebrity");
  } else {
    Celebrity.create({ name, occupation, catchPhrase }).then((newCelebrity) => {
      res.render("celebrities/celebrities");
    });
  }
});
router.get("/:id", (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId).then((celebritiesFromDb) => {
    res.render("celebrities/celebrity-detail", {
      celebrity: celebritiesFromDb,
    });
  });
});

router.get("/:id/update", (req, res) => {
  const celebrityId = req.params.id;

  Celebrity.findById(celebrityId).then((celebritiesFromDb) => {
    res.render("celebrities/edit-celebrity", { celebrity: celebritiesFromDb });
  });
});

router.post("/:id/update", (req, res) => {
  const celebrityId = req.params.id;
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(
    celebrityId,
    { name, occupation, catchPhrase },
    { new: true }
  ).then((celebritiesFromDb) => {
    Celebrity.find().then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities: celebrities });
    });
  });
});

router.post("/:id/delete", (req, res) => {
  const celebrityId = req.params.id;

  Celebrity.findByIdAndRemove(celebrityId).then((celebritiesFromDb) => {
    Celebrity.find().then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    });
  });
});

module.exports = router;
