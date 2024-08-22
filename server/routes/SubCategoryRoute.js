import express from "express";
import SubCategoryController from "../controllers/SubCategoryController.js";

const SubCategoryRoute = express.Router();

SubCategoryRoute.get("/sub-category", SubCategoryController.getSubCategory);
SubCategoryRoute.post("/sub-category", SubCategoryController.insertSubCategory);
SubCategoryRoute.post("/sub-categories", SubCategoryController.insertMultipleSubCategory);
SubCategoryRoute.put("/sub-category", SubCategoryController.updateSubCategory);
SubCategoryRoute.delete("/sub-category", SubCategoryController.deleteSubCategory);

export default SubCategoryRoute;