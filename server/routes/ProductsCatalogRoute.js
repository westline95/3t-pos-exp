import express from "express";
import ProductsCatalogModel from "../models/ProductsCatalogModel.js";

const ProdCatalogRouter = express.Router();

ProdCatalogRouter.get("/write", (req, res) => {
    ProductsCatalogModel.create([
        {
            name: "Tahu",
            category: "Tahu",
            subCategory: "",
            variant: "8 x 8",      
            unit: "papan",
            prodCost: "50000",
            sellPrice: "50000",
            status: "in-stock",
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

export default ProdCatalogRouter;