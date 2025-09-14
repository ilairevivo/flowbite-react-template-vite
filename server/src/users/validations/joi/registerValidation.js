const joi = require('joi');

const registerValidation = (user) => {
    const schema = joi.object({
        name: joi.object().keys({
            first: joi.string().min(2).max(256).required(),
            middle: joi.string().min(2).max(256).allow(""),
            last: joi.string().min(2).max(256).required(),
        }).required(),
        isBusiness: joi.boolean().required(),
        phone: joi.string()
            .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
            .rule({ message: 'card phone must be valid Israeli phone number' })
            .required(),

        email: joi.string()
            .ruleset.regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
            .rule({ message: 'card email must be a valid email address' })
            .required(),
        password: joi.string()
            .min(9)
            .ruleset.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/)
            .rule({ message: 'Password must be at least 9 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.' })
            .required(),

        image: joi.object().keys({
            url: joi.string().uri().allow(""),
            alt: joi.string().min(2).max(256).allow("")
        }),
        address: joi.object().keys({
            state: joi.string().min(2).max(256).allow(""),
            country: joi.string().min(2).max(256).required(),
            city: joi.string().min(2).max(256).required(),
            street: joi.string().min(2).max(256).required(),
            houseNumber: joi.number().greater(0).required(),
            zip: joi.number().min(4).allow("")
        }),
    });

    return schema.validate(user);
}
module.exports = registerValidation;