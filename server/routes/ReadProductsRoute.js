import express from "express";
import ProductsCatalogModel from "../models/ProductsCatalogModel.js";

const ReadProductRoute = express.Router();
ReadProductRoute.get("/read", (req, res) => {
    ProductsCatalogModel.findAll().then(product => {
        console.log("product", product);
        res.json(product);
    }).catch(err => {
        console.error("error fetching products table:", err);
        res.status(500).json({ error: "error fetching products table" });
    })
 })


 export default ReadProductRoute;