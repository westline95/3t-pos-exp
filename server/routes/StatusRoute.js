import express from "express";
import StatusController from "../controllers/StatusController";

const StatusRoute = express.Router();
StatusRoute.get("/status", StatusController.getAllStatus);
StatusRoute.post("/status", StatusController.getStatusByID);

export default StatusRoute;
