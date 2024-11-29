import StatusModel from "../models/StatusModel.js";

const getAllStatus = async (req, res) => {
    try{
        const allStatus = await StatusModel.findAll();
        if(allStatus){
            res.json(allStatus);
        } else {
            res.json({error: res.status});
        }
        // console.log(res.status)
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getStatusByID = async(req, res) => {
    try{
        const getData = await StatusModel.findAll({
            where: {id: req.body.id}
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get sales data with ID not found!`});
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