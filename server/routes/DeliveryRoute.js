import express from "express";
import DeliveryController from "../controllers/DeliveryController.js";


const DeliveryRoute = express.Router();

DeliveryRoute.post("/delivery", DeliveryController.createDelivery);
DeliveryRoute.patch("/delivery/status", DeliveryController.updateStatusDelivery);
DeliveryRoute.patch("/delivery/assign", DeliveryController.assignCourier);
DeliveryRoute.get("/delivery/all", DeliveryController.getAllDelivery);

export default DeliveryRoute;