import express from "express";
import MailerSettController from "../controllers/MailerSettController.js";
import accessValidation from "../api/auth.js";

const MailerSettRoute = express.Router();

MailerSettRoute.get("/mailer-sett",accessValidation, MailerSettController.getMailerSett);
MailerSettRoute.put("/updt/mailer-sett",accessValidation, MailerSettController.updateMailerSett);

export default MailerSettRoute;