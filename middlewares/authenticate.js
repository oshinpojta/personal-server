const path = require("path")
const userServices = require("../services/user-services");
const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET || "jsonwebtokensecretkey_test";

exports.authenticate = async (req, res, next) => {
    try {
        let token = req.headers["token"];
        if(!token){
            res.json({ success : false, msg : "No Auth-Token!"});
            return
        }
        let obj = jwt.verify(token, jwtSecretKey);
        let user = userServices.getUserById(obj.user_id);
        req.user = user;
        next();
    } catch (error) {
        console.log(`ERROR : ${path.basename(__dirname)}/${path.basename(__filename)}/${__function}\n`,error);
        res.json({ success: false, msg : "Authentication Error!"});
    }
}