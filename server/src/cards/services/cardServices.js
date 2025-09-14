const {
    find,
    findMyCards,
    findOne,
    create,
    update,
    like,
    remove
} = require('../models/cardsDataAccesServise');
const validateCard = require('../validations/cardValidationService');
const normalizeCard = require('../helpers/normalizeCard');

exports.getCards = async () => {
    try {
        const cards = await find();
        return Promise.resolve(cards);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getMyCards = async (userId) => {
    try {
        const myCards = await findMyCards(userId);
        return Promise.resolve(myCards);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getCard = async (cardId) => {
    try {
        const card = await findOne(cardId);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.createCard = async (rawCard) => {
    try {
        const { error } = validateCard(rawCard);
        if (error) {
            return Promise.reject(error);
        }

        const card = await normalizeCard(rawCard);
        const newCard = await create(card);

        

        return Promise.resolve(newCard);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.updateCard = async (cardId, rawCard) => {
    try {
        const card = { ...rawCard, updatedAt: new Date() };
        const updatedCard = await update(cardId, card);
        return Promise.resolve(updatedCard);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.likeCard = async (cardId, userId) => {
    try {
        const likedCard = await like(cardId, userId);
        return Promise.resolve(likedCard);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.deleteCard = async (id) => {
    try {
        const removedCard = await remove(id);
        return Promise.resolve(removedCard);
    } catch (error) {
        return Promise.reject(error);
    }
};