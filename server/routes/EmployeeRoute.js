import express from "express";
import EmployeeController from "../controllers/EmployeeController.js";

const EmployeeRoute = express.Router();

EmployeeRoute.post("/employee", EmployeeController.insertEmployee);
EmployeeRoute.get("/employee/all", EmployeeController.getAllEmployees);
EmployeeRoute.get("/employee/:employee_id", EmployeeController.getEmployee);
EmployeeRoute.put("/employee/update", EmployeeController.updateEmployee);
EmployeeRoute.patch("/employee/minor-update", EmployeeController.updateMinorEmployee);
EmployeeRoute.delete("/employee/del", EmployeeController.deleteEmployee);

export default EmployeeRoute;