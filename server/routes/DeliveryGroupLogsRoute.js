import express from "express";
import DeliveryGroupLogsController from "../controllers/DeliveryGroupLogsController.js";

const DeliveryGroupLogsRoute = express.Router();

DeliveryGroupLogsRoute.post("/add/dg-logs", DeliveryGroupLogsController.addDeliveryGroupLog);
DeliveryGroupLogsRoute.put("/update/dg-logs", DeliveryGroupLogsController.UpdateDeliveryGroupLog);
// DeliveryGroupsRoute.post("/add-more-item/delivery-group", DeliveryGroupsController.addMoreItemDeliveryGroup);
// DeliveryGroupsRoute.get("/all/delivery-group", DeliveryGroupsController.getAllDeliveryGroup);
// DeliveryGroupsRoute.get("/delivery-group/by", DeliveryGroupsController.getDeliveryGroupByID);
// DeliveryGroupsRoute.get("/delivery-group/by/emp", DeliveryGroupsController.getDeliveryGroupActiveByEmployee);
// DeliveryGroupsRoute.get("/delivery-group/by/dgid-emp", DeliveryGroupsController.getDeliveryGroupByID4Employee);
// DeliveryGroupsRoute.get("/delivery-group/by/dgid-admin", DeliveryGroupsController.getDeliveryGroupByID4Admin);
// DeliveryGroupsRoute.put("/edit/delivery-group", DeliveryGroupsController.editDeliveryGroup);
// DeliveryGroupsRoute.put("/edit/delivery-group-list", DeliveryGroupsController.editDeliveryGroupList);
// DeliveryGroupsRoute.patch("/edit-minor/delivery-group", DeliveryGroupsController.editDeliveryGroup);
// DeliveryGroupsRoute.delete("/del/delivery-group", DeliveryGroupsController.deleteDeliveryGroup);
// DeliveryGroupsRoute.patch("/status/delivery-group/:id/:status", DeliveryGroupsController.updateStatusDeliveryGroup);

export default DeliveryGroupLogsRoute;