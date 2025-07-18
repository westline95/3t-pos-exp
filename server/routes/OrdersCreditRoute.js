import express from "express";
import OrdersCreditController from "../controllers/OrdersCreditController.js";

const OrdersCreditRoute = express.Router();

OrdersCreditRoute.get("/orders-credit", OrdersCreditController.getOrderCreditByCust);
// RORoute.post("/ro", OrdersCreditController.insertRO);
// RORoute.delete("/ro", OrdersCreditController.deleteRO);
// RORoute.get("/ro/by", OrdersCreditController.getROByOrderID);
// RORoute.put("/ro/update", OrdersCreditController.updateRO);
// // RORoute.put("/ro/updates", OrdersCreditController.updateFullRO);
// RORoute.patch("/ro/half-update", OrdersCreditController.updateROStatus);

export default OrdersCreditRoute;