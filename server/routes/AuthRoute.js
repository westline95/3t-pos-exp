import express from "express";
import handleLogin from "../controllers/AuthController.js";


const AuthRouter = express.Router();

AuthRouter.post("/auth", handleLogin);

export default AuthRouter;