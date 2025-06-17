import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required().messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot exceed 256 characters",
    }),
    middle: Joi.string().min(2).max(256).allow("").optional().messages({
      "string.min": "Middle name must be at least 2 characters long",
      "string.max": "Middle name cannot exceed 256 characters",
    }),
    last: Joi.string().min(2).max(256).required().messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters long",
      "string.max": "Last name cannot exceed 256 characters",
    }),
  }).required(),

  phone: Joi.string()
    .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .rule({
      message:
        "Phone number must be a valid Israeli phone number (e.g., 050-123-4567)",
    })
    .required()
    .messages({
      "string.empty": "Phone number is required",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

  password: Joi.string()
    .ruleset.regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/,
    )
    .rule({
      message:
        "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
    })
    .required()
    .messages({
      "string.empty": "Password is required",
    }),

  copyPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Please confirm your password",
    "any.only": "Passwords do not match",
  }),

  image: Joi.object({
    url: Joi.string().uri().allow("").optional().messages({
      "string.uri": "Image URL must be a valid URL",
    }),
    alt: Joi.string().min(2).max(256).allow("").optional().messages({
      "string.min": "Image alt text must be at least 2 characters long",
      "string.max": "Image alt text cannot exceed 256 characters",
    }),
  }).optional(),

  address: Joi.object({
    state: Joi.string().min(2).max(256).allow("").optional().messages({
      "string.min": "State must be at least 2 characters long",
      "string.max": "State cannot exceed 256 characters",
    }),
    country: Joi.string().min(2).max(256).required().messages({
      "string.empty": "Country is required",
      "string.min": "Country must be at least 2 characters long",
      "string.max": "Country cannot exceed 256 characters",
    }),
    city: Joi.string().min(2).max(256).required().messages({
      "string.empty": "City is required",
      "string.min": "City must be at least 2 characters long",
      "string.max": "City cannot exceed 256 characters",
    }),
    street: Joi.string().min(2).max(256).required().messages({
      "string.empty": "Street is required",
      "string.min": "Street must be at least 2 characters long",
      "string.max": "Street cannot exceed 256 characters",
    }),
    houseNumber: Joi.number().integer().min(1).max(99999).required().messages({
      "number.base": "House number must be a number",
      "number.integer": "House number must be a whole number",
      "number.min": "House number must be at least 1",
      "number.max": "House number cannot exceed 99999",
      "any.required": "House number is required",
    }),
    zip: Joi.number().integer().min(1000).max(999999).required().messages({
      "number.base": "ZIP code must be a number",
      "number.integer": "ZIP code must be a whole number",
      "number.min": "ZIP code must be at least 4 digits",
      "number.max": "ZIP code cannot exceed 6 digits",
      "any.required": "ZIP code is required",
    }),
  }).required(),

  isBusiness: Joi.boolean().default(false).messages({
    "boolean.base": "Business account selection must be true or false",
  }),
});
