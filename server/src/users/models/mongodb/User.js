const mongoose = require('mongoose');
const NameSchema = require('./Name');
const { URL} = require('../../helpers/moongosValidatore');
const Address = require('./Address');

const userSchema = new mongoose.Schema({
    name: NameSchema,
    phone: {
        type: String,
        required: true,
        match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    },
    email: {
        type: String,
        required: true,
        match: RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 1024
    },
    image: {
        url: URL,
        alt: {
            type: String,
            default: "user image"
        }
    },
    address: Address,
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBusiness: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;