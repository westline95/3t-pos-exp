import express from "express";
import InvSettController from "../controllers/InvSettController.js";

const InvSettRoute = express.Router();

InvSettRoute.get("/inv-sett", InvSettController.getInvSett);
InvSettRoute.put("/updt/invsett", InvSettController.updateInvSett);

export default InvSettRoute;