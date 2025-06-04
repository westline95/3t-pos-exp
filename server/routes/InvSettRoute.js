import express from "express";
import InvSettController from "../controllers/InvSettController.js";

const InvSettRoute = express.Router();

InvSettRoute.get("/inv-sett", InvSettController.getInvSett);
InvSettRoute.put("/updt/inv-sett", InvSettController.updateInvSett);

export default InvSettRoute;