const registerValidation = require('./joi/registerValidation');
const loginValidation = require('./joi/loginValidattion');

const validator = undefined || "joi";

const validateRegistration = (user) => {
    if (validator === 'joi') {
        return registerValidation(user);
    }
}

const validateLogin = (user) => {
    if (validator === 'joi') {
        return loginValidation(user);
    }
}

const validateUserUpdate = (user) => {
    if (validator === 'joi') {
        return updateValidation(user);
    }
}

module.exports = {
    validateRegistration,
    validateLogin,
    validateUserUpdate
}