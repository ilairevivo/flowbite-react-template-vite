const {verifyToken} = require('./Providers/jwt');
const { handleError } = require('../utlis/errorHandler');
const config = require('config');

const tokenGenerator = config.get('TOKEN_GENERATOR') || 'jwt';

const auth = async (req, res, next) => {
    if(tokenGenerator === 'jwt'){
       try{
        const tokenFromHeader = req.header('x-auth-token');
        if(!tokenFromHeader){
            throw new Error("Authentication error. Please login/Authenticate");
        }
        const userData = verifyToken(tokenFromHeader);
        if(!userData){
            throw new Error("Authentication error. Unauthorize user");
        }
        req.user = userData;
        return next();
       } catch(error){
        return handleError(res, 401, error.message);
       }
    }
    return handleError(res, 500, "use jwt!");
}

module.exports = auth;