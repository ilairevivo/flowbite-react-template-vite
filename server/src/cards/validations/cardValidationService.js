const validateCardWithJoi = require('./joi/validateCardWithJoi');
const validator = undefined || "joi";

const validateCard = (card) => {
  if (validator === 'joi') {
    return validateCardWithJoi(card);
  } else {
    throw new Error('Validation method not implemented');
  }
}

module.exports = validateCard;