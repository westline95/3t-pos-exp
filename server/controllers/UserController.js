import AllModel from "../models/AllModel.js";

const getUsers = async (req, res) => {
    try{
        const allUser = await AllModel.UsersModel.findAll();
        if(allUser){
            res.json(allUser);
        } else {
            res.status(404).json({error: `get all user not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getUserCourierRole = async (req, res) => {
    try{
        const allUserCourier = await AllModel.UsersModel.findAll({ 
            where: {role: "courier"},
            attributes: ['id','user_name', 'user_mail', 'role']
        });
        if(allUserCourier){
            res.json(allUserCourier);
        } else {
            res.status(404).json({error: `get all user:courier not found!`});
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
        res.status(500).json({err: err});
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
    getUsers,
    insertUser,
    updateUser,
    deleteUser,
    getUserCourierRole
};