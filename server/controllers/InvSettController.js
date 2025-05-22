import AllModel from "../models/AllModel.js";

const getInvSett = async (req, res) => {
    try{
        const invSett = await AllModel.invSettModel.findAll({});
        if(invSett){
            res.json(invSett);
        } else {
            res.status(404).json({error: `get inv sett is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateInvSett = async (req, res) => {
    try{
        const invSett = await AllModel.invSettModel.update(req.body, {
            where:{id: req.query.id}
        });
        
        res.status(201).json(invSett);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

export default {
    getInvSett,
    updateInvSett
}