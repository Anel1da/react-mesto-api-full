require("dotenv").config();

const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");
const validator = require("validator");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-err"); // 404

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// настраиваем порт
const { PORT = 3000 } = process.env;

const { login, createUser } = require("./controllers/users");

// работа с роутами
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");

// мидлвэрыcd
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

// краш-тест сервера
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

// роуты регистрации и авторизации
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login,
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom((value, helpers) => {
        if (
          validator.isURL(value, {
            protocols: ["http", "https", "ftp"],
            require_tld: true,
            require_protocol: true,
          })
        ) return value;
        return helpers.message("Некорректный формат ссылки");
      }),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser,
);

app.use(auth);
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);
app.use(errorLogger);

// обработка ошибок
app.use("*", () => {
  throw new NotFoundError("Запрашиваемый ресурс не найден");
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server has starteds");
});
