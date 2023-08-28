const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
    fullplot : String,
    imdb : Object,
    year : Number,
    plot : String,
    genres : Object,
    rated : String,
    metacritic : Number,
    title : String,
    lastupdated : {
        type: Date, default: Date.now
    },
    languages : Object,
    writers : Object,
    type : String,
    tomatoes : Object,
    poster : String,
    num_mflix_comments : Number,
    released : Object,
    awards : Object,
    countries : Object,
    cast : Object,
    directors : Object,
    runtime : Number,
});

const Movies = mongoose.model("Movie", MoviesSchema, 'movies');

module.exports = Movies;