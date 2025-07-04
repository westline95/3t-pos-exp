import express from "express";
import ReturnOrderItemsController from "../controllers/ReturnOrderItemsController.js";

const ROItemRoute = express.Router();

ROItemRoute.get("/ro-items", ReturnOrderItemsController.getAllROItem);
ROItemRoute.post("/ro-item", ReturnOrderItemsController.insertROItems);
ROItemRoute.delete("/ro-item", ReturnOrderItemsController.deleteROItem);
ROItemRoute.get("/ro/by", ReturnOrderItemsController.getROItemByID);
ROItemRoute.put("/ro/update", ReturnOrderItemsController.updateROItem);
ROItemRoute.patch("/ro/half-update", ReturnOrderItemsController.updateROItem);

export default ROItemRoute;