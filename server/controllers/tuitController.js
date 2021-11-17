const Tuit = require("../../database/models/tuit");

const getTuit = async (req, res, next) => {
  try {
    const allTuits = await Tuit.find();
    res.json(allTuits);
  } catch (error) {
    next(error);
  }
};

const createTuit = async (req, res, next) => {
  const { text } = req.body;
  try {
    const newTuit = await Tuit.create({
      text,
    });
    res.json(newTuit);
  } catch (error) {
    (error.code = 400), (error.message = "Something error tuit!!!");
    next(error);
  }
};

module.exports = { getTuit, createTuit };
