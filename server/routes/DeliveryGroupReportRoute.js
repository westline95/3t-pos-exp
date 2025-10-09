import express from "express";
import DeliveryGroupsReportController from "../controllers/DeliveryGroupsReportController.js";

const DeliveryGroupsReportRoute = express.Router();

DeliveryGroupsReportRoute.post("/add/delivery-group-report", DeliveryGroupsReportController.createDeliveryGroupReport);
// DeliveryGroupsReportRoute.get("/all/delivery-group", DeliveryGroupsReportController.getAllDeliveryGroup);
// DeliveryGroupsReportRoute.get("/delivery-group/by", DeliveryGroupsReportController.getDeliveryGroupByID);
// DeliveryGroupsReportRoute.get("/delivery-group/by/emp", DeliveryGroupsReportController.getDeliveryGroupActiveByEmployee);
// DeliveryGroupsReportRoute.put("/edit/delivery-group", DeliveryGroupsReportController.editDeliveryGroup);
// DeliveryGroupsReportRoute.patch("/edit-minor/delivery-group", DeliveryGroupsReportController.editDeliveryGroup);
// DeliveryGroupsReportRoute.delete("/del/delivery-group", DeliveryGroupsReportController.deleteDeliveryGroup);
// DeliveryGroupsReportRoute.delete("/cancel/delivery-group", DeliveryGroupsReportController.cancelDeliveryGroup);

export default DeliveryGroupsReportRoute;