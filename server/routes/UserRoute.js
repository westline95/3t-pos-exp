import express from "express";
import UserController from "../controllers/UserController.js";

const UserRoute = express.Router();

UserRoute.post("/user/login", UserController.userLogin);
UserRoute.post("/user/write", UserController.insertUser);
UserRoute.put("/user", UserController.updateUser);
UserRoute.delete("/user", UserController.deleteUser);

export default UserRoute;