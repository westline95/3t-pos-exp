import express from "express";
import SalesController from "../controllers/SalesController.js";
import accessValidation from "../api/auth.js";

const SalesRoute = express.Router();

SalesRoute.get("/sales",accessValidation, SalesController.getAllSales);
SalesRoute.post("/sales",accessValidation, SalesController.getSalesByID);
SalesRoute.get("/sales/member",accessValidation, SalesController.getSalesCust);
SalesRoute.get("/sales/group",accessValidation, SalesController.countSalesByCust);
SalesRoute.get("/sales/group/unpaid",accessValidation, SalesController.salesByCustUnpaid);
SalesRoute.get("/sales/cust/unpaid",accessValidation, SalesController.salesByOneCustUnpaid);
SalesRoute.post("/sales/write",accessValidation, SalesController.insertSales);
SalesRoute.post("/sales/writes",accessValidation, SalesController.insertMultipleSales);
SalesRoute.put("/sales",accessValidation, SalesController.updateSales);
SalesRoute.delete("/sales",accessValidation, SalesController.deleteSales);
SalesRoute.get("/sales/status",accessValidation, SalesController.getSalesByStatus);
SalesRoute.get("/sales/order-items",accessValidation, SalesController.salesWOrderItems);
SalesRoute.get("/sales/summary",accessValidation, SalesController.getSalesAndSum);

export default SalesRoute;