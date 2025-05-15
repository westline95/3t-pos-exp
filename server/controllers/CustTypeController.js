import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

const getCustType = async (req, res) => {
    try {
        const allType = await AllModel.CustTypeModel.findAll();
        if(allType) {
            res.json(allType);
        } else {
            res.status(404).json({error: `get all customer type not found!`});
        }
    } catch (err) {
        res.status(500).json({err: "internal server error"})
    }
}

const getCustTypeByID = async(req, res) => {
    try {
        const getType = await AllModel.CustTypeModel.findAll({
            where: {cust_type_id: req.query.id}
        })

        if(getType){
            res.json(getType);
        } else {
            res.status(404).json({error: `get customer type with ID not found!`});
        }
    } catch (err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertCustType = async(req, res) => {
    const {type,status} = req.body;
    try {
        const newCustType = await AllModel.CustTypeModel.create(req.body)
        if(newCustType){
            res.status(201).json(newCustType);
        } else {
            res.status(404).json({error: `failed to insert cust type`});
        }
        
    } catch (err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateCustType = async(req, res) => {
    try {
        const type = await AllModel.CustTypeModel.update(req.body, {where: {cust_type_id: req.query.id}});
        
        if(type){
            res.status(201).json(type);
        } else {
            res.status(404).json({error: `failed to update cust type`});
        }
        
    } catch (err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteCustType = async(req, res) => {
    try {
        const delCustType = await AllModel.CustTypeModel.destroy({where: {cust_type_id: req.query.id}});
       
        if(delCustType){
            res.status(201).json(delCustType);
        } else {
            res.status(404).json({error: `failed to delete cust type`});
        }
    } catch (err) {
        res.status(500).json({err: "internal server error"});
    }
}

export default {
    getCustType,
    insertCustType,
    updateCustType,
    deleteCustType,
    getCustTypeByID
}