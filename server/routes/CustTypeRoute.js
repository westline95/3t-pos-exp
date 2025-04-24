import express from "express";
import CustTypeController from "../controllers/CustTypeController.js";

const CustomerTypeRoute = express.Router();

CustomerTypeRoute.get("/types", CustTypeController.getCustType);
CustomerTypeRoute.get("/type/by", CustTypeController.getCustTypeByID);
CustomerTypeRoute.post("/type/write", CustTypeController.insertCustType);
CustomerTypeRoute.put("/type", CustTypeController.updateCustType);
CustomerTypeRoute.delete("/type", CustTypeController.deleteCustType);

export default CustomerTypeRoute;
