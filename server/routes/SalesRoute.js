import express from "express";
import SalesController from "../controllers/SalesController.js";

const SalesRoute = express.Router();

SalesRoute.get("/sales", SalesController.getAllSales);
SalesRoute.get("/sales/by", SalesController.getSalesByID);
SalesRoute.get("/sales/member", SalesController.getSalesCust);
SalesRoute.get("/sales/group", SalesController.countSalesByCust);
SalesRoute.get("/sales/group/unpaid", SalesController.salesByCustUnpaid);
SalesRoute.get("/sales/cust/paytype", SalesController.salesByOneCustPayType);
SalesRoute.get("/sales/cust/paytype/v2", SalesController.salesByOneCustPayType2);
SalesRoute.get("/sales/cust/available", SalesController.getSalesCustNotCanceled);
SalesRoute.get("/sales/next", SalesController.checkNextCustSales);
SalesRoute.post("/sales/write", SalesController.insertSales);
SalesRoute.post("/sales/writes", SalesController.insertMultipleSales);
SalesRoute.patch("/sales/update-minor/:order_id", SalesController.updateSales);
SalesRoute.put("/sales", SalesController.updateSalesMayor);
SalesRoute.patch("/sales/invs", SalesController.updateSalesAddInvoices);
SalesRoute.patch("/sales/:order_id", SalesController.updateSalesAddInv);
SalesRoute.patch("/sales/update/status", SalesController.updateOrderStatus);
SalesRoute.patch("/sales/update/ro/:order_id", SalesController.updateRO);
SalesRoute.delete("/sales", SalesController.deleteSales);
SalesRoute.get("/sales/status", SalesController.getSalesByStatus);
SalesRoute.get("/sales/order-items", SalesController.salesWOrderItems);
SalesRoute.get("/sales/summary", SalesController.getSalesAndSum);

export default SalesRoute;