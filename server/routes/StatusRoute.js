import express from "express";
import StatusController from "../controllers/StatusController.js";

const StatusRoute = express.Router();

StatusRoute.get("/list", StatusController.getAllStatus);
StatusRoute.post("/list", StatusController.getStatusByID);

export default StatusRoute;
