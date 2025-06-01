import express from "express";
import OrderItemsController from "../controllers/OrderItemsController.js";
import accessValidation from "../api/auth.js";

const OrderItemsRoute = express.Router();

OrderItemsRoute.get("/order-items",accessValidation, OrderItemsController.getAllOrderItem);
OrderItemsRoute.get("/order-item",accessValidation, OrderItemsController.getOrderItemByID);
OrderItemsRoute.get("/order-item/order",accessValidation, OrderItemsController.orderItemsByOrder);
OrderItemsRoute.post("/order-item/write",accessValidation, OrderItemsController.insertOrderItems);
OrderItemsRoute.post("/order-item/writes",accessValidation, OrderItemsController.insertMultipleOrderItem);
OrderItemsRoute.put("/order-item",accessValidation, OrderItemsController.updateOrderItem);
OrderItemsRoute.delete("/order-item",accessValidation, OrderItemsController.deleteOrderItem);
OrderItemsRoute.delete("/order-item/order",accessValidation, OrderItemsController.deleteOrderItemByOrderID);

export default OrderItemsRoute;