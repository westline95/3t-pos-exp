import jwt from "jsonwebtoken";
import AllModel from "../models/AllModel.js";
import dotenv from "dotenv";

dotenv.config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); 
    const refreshToken = cookies.jwt;

    // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    const foundUser =  await AllModel.UsersModel.findOne({
            where:{refresh_token: refreshToken}
    });
    if (!foundUser) return res.sendStatus(403); //Forbidden 

    const roles = foundUser.role;
    const name = foundUser.user_name;
    const staff_id = foundUser.employee_id;
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        (err, decoded) => {
            if (err || foundUser.user_mail !== decoded.user_mail) return res.sendStatus(403);
            const access_token = jwt.sign(
                { "user_mail": decoded.user_mail },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            );
            res.json({ staff_id, name, roles, access_token })
        }
    );
}
 
export default handleRefreshToken;