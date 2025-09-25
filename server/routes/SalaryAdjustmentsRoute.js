import express from "express";
import SalaryAdjustmentsController from "../controllers/SalaryAdjustmentsController.js";

const SalaryAdjRoute = express.Router();

SalaryAdjRoute.post("/salary-setting", SalaryAdjustmentsController.insertSalaryAdj);
SalaryAdjRoute.get("/salary-setting/active/:employee_id", SalaryAdjustmentsController.getSalaryByPeriod);
// SalaryAdjRoute.put("/salary-setting/update", SalarySettingController.updateSalarySett);
// SalaryAdjRoute.patch("/salary-setting/minor-update", SalarySettingController.updateMinorSalarySett);
// SalaryAdjRoute.delete("/salary-setting/del", SalarySettingController.deleteSalarySetting);

export default SalaryAdjRoute;