import express from "express";
import OrdersCreditController from "../controllers/OrdersCreditController.js";

const OrdersCreditRoute = express.Router();

OrdersCreditRoute.get("/orders-credit", OrdersCreditController.getAllOrdersCredit);
OrdersCreditRoute.get("/orders-credit/:cust_id", OrdersCreditController.getOrderCreditByCust);
OrdersCreditRoute.get("/orders-credit/ro/:ro_id", OrdersCreditController.getOrderCreditByRO);
OrdersCreditRoute.get("/orders-credit/available/:cust_id", OrdersCreditController.getAvailableOrderCreditByCust);
OrdersCreditRoute.post("/order-credit", OrdersCreditController.insertOrderCredit);
OrdersCreditRoute.put("/order-credit", OrdersCreditController.updateMayorOrderCredit);
OrdersCreditRoute.patch("/order-credit/:order_credit_id/:order_id", OrdersCreditController.updateOrderIdOrderCredit);
OrdersCreditRoute.delete("/order-credit", OrdersCreditController.deleteOrderCredit);
OrdersCreditRoute.delete("/order-credit/ro", OrdersCreditController.deleteOrderCreditByROId);

export default OrdersCreditRoute;