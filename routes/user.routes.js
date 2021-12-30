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

// Admin Routers // TODO: Move to admin.routes.js

router.get("/all", AuthController.GetAllUsers);

router.get("/:id", AuthController.GetSingleUser);

// router.delete("/:id", AuthController.DeleteUser);

module.exports = router;
