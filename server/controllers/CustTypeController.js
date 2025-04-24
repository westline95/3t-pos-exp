import CustTypeModel from "../models/CustTypeModel.js";
import { Sequelize } from "sequelize";

const getCustType = async (req, res) => {
    try {
        const allType = await CustTypeModel.findAll();
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
        const getType = await CustTypeModel.findAll({
            where: {id: req.query.id}
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
        const newCustType = await CustTypeModel.create({
            type,
            status
        })

        res.status(201).json(newCustType);
    } catch (err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateCustType = async(req, res) => {
    try {
        const type = await CustTypeModel.update(req.body, {where: {id: req.query.id}});
        
        res.status(201).json(type);
    } catch (err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteCustType = async(req, res) => {
    try {
        const delCustType = await CustTypeModel.destroy({where: {id: req.query.id}});
        res.status(201).json(delCustType);
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