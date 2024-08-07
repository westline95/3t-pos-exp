import express from "express";
import SubCategoryModel from "../models/subCategoryModel.js";

const ReadSubCategory = express.Router();
ReadSubCategory.get("/read", (req, res) => {
    SubCategoryModel.findAll().then(subCategory => {
        console.log("sub-category", subCategory);
        res.json(subCategory);
    }).catch(err => {
        console.error("error fetching category:", err);
        res.status(500).json({ error: "error fetching category" });
    })
 })


 export default ReadSubCategory;