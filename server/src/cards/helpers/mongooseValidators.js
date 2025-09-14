const URL = {
    type: String,
    required: true,
    match: RegExp(/^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-.]*)*\/?$/),
    trim: true,
    lowercase: true
};

const DEFAULT_VALIDATION = {
    type: String,
    required: true,
    minLength: 2, 
    maxLength: 256,
    trim: true,
    lowercase: true,
};

module.exports = {
    URL, 
    DEFAULT_VALIDATION
};