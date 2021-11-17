const Tuit = require("../../database/models/tuit");

const getTuit = async (req, res, next) => {
  try {
    const allTuits = await Tuit.find();
    res.json(allTuits);
  } catch (error) {
    next(error);
  }
};

module.exports = getTuit;
