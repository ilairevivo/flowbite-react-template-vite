const jwt = require("jsonwebtoken");
const config = require("config");

const key = config.get("JWT_KEY");

const generateAuthToken = (user) => {
    const payload = {
        id: user._id || user.id,  
        isAdmin: user.isAdmin || false,
        isBusiness: user.isBusiness || false
    };
    const token = jwt.sign(payload, key);
    return token;
};

const verifyToken = (token) => {
    try {
        const userData = jwt.verify(token, key);
        return userData;
    } catch (error) {
        return null;
    }
};

exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;