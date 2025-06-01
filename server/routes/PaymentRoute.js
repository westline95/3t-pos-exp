import express from "express";
import PaymentController from "../controllers/PaymentController.js";
import accessValidation from "../api/auth.js";

const PaymentRoute = express.Router();

PaymentRoute.get("/payment/all",accessValidation, PaymentController.getAllPayment);
PaymentRoute.post("/payment/write",accessValidation, PaymentController.insertPayment);
PaymentRoute.put("/payment/update",accessValidation, PaymentController.updatePayment);
PaymentRoute.delete("/payment/del",accessValidation, PaymentController.deletePayment);
PaymentRoute.get("/payment/inv",accessValidation, PaymentController.getPaymentByInvId);
PaymentRoute.get("/payment",accessValidation, PaymentController.getPaymentByID);

export default PaymentRoute;