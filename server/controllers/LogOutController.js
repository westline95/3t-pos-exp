import jwt from "jsonwebtoken";
import AllModel from "../models/AllModel.js";


const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content 
    const refreshToken = cookies.jwt;

    const foundUser =  await AllModel.UsersModel.findOne({
                where:{refresh_token: refreshToken}
    });
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    } 

    // delete RT in db
    foundUser.refresh_token = '';
    await foundUser.save();


    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //secure: true - only serves on https
    res.sendStatus(204);
}
 
export default handleLogout;