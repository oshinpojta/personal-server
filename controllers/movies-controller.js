const path = require("path");
const Movies = require("../mongoose-models/movies-model");
const { printSchemaDescription } = require("../utils/schema-decription");

const Genres = [ 
  'Comedy',
  'Crime',
  'Horror',
  'Drama',
  'Adventure',
  'Biography',
  'Animation',
  'Documentary',
  'Action'
]

exports.getMovies = async (req, res, next) => {
    try {
        let limit = req.query.limit || 50;
        let offset = req.query.offset || 0;
        let genres = req.body.genres;
        let year = req.query.year;
        let search_text = req.body.search_text;
        // create query
        const query = {
            poster : { $ne : null },
        }

        if(genres){  
            query.genres = genres;
            console.log(genres);
        }
        if(year){
            query.year = year;
        }
        if(search_text){
            query.$or = [
                { title: { $regex: search_text }}, 
                { plot: { $regex: search_text }}, 
                { genres: { $regex: search_text }}, 
                { languages: { $regex: search_text }}, 
                { directors: { $regex: search_text }}, 
                { writers: { $regex: search_text }}, 
                { countries: { $regex: search_text }},
                { production: { $regex: search_text }},
                { cast: { $regex: search_text }}
            ] 
        }
        
        let movies = await Movies.find(query).sort({ lastupdated : -1 }).skip(offset).limit(limit);
        
        // printSchemaDescription(movies[0]);

        res.json({ success : true, data : { movies, genres : Genres}});
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

exports.addMovie = async (req, res, next) => {
    try {
        let body = req.body;
        const movie = await Movies.create(body);
        res.json({ success : true, data : movie});
    } catch (error) {
        console.log(`ERROR : ${path.basename(__dirname)}/${path.basename(__filename)}/${__function}\n`,error);
        res.json({ success: false, msg : "Internal Server Error!"});
    }
}

exports.updateMovie = async (req, res, next) => {
    try {
        let movie = req.body;
        let result = await Movies.findByIdAndUpdate(movie._id, movie, { new: true });
        res.json({ success : true, data : result});
    } catch (error) {
        console.log(`ERROR : ${path.basename(__dirname)}/${path.basename(__filename)}/${__function}\n`,error);
        res.json({ success: false, msg : "Internal Server Error!"});
    }
}

exports.deleteMovie = async (req, res, next) => {
    try {
        let movie_id = req.body._id;
        let movie = await Movies.deleteOne({ _id :movie_id });
        res.json({ success : true, data : movie});
    } catch (error) {
        console.log(`ERROR : ${path.basename(__dirname)}/${path.basename(__filename)}/${__function}\n`,error);
        res.json({ success: false, msg : "Internal Server Error!"});
    }
}