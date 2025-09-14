const {
    register,
    login,
    find,
    findOne,
    update,
    changesBizStatus,
    remove
} = require('../models/userDataAccessServise');

const {
    validateRegistration,
    validateLogin
} = require('../validations/usersValidationService');

const normalizeUser = require('../helpers/normalizeUser');
const { generateUserPassword } = require('../helpers/bcrypt');
const { handleError } = require('../../utlis/errorHandler');

exports.registerUser = async (rawUser) => {
    try {
        const { error } = validateRegistration(rawUser);
        if (error) {
             return handleError(null, 400, error.details.map(e => e.message).join(", "));
        }

        let user = normalizeUser(rawUser);
        user.password = await generateUserPassword(user.password);
        user = await register(user);

        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.loginUser = async (rawUser) => {
    try {
        console.log("Login attempt for:", rawUser.email);

        const { error } = validateLogin(rawUser);
        if (error) {
            console.log("Validation error:", error.details);
            return Promise.reject(error);
        }

        const loggedUser = await login(rawUser);
        console.log("Login successful for:", rawUser.email);

        return Promise.resolve(loggedUser);
    } catch (error) {
        console.error("Login failed:", error.message, error.status);
        return Promise.reject(error);
    }
}; 
exports.getUsers = async () => {
    try {
        const users = await find();
        return Promise.resolve(users);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getUser = async (userId) => {
    try {
        const user = await findOne(userId);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.updateUser = async (userId, rawUser) => {
    try {
        const user = { ...rawUser };
        const updatedUser = await update(userId, user);
        return Promise.resolve(updatedUser);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.changeUserBusinessStatus = async (userId) => {
    try {
        const user = await changesBizStatus(userId);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.deleteUser = async (userId) => {
    try {
        const user = await remove(userId);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};