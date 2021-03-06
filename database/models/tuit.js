const { Schema, model } = require("mongoose");

const tuitSchema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tuit = model("tuit", tuitSchema, "tuits");

module.exports = Tuit;
