const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({});

const Movies = mongoose.model("Movie", MoviesSchema, 'movies');

module.exports = Movies;