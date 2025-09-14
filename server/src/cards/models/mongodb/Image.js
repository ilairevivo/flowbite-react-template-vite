const mongoose = require('mongoose');
const {DEFAULT_VALIDATION, URL} = require('../../helpers/mongooseValidators');

const Image = new mongoose.Schema({
    url: URL,
    alt: DEFAULT_VALIDATION

}, { _id: false });

module.exports = Image;