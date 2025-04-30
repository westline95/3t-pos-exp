import express from "express";
import StatusController from "../controllers/StatusController.js";

const StatusRoute = express.Router();

StatusRoute.get("/status", StatusController.getAllStatus);
StatusRoute.post("/status/by", StatusController.getStatusByID);

export default StatusRoute;
