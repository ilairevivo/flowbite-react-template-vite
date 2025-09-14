const chalk = require("chalk");

const handleError = async (res, status, message ) => {
  console.error(chalk.red(message));
  res.status(status).send(message); 
};
const handleBadRequest = async (validation, error) => {
  const status = error.status || 400;
  let errorMassage = `${validation}: ${error.message} ${status}`;
  error.message = errorMassage;
  return Promise.reject(error);
}

const handleJoiError = async ({ error }) => {
  const joiError = new Error(error.details[0].message);
  return handleBadRequest("Joi validation error", joiError);
}

module.exports = {
  handleError,
  handleJoiError,
  handleBadRequest
}