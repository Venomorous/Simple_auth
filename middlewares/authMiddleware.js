const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.config.js");
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({ message: "Not authorized" });
    }
};
