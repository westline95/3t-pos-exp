import express from "express";
import CustomerController from "../controllers/CustomerController.js";
import accessValidation from "../api/auth.js";

const CustomersRoute = express.Router();

CustomersRoute.get("/customers",accessValidation, CustomerController.getCustomers);
CustomersRoute.get("/customers/member",accessValidation, CustomerController.getCustomerByID);
CustomersRoute.get("/customers/group",accessValidation, CustomerController.countCustByName);
CustomersRoute.post("/customer/write",accessValidation, CustomerController.insertCustomers);
CustomersRoute.post("/customers",accessValidation, CustomerController.insertMultipleCustomer);
CustomersRoute.put("/customers",accessValidation, CustomerController.updateCust);
CustomersRoute.delete("/customers",accessValidation, CustomerController.deleteCust);
CustomersRoute.get("/customer/debt",accessValidation, CustomerController.getDebtData);

export default CustomersRoute;