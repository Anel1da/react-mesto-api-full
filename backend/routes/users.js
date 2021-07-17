const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getMe,
} = require("../controllers/users");

// /users
router.get("/", getUsers);
router.get("/me", getMe);
router.get(
  "/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUserById,
);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
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
  updateAvatar,
);

module.exports = router;
