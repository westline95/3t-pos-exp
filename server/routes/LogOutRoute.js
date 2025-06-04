import express from "express";
import handleLogout from "../controllers/LogOutController.js";

const LogOutRouter = express.Router();

LogOutRouter.get("/logout", handleLogout);

export default LogOutRouter;