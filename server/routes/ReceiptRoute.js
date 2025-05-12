import express from "express";
import ReceiptController from "../controllers/ReceiptController.js";

const ReceiptRoute = express.Router();

ReceiptRoute.get("/receipt/all", ReceiptController.getAllReceipt);
ReceiptRoute.post("/receipt/write", ReceiptController.insertReceipt);
ReceiptRoute.put("/receipt/update", ReceiptController.updateReceipt);
ReceiptRoute.delete("/receipt/del", ReceiptController.deleteReceipt);
ReceiptRoute.get("/receipt", ReceiptController.getReceiptByID);

export default ReceiptRoute;