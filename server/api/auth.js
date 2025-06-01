import jwt from "jsonwebtoken";

// auth
const accessValidation = (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({
            message: 'Token diperlukan!'
        })
    }

    const token = authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    try {
        const jwtDecode = jwt.verify(token, secret);

        if(typeof jwtDecode !== 'string'){
            req.user = jwtDecode;
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Unathorized!'
        })
    }
    next();

};

export default accessValidation;
