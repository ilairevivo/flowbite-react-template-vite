const express = require("express");
const router = express.Router();
const cardsController = require("../cards/routes/cardController");
const usersController = require("../users/routes/usersController");
const {handleError} = require("../utlis/errorHandler");

router.use("/cards", cardsController);
router.use("/users", usersController);

router.use((req, res) => handleError(res, 404, "Page not Found!"));

module.exports = router;
