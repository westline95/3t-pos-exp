import express from "express";
import EmployeeController from "../controllers/EmployeeController.js";

const EmployeeRoute = express.Router();

EmployeeRoute.post("/employee", EmployeeController.insertEmployee);
EmployeeRoute.post("/employee/account", EmployeeController.insertEmployeeAcc);
EmployeeRoute.get("/employee/all", EmployeeController.getAllEmployees);
EmployeeRoute.get("/employee/all/active", EmployeeController.getAllEmployeesByActive);
EmployeeRoute.get("/employee/:employee_id", EmployeeController.getEmployee);
EmployeeRoute.put("/employee/update", EmployeeController.updateEmployee);
EmployeeRoute.patch("/employee/minor-update", EmployeeController.updateMinorEmployee);
EmployeeRoute.delete("/employee/del", EmployeeController.deleteEmployee);

export default EmployeeRoute;