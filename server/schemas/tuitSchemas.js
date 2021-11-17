const { Joi } = require("express-validation");

const tuitCreateSchema = {
  body: Joi.object({
    text: Joi.string().required(),
  }),
};

module.exports = tuitCreateSchema;
