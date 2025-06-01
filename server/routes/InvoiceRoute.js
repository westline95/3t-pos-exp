import express from "express";
import InvoiceController from "../controllers/InvoiceController.js";
import accessValidation from "../api/auth.js";

const InvoiceRoute = express.Router();

InvoiceRoute.get("/inv",accessValidation, InvoiceController.getAllInv);
InvoiceRoute.get("/inv",accessValidation, InvoiceController.getInvByID);
InvoiceRoute.get("/inv/check",accessValidation, InvoiceController.getInvByStatusCustId);
InvoiceRoute.get("/inv/group",accessValidation, InvoiceController.countInvByCust);
InvoiceRoute.post("/inv/write",accessValidation, InvoiceController.insertInv);
InvoiceRoute.post("/inv/writes",accessValidation, InvoiceController.insertMultipleInv);
InvoiceRoute.put("/inv",accessValidation, InvoiceController.updateInv);
InvoiceRoute.delete("/inv",accessValidation, InvoiceController.deleteInv);
InvoiceRoute.get("/inv/status",accessValidation, InvoiceController.getInvByStatus);

export default InvoiceRoute;