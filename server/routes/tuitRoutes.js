const express = require("express");
const {
  getTuits,
  createTuit,
  deleteTuit,
} = require("../controllers/tuitController");

const router = express.Router();

router.get("/", getTuits);
router.post("/create", createTuit);
router.delete("/delete/:idTuit", deleteTuit);

module.exports = router;
