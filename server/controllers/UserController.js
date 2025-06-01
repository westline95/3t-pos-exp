import { json } from "sequelize";
import AllModel from "../models/AllModel.js";
import bcrypt from "bcrypt";

const userLogin = async (req, res) => {
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
            return json({
                id: user.id,
                name: user.user_name,
                role: user.role
            })
        } else {
            return res.status(403).json({
                message: 'Wrong password!'
            })
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertUser = async (req, res) => {
    const { user_name, user_mail, user_pass, role } = req.body;
    try{

        const hashedPass = await bcrypt.hash(user_pass, 10);
        const newUser = await AllModel.UsersModel.create({
            user_name: user_name,
            user_mail: user_mail,
            user_pass: hashedPass,
            role: role,
        })
        
        if(newUser){
            res.status(201).json({message: 'user created'});
        } else {
            res.status(404).json({error: `failed to register user`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateUser = async (req, res) => {
    try{
        const cust = await AllModel.UsersModel.update(req.body, {
            where:{id: req.query.id},
            returning: true,
        });
        
        if(cust){
            res.status(201).json(cust);
        } else {
            res.status(404).json({error: `failed to update user`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteUser = async (req, res) => {
    try{
        const delUser = await AllModel.UsersModel.destroy({
            where:{id: req.query.id}
        });
        
        if(delUser){
            res.status(201).json(delUser);
        } else {
            res.status(404).json({error: `failed to delete user`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}



export default {
    userLogin,
    insertUser,
    updateUser,
    deleteUser
};