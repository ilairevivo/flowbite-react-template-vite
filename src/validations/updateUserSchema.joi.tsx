import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required().messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters",
      "string.max": "First name cannot exceed 256 characters",
    }),
    middle: Joi.string().min(2).max(256).allow("").messages({
      "string.min": "Middle name must be at least 2 characters",
      "string.max": "Middle name cannot exceed 256 characters",
    }),
    last: Joi.string().min(2).max(256).required().messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters",
      "string.max": "Last name cannot exceed 256 characters",
    }),
  }).required(),

  phone: Joi.string()
    .pattern(/^0[2-9]\d{7,8}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone must be a valid Israeli phone number",
    }),

  image: Joi.object({
    url: Joi.string().uri().min(14).required().messages({
      "string.empty": "Image URL is required",
      "string.uri": "Image URL must be a valid URL",
      "string.min": "Image URL must be at least 14 characters",
    }),
    alt: Joi.string().min(2).max(256).required().messages({
      "string.empty": "Image alt text is required",
      "string.min": "Image alt text must be at least 2 characters",
      "string.max": "Image alt text cannot exceed 256 characters",
    }),
  }).required(),

  address: Joi.object({
    state: Joi.string().max(256).allow("").messages({
      "string.max": "State cannot exceed 256 characters",
    }),
    country: Joi.string().max(256).required().messages({
      "string.empty": "Country is required",
      "string.max": "Country cannot exceed 256 characters",
    }),
    city: Joi.string().max(256).required().messages({
      "string.empty": "City is required",
      "string.max": "City cannot exceed 256 characters",
    }),
    street: Joi.string().max(256).required().messages({
      "string.empty": "Street is required",
      "string.max": "Street cannot exceed 256 characters",
    }),
    houseNumber: Joi.number().required().messages({
      "number.base": "House number must be a number",
      "any.required": "House number is required",
    }),
    zip: Joi.number().required().messages({
      "number.base": "ZIP code must be a number",
      "any.required": "ZIP code is required",
    }),
  }).required(),
});

export type UpdateUser = {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
};
export const validateUpdateUser = (userData: UpdateUser) => {
  return updateUserSchema.validate(userData, { abortEarly: false });
};
