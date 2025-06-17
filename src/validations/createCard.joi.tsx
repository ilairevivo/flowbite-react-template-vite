import Joi from "joi";

export const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required().messages({
    "string.min": "שם העסק חייב להכיל לפחות 2 תווים",
    "string.max": "שם העסק לא יכול להכיל יותר מ-256 תווים",
    "any.required": "שם העסק הוא שדה חובה",
  }),

  subtitle: Joi.string().min(2).max(256).required().messages({
    "string.min": "תחום העסק חייב להכיל לפחות 2 תווים",
    "string.max": "תחום העסק לא יכול להכיל יותר מ-256 תווים",
    "any.required": "תחום העסק הוא שדה חובה",
  }),

  description: Joi.string().min(2).max(1024).required().messages({
    "string.min": "תיאור העסק חייב להכיל לפחות 2 תווים",
    "string.max": "תיאור העסק לא יכול להכיל יותר מ-1024 תווים",
    "any.required": "תיאור העסק הוא שדה חובה",
  }),

  phone: Joi.string()
    .ruleset.regex(/0[2-9]\d{7,8}$/)
    .rule({
      message:
        "מספר הטלפון חייב להיות בפורמט ישראלי תקין (לדוגמה: 050-1234567)",
    })
    .required()
    .messages({
      "any.required": "מספר טלפון הוא שדה חובה",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "כתובת אימייל לא תקינה",
      "any.required": "אימייל הוא שדה חובה",
    }),

  web: Joi.string().uri().allow("", null).optional().messages({
    "string.uri":
      "כתובת האתר חייבת להיות תקינה (לדוגמה: https://www.example.com)",
  }),

  image: Joi.object({
    url: Joi.string().uri().required().messages({
      "string.uri": "קישור התמונה חייב להיות תקין",
      "any.required": "קישור לתמונה הוא שדה חובה",
    }),

    alt: Joi.string().min(2).max(256).required().messages({
      "string.min": "תיאור התמונה חייב להכיל לפחות 2 תווים",
      "string.max": "תיאור התמונה לא יכול להכיל יותר מ-256 תווים",
      "any.required": "תיאור התמונה הוא שדה חובה",
    }),
  }).required(),

  address: Joi.object({
    state: Joi.string().allow("", null).optional().messages({
      "string.base": "שם המחוז חייב להיות טקסט",
    }),

    country: Joi.string().min(2).max(256).required().messages({
      "string.min": "שם המדינה חייב להכיל לפחות 2 תווים",
      "string.max": "שם המדינה לא יכול להכיל יותר מ-256 תווים",
      "any.required": "מדינה הוא שדה חובה",
    }),

    city: Joi.string().min(2).max(256).required().messages({
      "string.min": "שם העיר חייב להכיל לפחות 2 תווים",
      "string.max": "שם העיר לא יכול להכיל יותר מ-256 תווים",
      "any.required": "עיר הוא שדה חובה",
    }),

    street: Joi.string().min(2).max(256).required().messages({
      "string.min": "שם הרחוב חייב להכיל לפחות 2 תווים",
      "string.max": "שם הרחוב לא יכול להכיל יותר מ-256 תווים",
      "any.required": "רחוב הוא שדה חובה",
    }),

    houseNumber: Joi.number().integer().min(1).required().messages({
      "number.base": "מספר הבית חייב להיות מספר",
      "number.integer": "מספר הבית חייב להיות מספר שלם",
      "number.min": "מספر הבית חייב להיות גדול מ-0",
      "any.required": "מספר בית הוא שדה חובה",
    }),

    zip: Joi.number()
      .integer()
      .min(1000)
      .max(999999)
      .allow(null)
      .optional()
      .messages({
        "number.base": "מספר המיקוד חייב להיות מספר",
        "number.integer": "מספר המיקוד חייב להיות מספר שלם",
        "number.min": "מספר המיקוד חייב להיות גדול מ-1000",
        "number.max": "מספר המיקוד לא יכול להיות גדול מ-999999",
      }),
  }).required(),
});

export default createCardSchema;
