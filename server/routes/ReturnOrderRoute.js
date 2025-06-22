import express from "express";
import ReturnOrdersController from "../controllers/ReturnOrdersController.js";

const RORoute = express.Router();

RORoute.get("/ro", ReturnOrdersController.getAllRO);
RORoute.post("/ro", ReturnOrdersController.insertRO);
RORoute.delete("/ro", ReturnOrdersController.deleteRO);
RORoute.get("/ro/by", ReturnOrdersController.getROByOrderID);
RORoute.put("/ro/update", ReturnOrdersController.updateRO);
RORoute.patch("/ro/half-update", ReturnOrdersController.updateROStatus);

export default RORoute;