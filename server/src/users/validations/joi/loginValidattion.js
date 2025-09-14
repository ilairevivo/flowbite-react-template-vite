const joi = require('joi');

const loginValidation = (user) => {
    const schema = joi.object({
        email: joi.string()
            .ruleset.regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
            .rule({ message: 'card email must be a valid email address' })
            .required(),
        password: joi.string()
            .min(9)
            .ruleset.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/)
            .rule({ message: 'Password must be at least 9 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.' })
            .required(),
    });

    return schema.validate(user);
}
module.exports = loginValidation;