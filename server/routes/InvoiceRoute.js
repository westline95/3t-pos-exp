import express from "express";
import InvoiceController from "../controllers/InvoiceController.js";

const InvoiceRoute = express.Router();

InvoiceRoute.get("/inv", InvoiceController.getAllInv);
InvoiceRoute.get("/inv/by", InvoiceController.getInvByID);
InvoiceRoute.get("/inv/check", InvoiceController.getInvByStatusCustId);
InvoiceRoute.get("/inv/group", InvoiceController.countInvByCust);
InvoiceRoute.post("/inv/write", InvoiceController.insertInv);
InvoiceRoute.post("/inv/writes", InvoiceController.insertMultipleInv);
InvoiceRoute.put("/inv", InvoiceController.updateInv);
InvoiceRoute.delete("/inv", InvoiceController.deleteInv);
InvoiceRoute.get("/inv/status", InvoiceController.getInvByStatus);

export default InvoiceRoute;