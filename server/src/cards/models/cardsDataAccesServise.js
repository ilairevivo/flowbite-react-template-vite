const { handleBadRequest } = require('../../utlis/errorHandler');
const Card = require('./mongodb/Card');
const config = require('config');

const db = config.get('DB');

exports.findOne = async (id) => {
    if (db === 'mongodb') {
        try {
            const card = await Card.findById(id);
            if (!card) {
                return Promise.reject("Could not find this card in the database");
            }
            return Promise.resolve(card);
        } catch (error) {
            error = { status: 404, message: "MongoDB error" };
            Promise.reject(error);
            return handleBadRequest("MongoDB error", error);
        }
    }
    return Promise.resolve([]);
};

exports.create = async (normalizedCard) => {
    if (db === 'mongodb') {
        try {
            const card = new Card(normalizedCard);
            const savedCard = await card.save();
            return Promise.resolve(savedCard);
        } catch (error) {
            error.status = 400; 
            return Promise.reject(error);
        }
    }
    return Promise.resolve("created card not in database");
};

exports.find = async () => {
    if (db === 'mongodb') {
        try {
            const cards = await Card.find();
            return Promise.resolve(cards);
        } catch (error) {
            error = { status: 404, message: "MongoDB error" };
            Promise.reject(error);
            return handleBadRequest("MongoDB error", error);
        }
    }
    return Promise.resolve([]);
};

exports.findMyCards = async (userId) => {
    if (db === 'mongodb') {
        try {
            const cards = await Card.find({ user_id: userId });
            return Promise.resolve(cards);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return Promise.resolve(`my cards`);
};

exports.update = async (id, normalizedCard) => {
    if (db === 'mongodb') {
        try {
            const card = await Card.findByIdAndUpdate(
                id,
                normalizedCard,
                { new: true }
            );
            if (!card) {
                return Promise.reject("Could not find this card because a card wiith this ID cannot found in the database");
            }
            return Promise.resolve(card);
        } catch (error) {
            error = { status: 404, message: "MongoDB error" };
            Promise.reject(error);
            return handleBadRequest("MongoDB error", error);
        }
    }
    return Promise.resolve(`card deleted not in mongoDB!`);
};

exports.like = async (cardId, userId) => {
    if (db === 'mongodb') {
        try {
            const card = await Card.findById(cardId);
            if (!card) {
                return Promise.reject("Could not find this card because a card wiith this ID cannot found in the database");
            }

            const likeIndex = card.likes.indexOf(userId);
            if (likeIndex === -1) {
                card.likes.push(userId);
            } else {
                card.likes.splice(likeIndex, 1);
            }

            const savedCard = await card.save();
            return Promise.resolve(savedCard);
        } catch (error) {
            error = { status: 404, message: "MongoDB error" };
            Promise.reject(error);
            return handleBadRequest("MongoDB error", error);
        }
    }
    return Promise.resolve(`card updated!`);
};
 
exports.remove = async (id) => {
    if (db === 'mongodb') {
        try {
            const card = await Card.findByIdAndDelete(id);
            if (!card) {
                return Promise.reject("Could not find this card because a card wiith this ID cannot found in the database");
            }
            return Promise.resolve(card);
        } catch (error) {
            error = { status: 404, message: "MongoDB error" };
            Promise.reject(error);
            return handleBadRequest("MongoDB error", error);
        }
    }
    return Promise.resolve(`card deleted! not in mongoDB`);
};