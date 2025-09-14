const { handleBadRequest } = require('../../utlis/errorHandler');
const { comparePassword } = require('../helpers/bcrypt');
const User = require('./mongodb/User');
const lodbash = require('lodash');
const config = require('config');
const { generateAuthToken } = require('../../auth/Providers/jwt');
const db = config.get('DB');

exports.register = async (normalizedUser) => {
    if (db === "mongodb") {
        try {
            const { email } = normalizedUser;
            let user = await User.findOne({ email });
            if (user) throw new Error("User already registered");

            user = new User(normalizedUser);
            user = await user.save();

            user = lodbash.pick(user, ["name", "email", "_id"]);
            return Promise.resolve(user);
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("registerUser new user not in mongodb");
};

exports.login = async ({ email, password }) => {
    if (db === "mongodb") {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return Promise.reject({ status: 400, message: " invalid email or password" });
            }

            const validPassword = await comparePassword(password, user.password);
            if (!validPassword){
                return Promise.reject({ status: 400, message: " invalid email or password" });
            }
            if (user.isLoggedIn) {
                return Promise.reject({ status: 400, message: "User is already logged in" });
            }
            const token = generateAuthToken({
                _id: user._id.toString(),  
                isAdmin: user.isAdmin || false,
                isBusiness: user.isBusiness || false
            });

            const userToReturn = lodbash.pick(user, ["name", "email", "_id", "isBusiness", "isAdmin"]);

           
            return Promise.resolve({
                user: userToReturn,
                token: token
            });
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        } 
    }
    return Promise.resolve("loginUser user not in mongodb");
};
exports.find = async () => {
    if (db === 'mongodb') {
        try {
            const users = await User.find().select('-password');
            return Promise.resolve(users);
        } catch (error) {
            return handleBadRequest("MongoDB error", error);
        }
    }
    return Promise.resolve([]);
};

exports.findOne = async (id) => {
    if (db === 'mongodb') {
        try {
            const user = await User.findById(id).select('-password -__v -isAdmin');
            if (!user) {
                return Promise.reject("Could not find this user in the database");
            }
            return Promise.resolve(user);
        } catch (error) {
            error = { status: 404, message: "MongoDB error" };
            Promise.reject(error);
            return handleBadRequest("MongoDB error", error);
        }
    }
    return Promise.resolve({});
};

exports.update = async (id, normalizedUser) => {
    if (db === 'mongodb') {
        try {
            const user = await User.findByIdAndUpdate(
                id,
                normalizedUser,
                { new: true }
            ).select('-password -__v');

            if (!user) {
                return Promise.reject("Could not find this user because a user wiith this ID cannot found in the database");
            }
            return Promise.resolve(user);
        } catch (error) {
            error = { status: 404, message: "MongoDB error" };
            Promise.reject(error);
            return handleBadRequest("MongoDB error", error);
        }
    }
    return Promise.resolve(`User updated not in mongoDB!`);
};

exports.changesBizStatus = async (id) => {
    if (db === 'mongodb') {
        try {
            
            const user = await User.findByIdAndUpdate(
                id,
                [{ $set: { isBusiness: { $not: "$isBusiness" } } }],
                { new: true }
            ).select('-password -__v -isAdmin');

            if (!user) {
                return Promise.reject("Could not find this user because a user wiith this ID cannot found in the database");
            }
            return Promise.resolve(user);

        } catch (error) {
            error = { status: 404, message: "MongoDB error" };
            Promise.reject(error);
            return handleBadRequest("MongoDB error", error);
        }
    }
    return Promise.resolve(`User updated not in mongoDB!`);
};


exports.remove = async (id) => {
    if (db === 'mongodb') {
        try {
            const user = await User.findByIdAndDelete(id).select('-password -__v');
            if (!user) {
                return Promise.reject("Could not find this user because a user wiith this ID cannot found in the database");
            }
            return Promise.resolve(user);
        } catch (error) {
            error = { status: 404, message: "MongoDB error" };
            Promise.reject(error);
            return handleBadRequest("MongoDB error", error);
        }
    }
    return Promise.resolve(`user deleted not in mongoDB!`);
};


