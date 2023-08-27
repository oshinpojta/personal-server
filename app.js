const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./utils/mongodb");
const movieRoutes = require("./routes/movies-routes");
const path = require("path")

//initializing __filename && __function && __line - globally for ERROR logs
Object.defineProperty(global, '__stack', {
    get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});
    
Object.defineProperty(global, '__line', {
get: function() {
        return __stack[1].getLineNumber();
    }
});
    
Object.defineProperty(global, '__function', {
get: function() {
        return __stack[1].getFunctionName();
    }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/movies", movieRoutes);

app.use("/", (req, res, next) => {
    res.json({ success : true, data : "Node-Server Called!" })
})

app.listen(process.env.PORT || 5000);
