import express from "express";
import InvSettController from "../controllers/InvSettController.js";
import accessValidation from "../api/auth.js";

const InvSettRoute = express.Router();

InvSettRoute.get("/inv-sett",accessValidation, InvSettController.getInvSett);
InvSettRoute.put("/updt/inv-sett",accessValidation, InvSettController.updateInvSett);

export default InvSettRoute;