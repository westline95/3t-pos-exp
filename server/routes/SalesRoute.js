import express from "express";
import SalesController from "../controllers/SalesController.js";

const SalesRoute = express.Router();

SalesRoute.get("/sales", SalesController.getAllSales);
SalesRoute.get("/sales/by", SalesController.getSalesByID);
SalesRoute.get("/sales/member", SalesController.getSalesCust);
SalesRoute.get("/sales/group", SalesController.countSalesByCust);
SalesRoute.get("/sales/group/unpaid", SalesController.salesByCustUnpaid);
SalesRoute.get("/sales/cust/unpaid", SalesController.salesByOneCustUnpaid);
SalesRoute.post("/sales/write", SalesController.insertSales);
SalesRoute.post("/sales/writes", SalesController.insertMultipleSales);
SalesRoute.put("/sales", SalesController.updateSales);
SalesRoute.delete("/sales", SalesController.deleteSales);
SalesRoute.get("/sales/status", SalesController.getSalesByStatus);
SalesRoute.get("/sales/order-items", SalesController.salesWOrderItems);
SalesRoute.get("/sales/summary", SalesController.getSalesAndSum);

export default SalesRoute;