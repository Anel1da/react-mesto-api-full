const Card = require("../models/cards");
const BadRequestError = require("../errors/bad-request-err"); // 400
const NotFoundError = require("../errors/not-found-err"); // 404
const ForbiddenError = require("../errors/forbidden-err"); // 403

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error("NotValidId"))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.remove();
        res.status(200).send({ message: "Карточка удалена" });
      } else {
        throw new ForbiddenError("Недостаточно прав для удаления карточки");
      }
    })
    .catch((err) => {
      if (err.message === "NotValidId") {
        next(new NotFoundError("Запрашиваемая карточка не найдена"));
      }
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.message === "ValidationError") {
        next(new BadRequestError("Переданы некорректные данные"));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error("NotValidId"))
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.message === "NotValidId") {
        next(new NotFoundError("Запрашиваемая карточка не найдена"));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error("NotValidId"))
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.message === "NotValidId") {
        next(new NotFoundError("Запрашиваемая карточка не найдена"));
      }
      next(err);
    });
};
