import express from "express";
import SalarySettingController from "../controllers/SalarySettingController.js";

const SalarySettingRoute = express.Router();

SalarySettingRoute.post("/salary-setting", SalarySettingController.insertSalarySett);
SalarySettingRoute.get("/salary-setting/active/:employee_id", SalarySettingController.getCurrentSalarySettByEmployee);
SalarySettingRoute.put("/salary-setting/update", SalarySettingController.updateSalarySett);
SalarySettingRoute.patch("/salary-setting/minor-update", SalarySettingController.updateMinorSalarySett);
SalarySettingRoute.delete("/salary-setting/del", SalarySettingController.deleteSalarySetting);

export default SalarySettingRoute;