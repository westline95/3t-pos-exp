import express from "express";
import subCategory from "../models/subCategoryModel.js";

const router = express.Router();

router.post("/write", (req, res) => {
    subCategory.create({
        name: "Tahu Eceran",
        category: "Tahu",
        status: "active"
    })
    .then(() => {
        console.log("sub category success");
        res.json({message: "success"});
    }).catch((err) => {
        console.error("failed to insert: " + err);
        res.status(500).json({ error: "error fetching sub category" });
    });
})

export default router;