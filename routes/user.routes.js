const express = require("express");
const router = express.Router();

const cleanBody = require("../middleware/cleanbody");
const { validateToken } = require("../middleware/validateToken");

const AuthController = require("../controllers/user.controller");

router.post("/signup", cleanBody, AuthController.Signup);

// router.patch("/activate", cleanBody, AuthController.Activate);

router.post("/login", cleanBody, AuthController.Login);

router.patch("/forgot", cleanBody, AuthController.ForgotPassword);

router.patch("/reset", cleanBody, AuthController.ResetPassword);

router.get("/referred", validateToken, AuthController.ReferredAccounts);

router.get("/logout", validateToken, AuthController.Logout);

module.exports = router;
