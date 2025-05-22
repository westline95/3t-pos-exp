import express from "express";
import MailerSettController from "../controllers/MailerSettController.js";

const MailerSettRoute = express.Router();

MailerSettRoute.get("/mailer-sett", MailerSettController.getMailerSett);
MailerSettRoute.put("/updt/mailer-sett", MailerSettController.updateMailerSett);

export default MailerSettRoute;