import AllModel from "../models/AllModel.js";

const getMailerSett = async (req, res) => {
    try{
        const mailerSett = await AllModel.mailerModel.findAll();
        if(mailerSett){
            res.json(mailerSett);
        } else {
            res.status(404).json({error: `get mailer setting is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateMailerSett = async (req, res) => {
    try{
        const mailerSett = await AllModel.mailerModel.update(req.body, {
            where:{id: req.query.id}
        });
        
        res.status(201).json(mailerSett);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

export default {
    getMailerSett,
    updateMailerSett
}