import express from "express";
import SubCategoryController from "../controllers/SubCategoryController.js";

const SubCategoryRoute = express.Router();

SubCategoryRoute.get("/subcategory", SubCategoryController.getSubCategory);
SubCategoryRoute.get("/subcategory", SubCategoryController.getSubCategorybyCategory);
SubCategoryRoute.post("/subcategory/write", SubCategoryController.insertSubCategory);
SubCategoryRoute.post("/subcategories", SubCategoryController.insertMultipleSubCategory);
SubCategoryRoute.put("/subcategory", SubCategoryController.updateSubCategory);
SubCategoryRoute.delete("/subcategory", SubCategoryController.deleteSubCategory);

export default SubCategoryRoute;