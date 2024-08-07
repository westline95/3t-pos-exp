import express from "express";
import SubCategoryModel from "../models/subCategoryModel.js";

const SubCategoryRoute = express.Router();

SubCategoryRoute.get("/write", (req, res) => {
    SubCategoryModel.create(
        {
            name: "",
            category: "",
            status: ""
        }
    )
    .then(() => {
        console.log("sub category success");
        res.json({message: "success"});
    }).catch((err) => {
        console.error("failed to insert: " + err);
        res.status(500).json({ error: "error fetching sub category" });
    });
})

export default SubCategoryRoute;