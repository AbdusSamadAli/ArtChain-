const express = require("express");
const { googleSignIn } = require("../controllers/authcontroller");

const router = express.Router();

router.post("/google", googleSignIn);

module.exports = router;
