import express from "express";
import ProductsCatalogModel from "../models/ProductsCatalogModel.js";

const WriteProductsCatalogRoute = express.Router();

WriteProductsCatalogRoute.get("/write", (req, res) => {
    ProductsCatalogModel.create([
        {
            name: "",
            category: "",
            subCategory: "",
            variant: "",      
            unit: "",
            prodCost: "",
            sellPrice: "",
            status: "",
        }
    ])
    .then(() => {
        console.log("product catalog success");
        res.json({message: "success"});
    }).catch((err) => {
        console.error("failed to insert: " + err);
        res.status(500).json({ error: "error fetching products catalog" });
    });
})

export default WriteProductsCatalogRoute;