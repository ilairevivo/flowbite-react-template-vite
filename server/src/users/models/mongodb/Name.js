const mongoose = require('mongoose');
const { DEFAULT_VALIDATION } = require('../../helpers/moongosValidatore');
const NameSchema = new mongoose.Schema({
    first: DEFAULT_VALIDATION,
    last: DEFAULT_VALIDATION
});


module.exports = NameSchema;