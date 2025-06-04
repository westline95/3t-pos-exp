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
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.user_mail !== decoded.user_mail) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "user_mail": decoded.user_mail },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );
}
 
export default handleRefreshToken;