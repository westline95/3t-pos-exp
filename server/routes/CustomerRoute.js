import express from "express";
import CustomerController from "../controllers/CustomerController.js";

const CustomersRoute = express.Router();

CustomersRoute.get("/customers", CustomerController.getCustomers);
CustomersRoute.get("/customers/group", CustomerController.countCustByName);
CustomersRoute.post("/customer/write", CustomerController.insertCustomers);
CustomersRoute.post("/customers", CustomerController.insertMultipleCustomer);
CustomersRoute.put("/customers", CustomerController.updateCust);
CustomersRoute.delete("/customers", CustomerController.deleteCust);

export default CustomersRoute;