import Joi from "joi";

export const updateCardSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(256)
    .required()
    .messages({
      "string.empty": "title is required",
      "string.min": "title must be at least 2 characters",
      "string.max": "title cannot exceed 256 characters",
    })
    .required(),
  subtitle: Joi.string()
    .min(2)
    .max(256)
    .required()
    .messages({
      "string.empty": "subtitle is required",
      "string.min": "subtitle must be at least 2 characters",
      "string.max": "subtitle cannot exceed 256 characters",
    })
    .required(),
  description: Joi.string()
    .min(2)
    .max(256)
    .required()
    .messages({
      "string.empty": "description is required",
      "string.min": "description must be at least 2 characters",
      "string.max": "description cannot exceed 256 characters",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^0[2-9]\d{7,8}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone must be a valid Israeli phone number",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  web: Joi.string()
    .min(2)
    .max(256)
    .required()
    .messages({
      "string.empty": "web is required",
      "string.min": "web must be at least 2 characters",
      "string.max": "web cannot exceed 256 characters",
    })
    .required(),
  image: Joi.object({
    url: Joi.string().uri().min(10).required().messages({
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
    }),
    houseNumber: Joi.number().required().messages({
      "number.base": "House number must be a number",
      "any.required": "House number is required",
    }),
    zip: Joi.number().required().messages({
      "number.base": "ZIP code must be a number",
    }),
  })
});

export default updateCardSchema;
export type UpdateCard = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
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
export const validateUpdateCard = (cardData: UpdateCard) => {
  return updateCardSchema.validate(cardData, { abortEarly: false });
};
