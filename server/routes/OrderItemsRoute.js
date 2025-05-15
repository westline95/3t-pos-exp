import express from "express";
import OrderItemsController from "../controllers/OrderItemsController.js";

const OrderItemsRoute = express.Router();

OrderItemsRoute.get("/order-items", OrderItemsController.getAllOrderItem);
OrderItemsRoute.post("/order-item", OrderItemsController.getOrderItemByID);
OrderItemsRoute.post("/order-item/write", OrderItemsController.insertOrderItems);
OrderItemsRoute.post("/order-item/writes", OrderItemsController.insertMultipleOrderItem);
OrderItemsRoute.put("/order-item", OrderItemsController.updateOrderItem);
OrderItemsRoute.delete("/order-item", OrderItemsController.deleteOrderItem);

export default OrderItemsRoute;