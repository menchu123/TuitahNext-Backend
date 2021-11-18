const express = require("express");
const {
  getTuits,
  createTuit,
  deleteTuit,
  addLike,
} = require("../controllers/tuitController");
const { validate } = require("express-validation");
const tuitCreateSchema = require("../schemas/tuitSchemas");

const router = express.Router();

router.get("/", getTuits);
router.post("/create", validate(tuitCreateSchema), createTuit);
router.delete("/delete/:idTuit", deleteTuit);
router.patch("/likes/:idTuit", addLike);

module.exports = router;
