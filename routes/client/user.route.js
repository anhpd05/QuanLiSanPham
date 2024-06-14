const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller");
const validateUser = require("../../validates/client/user.validate")


router.get("/register", controller.register);

router.post("/register", validateUser.registerPost ,controller.registerPost);

router.get("/login", controller.login);

router.post("/login",validateUser.loginPost , controller.loginPost);

module.exports = router