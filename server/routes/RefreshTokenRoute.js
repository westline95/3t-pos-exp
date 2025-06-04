import express from "express";
import handleRefreshToken from "../controllers/RefreshTokenController.js";

const RefreshRoute  = express.Router();

RefreshRoute .get("/refresh", handleRefreshToken);

export default RefreshRoute ;