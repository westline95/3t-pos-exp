import express from "express";
import SalesController from "../controllers/SalesController.js";

const SalesRoute = express.Router();

SalesRoute.get("/sales-data", SalesController.getAllSales);
SalesRoute.get("/sales/member", SalesController.getSalesCust);
SalesRoute.get("/sales/group", SalesController.countSalesByCust);
SalesRoute.post("/sales/write", SalesController.insertSales);
SalesRoute.post("/sales/writes", SalesController.insertMultipleSales);
SalesRoute.put("/sales", SalesController.updateSales);
SalesRoute.delete("/sales", SalesController.deleteSales);
SalesRoute.get("/sales/status", SalesController.getSalesByStatus);

export default SalesRoute;