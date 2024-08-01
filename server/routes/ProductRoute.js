import express from "express";
import CategoryModel from "../models/ProductModel.js";
// import db from "../config/Database.js";

const ProductRouter = express.Router();
ProductRouter.get("/read", (req, res) => {
    CategoryModel.findAll().then(category => {
        console.log("category", category);
        res.json(category);
    }).catch(err => {
        console.error("error fetching category:", err);
        res.status(500).json({ error: "error fetching category" });
    })
 })


 export default ProductRouter;