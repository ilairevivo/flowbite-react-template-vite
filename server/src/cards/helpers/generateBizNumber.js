const Card = require('../models/mongodb/Card');
const lodbash = require('lodash');
const { handleBadRequest } = require('../../utlis/errorHandler');

const generateBizNumber = async () => {
    try {
        const random = lodbash.random(100000, 999999);
        const card = await Card.findOne({ bizNumber: random });

        if (card) {
            return generateBizNumber();
        }
        return random;

    } catch (error) {
        handleBadRequest("generateBizNumber ", error.message);
    }
};

module.exports = generateBizNumber;