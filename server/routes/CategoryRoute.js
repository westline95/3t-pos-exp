import express from "express";
import CategoryController from "../controllers/CategoryController.js";


const CategoryRoute = express.Router();

CategoryRoute.get("/categories", CategoryController.getCategories);
CategoryRoute.post("/category", CategoryController.insertCategory);
CategoryRoute.post("/categories", CategoryController.insertMultipleCategory);
CategoryRoute.put("/category", CategoryController.updateCategory);
CategoryRoute.delete("/category", CategoryController.deleteCategory);

export default CategoryRoute;