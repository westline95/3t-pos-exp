import express from "express";
import UserController from "../controllers/UserController.js";
import accessValidation from "../api/auth.js";


const UserRoute = express.Router();

UserRoute.get("/user/all", accessValidation, UserController.getUsers);
UserRoute.get("/user/courier", accessValidation, UserController.getUserCourierRole);
UserRoute.post("/user/write",accessValidation, UserController.insertUser);
UserRoute.put("/user",accessValidation, UserController.updateUser);
UserRoute.delete("/user",accessValidation, UserController.deleteUser);

export default UserRoute;