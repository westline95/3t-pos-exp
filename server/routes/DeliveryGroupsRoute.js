import express from "express";
import DeliveryGroupsController from "../controllers/DeliveryGroupsController.js";

const DeliveryGroupsRoute = express.Router();

DeliveryGroupsRoute.post("/add/delivery-group", DeliveryGroupsController.setDeliveryGroup);
DeliveryGroupsRoute.get("/all/delivery-group", DeliveryGroupsController.getAllDeliveryGroup);
DeliveryGroupsRoute.get("/delivery-group/by", DeliveryGroupsController.getDeliveryGroupByID);
DeliveryGroupsRoute.get("/delivery-group/by/emp", DeliveryGroupsController.getDeliveryGroupActiveByEmployee);
DeliveryGroupsRoute.put("/edit/delivery-group", DeliveryGroupsController.editDeliveryGroup);
DeliveryGroupsRoute.patch("/edit-minor/delivery-group", DeliveryGroupsController.editDeliveryGroup);
DeliveryGroupsRoute.delete("/del/delivery-group", DeliveryGroupsController.deleteDeliveryGroup);
DeliveryGroupsRoute.delete("/cancel/delivery-group", DeliveryGroupsController.cancelDeliveryGroup);

export default DeliveryGroupsRoute;