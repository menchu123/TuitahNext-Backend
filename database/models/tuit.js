const { Schema, model } = require("mongoose");

const tuitSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tuit = model("tuit", tuitSchema, "tuits");

module.exports = Tuit;
