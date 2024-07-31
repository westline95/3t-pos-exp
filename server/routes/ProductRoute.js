import express from "express";
import ProdCategory from "../models/ProductModel.js";
// import db from "../config/Database.js";

const router = express.Router();
router.get("/category", (req, res) => {
    ProdCategory.findAll().then(category => {
        console.log("category", category);
        res.json(category);
    }).catch(err => {
        console.error("error fetching category:", err);
        res.status(500).json({ error: "error fetching category" });
    })
 })


 export default router;