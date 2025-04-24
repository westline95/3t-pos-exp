import express from "express";
import CustTypeController from "../controllers/CustTypeController.js";

const CustomerTypeRoute = express.Router();

CustomerTypeRoute.get("/type", CustTypeController.getCustType);
CustomerTypeRoute.get("/type", CustTypeController.getCustTypeByID);
CustomerTypeRoute.post("/type", CustTypeController.insertCustType);
CustomerTypeRoute.put("/type", CustTypeController.updateCustType);
CustomerTypeRoute.delete("/type", CustTypeController.deleteCustType);

export default CustomerTypeRoute;
