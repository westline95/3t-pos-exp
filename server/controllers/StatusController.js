import AllModel from "../models/AllModel.js";

const getAllStatus = async (req, res) => {
    try{
        const allStatus = await AllModel.StatusModel.findAll();
        if(allStatus){
            res.json(allStatus);
        } else {
            res.status(404).json({error: `get all status not found!`});
        }
        // console.log(res.status)
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getStatusByID = async(req, res) => {
    try{
        const getData = await AllModel.StatusModel.findAll({
            where: {id: req.query.id}
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get status data with ID not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

export default {
    getAllStatus,
    getStatusByID
}