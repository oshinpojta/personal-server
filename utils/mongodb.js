const mongoose = require("mongoose");

const db = "sample_mflix"
const uri = `mongodb+srv://oshinpojta:${process.env.MONGODB_PASS}@cluster0.nbvb24g.mongodb.net/${db}`;

mongoose.connect(uri,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(async () => {
    console.log("Connected Successfully to MongoDB Atlas!");
}).catch((err) => {
    console.log(err);
});


