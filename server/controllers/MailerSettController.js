import AllModel from "../models/AllModel.js";

const getMailerSett = async (req, res) => {
    try{
        const mailerSett = await AllModel.mailerSettModel.findOne();
        if(mailerSett){
            res.json(mailerSett);
        } else {
            res.status(404).json({error: `get mailer setting is not found!`});
        }
    } 
    catch(error) {
        res.status(500).json({err: error.messageor.message});
    }
}

const updateMailerSett = async (req, res) => {
    try{
        const mailerSett = await AllModel.mailerSettModel.update(req.body, {
            where:{id: req.query.id},
            returning: true,
        });
        
        res.status(201).json(mailerSett);
    } 
    catch(error) {
        res.status(500).json({err: error.messageor.message});
    }
}

export default {
    getMailerSett,
    updateMailerSett
}