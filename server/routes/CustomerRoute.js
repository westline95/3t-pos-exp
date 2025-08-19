import express from "express";
import CustomerController from "../controllers/CustomerController.js";

const CustomersRoute = express.Router();

CustomersRoute.get("/customers", CustomerController.getCustomers);
CustomersRoute.get("/customers/member", CustomerController.getCustomerByID);
CustomersRoute.get("/customers/group", CustomerController.countCustByName);
CustomersRoute.post("/customer/write", CustomerController.insertCustomers);
CustomersRoute.post("/customers", CustomerController.insertMultipleCustomer);
CustomersRoute.put("/customers", CustomerController.updateCust);
CustomersRoute.patch("/customer/:customer_id/credit", CustomerController.updateCreditCust);
CustomersRoute.patch("/customer/sales/:customer_id/:ordervalue", CustomerController.updateOrderValue);
CustomersRoute.patch("/customer/debt/:customer_id/:debtminus", CustomerController.updateDebt);
CustomersRoute.delete("/customers", CustomerController.deleteCust);
CustomersRoute.get("/customer/debt", CustomerController.getDebtData);
CustomersRoute.get("/customer/detail/total-sales", CustomerController.getDetailedSales);
CustomersRoute.get("/customer/detail/total-debt", CustomerController.getDetailedDebt);
CustomersRoute.get("/customer/unpaid-inv", CustomerController.getCustomersUnpaidInv);

export default CustomersRoute;