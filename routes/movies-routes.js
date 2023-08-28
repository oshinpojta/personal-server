const express = require("express");
const moviesController = require("../controllers/movies-controller");

const router = express.Router();

router.get("/all", moviesController.getMovies);

router.get("/:id", moviesController.getMovieById);

router.post("/add", moviesController.addMovie);

router.put("/update", moviesController.updateMovie);

router.delete("/delete", moviesController.deleteMovie);

module.exports = router;