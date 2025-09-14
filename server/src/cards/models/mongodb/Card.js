const mongoose = require('mongoose');
const Address = require('./Address');
const Image = require('./Image');
const { DEFAULT_VALIDATION } = require('../../helpers/mongooseValidators');

const cardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 1027,
        trim: true,
        lowercase: true,
    },
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
    web: {
        type: String,
        match: RegExp(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/),
        trim: true,
        lowercase: true,
        default: "N/A"

    },
    image: Image,
    address: Address,
    bizNumber: {
        type: Number,
        min: 100000,
        max: 9999999,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true
    },
    likes: [{type: String}]
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card; 