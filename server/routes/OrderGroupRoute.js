import express from "express";
import OrderGroupController from "../controllers/OrderGroupController.js";
const OrderGroupRoute = express.Router();

OrderGroupRoute.get("/order-group", OrderGroupController.getAllOrdersGroup);
// SalesRoute.get("/sales/by", SalesController.getSalesByID);
// SalesRoute.get("/sales/member", SalesController.getSalesCust);
// SalesRoute.get("/sales/group", SalesController.countSalesByCust);
// SalesRoute.get("/sales/group/unpaid", SalesController.salesByCustUnpaid);
// SalesRoute.get("/sales/cust/paytype", SalesController.salesByOneCustPayType);
// SalesRoute.get("/sales/cust/paytype/v2", SalesController.salesByOneCustPayType2);
// SalesRoute.post("/sales/write", SalesController.insertSales);
// SalesRoute.post("/sales/writes", SalesController.insertMultipleSales);
// SalesRoute.put("/sales", SalesController.updateSales);
// SalesRoute.patch("/sales", SalesController.updateSales);
// SalesRoute.patch("/sales/invs", SalesController.updateSalesAddInvoices);
// SalesRoute.patch("/sales/:order_id", SalesController.updateSalesAddInv);
// SalesRoute.patch("/sales/update/status", SalesController.updateOrderStatus);
// SalesRoute.delete("/sales", SalesController.deleteSales);
// SalesRoute.get("/sales/status", SalesController.getSalesByStatus);
// SalesRoute.get("/sales/order-items", SalesController.salesWOrderItems);
// SalesRoute.get("/sales/summary", SalesController.getSalesAndSum);

export default OrderGroupRoute;