const express = require("express");
const moviesController = require("../controllers/movies-controller");

const router = express.Router();

router.get("/all", moviesController.getMovies);

router.get("/:id", moviesController.getMovieById)

module.exports = router;