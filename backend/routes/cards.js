const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

// /cards
router.get("/", getCards);
router.delete(
  "/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteCardById,
);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (
            validator.isURL(value, {
              protocols: ["http", "https", "ftp"],
              require_tld: true,
              require_protocol: true,
            })
          ) return value;
          return helpers.message("Некорректный формат ссылки");
        }),
    }),
  }),
  createCard,
);
router.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  likeCard,
);
router.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  dislikeCard,
);

module.exports = router;
