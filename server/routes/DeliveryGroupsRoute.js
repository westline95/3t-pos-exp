import express from "express";
import DeliveryGroupsController from "../controllers/DeliveryGroupsController.js";

const DeliveryGroupsRoute = express.Router();

DeliveryGroupsRoute.post("/add/delivery-group", DeliveryGroupsController.setDeliveryGroup);
DeliveryGroupsRoute.get("/all/delivery-group", DeliveryGroupsController.getAllDeliveryGroup);
DeliveryGroupsRoute.get("/delivery-group/by", DeliveryGroupsController.getDeliveryGroupByID);
DeliveryGroupsRoute.put("/edit/delivery-group", DeliveryGroupsController.editDeliveryGroup);
DeliveryGroupsRoute.patch("/edit-minor/delivery-group", DeliveryGroupsController.editDeliveryGroup);
DeliveryGroupsRoute.delete("/del/delivery-group", DeliveryGroupsController.deleteDeliveryGroup);

export default DeliveryGroupsRoute;