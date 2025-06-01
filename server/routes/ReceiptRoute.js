import express from "express";
import ReceiptController from "../controllers/ReceiptController.js";
import accessValidation from "../api/auth.js";

const ReceiptRoute = express.Router();

ReceiptRoute.get("/receipt/all",accessValidation, ReceiptController.getAllReceipt);
ReceiptRoute.post("/receipt/write",accessValidation, ReceiptController.insertReceipt);
ReceiptRoute.put("/receipt/update",accessValidation, ReceiptController.updateReceipt);
ReceiptRoute.delete("/receipt/del",accessValidation, ReceiptController.deleteReceipt);
ReceiptRoute.get("/receipt",accessValidation, ReceiptController.getReceiptByID);

export default ReceiptRoute;