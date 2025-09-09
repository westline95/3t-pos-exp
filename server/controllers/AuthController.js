import AllModel from "../models/AllModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    const {user_mail, user_pass} = req.body;
    try{
        const user = await AllModel.UsersModel.findOne({
            where:{user_mail: user_mail}
        });


        if(!user){
            res.status(404).json({error: `user not found!`});
        }

        if(!user.user_pass){
            return res.status.json({
                message: 'Password not set'
            })
        }

        const isValidPass = await bcrypt.compare(user_pass, user.user_pass);

        if(isValidPass){
            const roles = user.role;
            // const roles = user.role;
            const payload = {
                id: user.id,
                name: user.user_name,
                role: user.role
            };
            const secret = process.env.JWT_SECRET;
            const refresh_secret = process.env.JWT_REFRESH_SECRET;
            
            // const expiresIn = 60 * 60 * 1;
            const access_token = jwt.sign(
                payload, 
                secret, 
                {expiresIn: '15m'}
            );

            const refreshToken = jwt.sign(
                { "user_mail": user.user_mail },
                refresh_secret,
                { expiresIn: '7d' }
            );

            // saving refresh token with current user
            user.refresh_token = refreshToken;
            await user.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            // Send authorization roles and access token to user
            return res.json({ roles, access_token });
        } else {
            return res.status(403).json({
                message: 'Wrong password!'
            })
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

export default handleLogin;