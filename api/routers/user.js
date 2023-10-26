const express = require("express");
const router = express.Router();

const { register, verifyToken, login } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyToken);

module.exports = router;
