import express from "express";
import CategoryModel from "../models/CategoryModel.js";

const ReadCategoryRoute = express.Router(); 
ReadCategoryRoute.get("/read", (req, res) => {
    CategoryModel.findAll().then(category => {
        console.log("category", category);
        res.json(category);
    }).catch(err => {
        console.error("error fetching category table:", err);
        res.status(500).json({ error: "error fetching category table" });
    })
 })


 export default ReadCategoryRoute;