const debug = require("debug")("tuitah:tuitController");
const Tuit = require("../../database/models/tuit");

const getTuits = async (req, res, next) => {
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

const deleteTuit = async (req, res, next) => {
  const { idTuit } = req.params;
  try {
    const searchedTuit = await Tuit.findByIdAndDelete(idTuit);
    if (searchedTuit) {
      res.json({ id: searchedTuit.id });
    } else {
      const error = new Error("Tuit not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Bad Request!";
    next(error);
  }
};

module.exports = { getTuits, createTuit, deleteTuit };
