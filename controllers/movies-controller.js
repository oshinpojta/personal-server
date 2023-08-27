const path = require("path");
const Movies = require("../mongoose-models/movies-model");

exports.getMovies = async (req, res, next) => {
    try {
        let limit = req.query.limit || 20;
        let offset = req.query.offset || 0;
        let movies = await Movies.find().limit(limit).skip(offset);
        res.json({ success : true, data : movies});
    } catch (error) {
        console.log(`ERROR : ${path.basename(__dirname)}/${path.basename(__filename)}/${__function}\n`,error);
        res.json({ success: false, msg : "Internal Server Error!"});
    }
}

exports.getMovieById = async (req, res, next) => {
    try {
        let movie_id = req.params.id;
        let movie = await Movies.findById(movie_id);
        res.json({ success : true, data : movie});
    } catch (error) {
        console.log(`ERROR : ${path.basename(__dirname)}/${path.basename(__filename)}/${__function}\n`,error);
        res.json({ success: false, msg : "Internal Server Error!"});
    }
}
