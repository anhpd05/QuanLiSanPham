const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller");
const validateUser = require("../../validates/client/user.validate")


router.get("/register", controller.register);

router.post("/register", validateUser.registerPost ,controller.registerPost);

router.get("/login", controller.login);

router.post("/login",validateUser.loginPost , controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot",controller.forgotPassword);

router.post("/password/forgot", validateUser.forgotPass ,controller.forgotPasswordPost);

router.get("/password/otp",controller.otpPassword);

router.post("/password/otp",controller.otpPasswordPost);


module.exports = router