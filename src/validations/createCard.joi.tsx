import Joi from "joi";

export const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required().messages({
    "string.min": "name must be at least 2 characters long",
    "string.max": "name must not exceed 256 characters",
    "any.required": "name is a required field",
  }),

  subtitle: Joi.string().min(2).max(256).required().messages({
    "string.min": "business field must be at least 2 characters long",
    "string.max": "business field must not exceed 256 characters",
    "any.required": "business field is a required field",
  }),

  description: Joi.string().min(2).max(1024).required().messages({
    "string.min": "description must be at least 2 characters long",
    "string.max": "description must not exceed 1024 characters",
    "any.required": "description is a required field",
  }),

  phone: Joi.string()
    .ruleset.regex(/0[2-9]\d{7,8}$/)
    .rule({
      message:
        "phone number must start with 0 and be followed by 2-9 and then 7-8 digits",
    })
    .required()
    .messages({
      "any.required": "phone number is a required field",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "email must be a valid email address",
      "any.required": "email is a required field",
    }),

  web: Joi.string().uri().allow("", null).optional().messages({
    "string.uri":
      "website URL must be a valid URI",
  }),

  image: Joi.object({
    url: Joi.string().uri().required().messages({
      "string.uri": "image URL must be a valid URI",
      "any.required": "image URL is a required field",
    }),

    alt: Joi.string().min(2).max(256).required().messages({
      "string.min":  "image alt text must be at least 2 characters long",
      "string.max": "image alt text must not exceed 256 characters",
      "any.required": "image alt text is a required field",
    }),
  }).required(),

  address: Joi.object({
    state: Joi.string().allow("", null).optional().messages({
      "string.base": "state must be a string",
    }),

    country: Joi.string().min(2).max(256).required().messages({
      "string.min": "country must be at least 2 characters long",
      "string.max": "country must not exceed 256 characters",
      "any.required": "country is a required field",
    }),

    city: Joi.string().min(2).max(256).required().messages({
      "string.min": "city must be at least 2 characters long",
      "string.max": "city must not exceed 256 characters",
      "any.required": "city is a required field",
    }),

    street: Joi.string().min(2).max(256).required().messages({
      "string.min": "street must be at least 2 characters long",
      "string.max": "street must not exceed 256 characters",
      "any.required": "street is a required field",
    }),

    houseNumber: Joi.number().integer().min(1).required().messages({
      "number.base": "house number must be a number",
      "number.integer": "house number must be an integer",
      "number.min": "house number must be at least 1",
      "any.required": "house number is a required field",
    }),

    zip: Joi.number()
      .integer()
      .min(1000)
      .max(999999)
      .allow(null)
      .optional()
      .messages({
        "number.base": "zip code must be a number",
        "number.integer": "zip code must be an integer",
        "number.min":" zip code must be at least 1000",
        "number.max": "zip code must not exceed 999999",
      }),
  }).required(),
});

export default createCardSchema;
