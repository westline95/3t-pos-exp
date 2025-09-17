import express from "express";
import DepartmentsController from "../controllers/DepartmentsController.js";

const DepartmentsRoute = express.Router();

// Department
DepartmentsRoute.post("/department", DepartmentsController.insertDepartment);
DepartmentsRoute.get("/department/all", DepartmentsController.getAllDepartment);
DepartmentsRoute.put("/department/update", DepartmentsController.updateDepartment);
DepartmentsRoute.patch("/department/minor-update", DepartmentsController.updateMinorDepartment);
DepartmentsRoute.delete("/department/del/:department_id", DepartmentsController.deleteDepartment);

// Department History
DepartmentsRoute.post("/department-history", DepartmentsController.insertDepartmentHistory);
DepartmentsRoute.get("/department-history/all", DepartmentsController.getAllDepartmentHistory);
DepartmentsRoute.get("/department-history/:employeeID", DepartmentsController.getAllDepartmentHistory);
DepartmentsRoute.put("/department-history/update", DepartmentsController.updateDepartmentHistory);
DepartmentsRoute.patch("/department-history/minor-update", DepartmentsController.updateMinorDH);
DepartmentsRoute.delete("/department-history/del", DepartmentsController.deleteDepartmentHistory);

export default DepartmentsRoute;

