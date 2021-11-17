const debug = require("debug")("tuitah:tuitController");
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
  try {
    const newTuit = await Tuit.create(req.body);
    res.json(newTuit);
  } catch {
    const error = new Error("Something error tuit!!!");
    error.code = 400;
    next(error);
  }
};

module.exports = { getTuit, createTuit };
