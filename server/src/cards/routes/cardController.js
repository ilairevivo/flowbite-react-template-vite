const express = require('express');
const router = express.Router();
const auth = require('../../auth/authService');
const { handleError } = require('../../utlis/errorHandler');
const {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard
} = require('../services/cardServices');
const Card = require('../models/mongodb/Card');

router.get('/', async (req, res) => {
  try {
    const cards = await getCards();
    res.status(200).json(cards);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

router.get('/my-cards', auth, async (req, res) => {
  try {
    const cards = await getMyCards(req.user.id);
    res.json(cards);
  } catch (error) {
    return handleError(res, 500, error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const card = await getCard(id);
    res.status(200).json(card);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    if (!req.user.isBusiness) {
      return handleError(res, 403,
        "Authorization Error: Only business users can create business cards"
      );
    }

    const cardData = {
      ...req.body,
      user_id: req.user.id
    };

    const card = await createCard(cardData);
    res.status(201).json(card);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return handleError(res, 404, "Card not found");
    }

    if (card.user_id.toString() !== req.user.id) {
      return handleError(res, 403,
        "Authorization Error: Only the card owner can modify this card"
      );
    }

    const updatedCard = await updateCard(req.params.id, req.body);
    res.json(updatedCard);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const card = await likeCard(req.params.id, req.user.id);
    res.json(card);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return handleError(res, 404, "Card not found");
    }

    const isOwner = card.user_id.toString() === req.user.id;
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return handleError(res, 403,
        "Authorization Error: Only the card owner or admin can delete this card"
      );
    }

    await deleteCard(req.params.id);
    res.json({
      message: "Card deleted successfully",
      cardId: req.params.id
    });
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

module.exports = router;
