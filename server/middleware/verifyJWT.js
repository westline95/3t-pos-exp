import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// const jwt = require('jsonwebtoken');
dotenv.config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    // console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.user_mail;
            next();
        }
    );
}

export default verifyJWT;