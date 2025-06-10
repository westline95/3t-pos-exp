import express from "express";
import DeliveryController from "../controllers/DeliveryController.js";


const DeliveryRoute = express.Router();

DeliveryRoute.post("/delivery", DeliveryController.createDelivery);
DeliveryRoute.patch("/delivery/status/:delivery_id", DeliveryController.updateStatusDelivery);
DeliveryRoute.patch("/delivery/assign/:delivery_id", DeliveryController.assignCourier);
DeliveryRoute.get("/delivery/all", DeliveryController.getAllDelivery);

export default DeliveryRoute;