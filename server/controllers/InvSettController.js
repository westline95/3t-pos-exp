import AllModel from "../models/AllModel.js";

const getInvSett = async (req, res) => {
    try{
        const invSett = await AllModel.invSettModel.findOne();
        if(invSett){
            res.json(invSett);
        } else {
            res.status(404).json({error: `get inv sett is not found!`});
        }
    } 
    catch(error) {
        res.status(500).json({err: error.message});
    }
}

const updateInvSett = async (req, res) => {
    try{
        const invSett = await AllModel.invSettModel.update(req.body, {
            where:{id: req.query.id},
            returning: true,
        });
        
        res.status(201).json(invSett);
    } 
    catch(error) {
        res.status(500).json({err: error.message});
    }
}

export default {
    getInvSett,
    updateInvSett
};