import express from "express";
import PaymentController from "../controllers/PaymentController.js";

const PaymentRoute = express.Router();

PaymentRoute.get("/payment/all", PaymentController.getAllPayment);
PaymentRoute.post("/payment/write", PaymentController.insertPayment);
PaymentRoute.put("/payment/update", PaymentController.updatePayment);
PaymentRoute.delete("/payment/del", PaymentController.deletePayment);
PaymentRoute.get("/payment/inv", PaymentController.getPaymentByInvId);
PaymentRoute.get("/payment", PaymentController.getPaymentByID);

export default PaymentRoute;