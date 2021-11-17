const express = require("express");
const { getTuit, createTuit } = require("../controllers/tuitController");

const router = express.Router();

router.get("/", getTuit);
router.post("/create", createTuit);

module.exports = router;
