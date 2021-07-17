const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require("../errors/bad-request-err"); // 400
const UnauthorizedError = require("../errors/unauthorized-err"); // 401
const NotFoundError = require("../errors/not-found-err"); // 404
const ConflictError = require("../errors/conflict-err"); // 409

// регистрация пользователя
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Переданы некорректные данные"));
      } else if (err.name === "MongoError" && err.code === 11000) {
        next(new ConflictError("Такой пользователь уже существует"));
      }
      next(err);
    });
};

// авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: "Авторизация прошла успешно" });
    })
    .catch(() => {
      throw new UnauthorizedError("Неправильные почта или пароль");
    })
    .catch(next);
};

// получение информации о текущем пользователе
module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error("NotValidId"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "NotValidId") {
        next(new NotFoundError("Запрашиваемый пользователь не найден"));
      } else {
        next(err);
      }
    });
};

// получение всех пользователей в базе
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

// поиск пользователя по id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error("NotValidId"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "CastError") {
        next(new BadRequestError("Переданы некорректные данные"));
      } else if (err.message === "NotValidId") {
        next(new NotFoundError("Запрашиваемый пользователь не найден"));
      } else {
        next(err);
      }
    });
};

// обновление профайла
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new BadRequestError(
      "Переданы некорректные данные, проверьте правильность заполнения полей"
    );
  }
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new Error("NotValidId"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "CastError") {
        next(new BadRequestError("Переданы некорректные данные"));
      } else if (err.message === "NotValidId") {
        next(new NotFoundError("Запрашиваемый пользователь не найден"));
      } else {
        next(err);
      }
    });
};

// обновление аватара
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new Error("NotValidId"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "CastError") {
        next(new BadRequestError("Переданы некорректные данные"));
      } else if (err.message === "NotValidId") {
        next(new NotFoundError("Запрашиваемый пользователь не найден"));
      } else {
        next(err);
      }
    });
};
