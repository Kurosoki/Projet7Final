/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user.controller");

const GuardAuth = require("../middleware/GuardAuth");

/* Routage User */
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", GuardAuth, userCtrl.getAllUser);

module.exports = router;
