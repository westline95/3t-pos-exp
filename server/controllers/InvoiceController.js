import InvoiceModel from "../models/InvoiceModel.js";
import { Sequelize, where } from "sequelize";

const getAllInv = async (req, res) => {
    try{
        const allInv = await InvoiceModel.findAll();
        if(allInv){
            res.json(allInv);
        } else {
            res.status(404).json({error: `get all invoices not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertInv = async (req, res) => {
    const { custID, custName, salesRef, amount,
        paid, dueDate, amountDue, status } = req.body;
    try{
        const newInv = await InvoiceModel.create(req.body);
        
        res.status(201).json(newInv);
    } 
    catch(err) {
        console.log(err)

        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleInv = async (req, res) => {
    try{
        const newInvs = await InvoiceModel.bulkCreate(req.body);
        res.status(201).json(newInvs);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateInv= async (req, res) => {
    try{
        const inv = await InvoiceModel.update(req.body, {where:{id: req.query.id}});
        
        res.status(201).json(inv);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteInv = async (req, res) => {
    try{
        const delInv = await InvoiceModel.destroy({where:{id: req.query.id}});
        
        res.status(201).json(delInv);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const countInvByCust = async (req, res) => {
    // const name = req.query.name;
    try{
        const countInv = await InvoiceModel.findAll(
            
            {
                group: `name`,
                attributes: [
                  [Sequelize.literal(`name`), `name`],
                  [Sequelize.fn(`COUNT`, `name`), `count`]
                ]
            }
        );
        if(countProduct){
            res.json(countInv);
        } else {
            res.status(404).json({error: `product with ? not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getInvByStatus = async(req, res) => {
    try{
        const getInv = await CustomerModel.findAll({
            
            where: {status: req.query.status}
        })

        if(getInv){
            res.json(getInv);
        } else {
            res.status(404).json({error: `get customer debt data not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getInvByID = async(req, res) => {
    try{
        const getInv = await InvoiceModel.findAll({
            where: {id: req.query.id}
        })

        if(getInv){
            res.json(getInv);
        } else {
            res.status(404).json({error: `get customer data with ID not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}



export default {
    getAllInv,
    insertInv, 
    insertMultipleInv, 
    updateInv,  
    deleteInv,
    countInvByCust,
    getInvByStatus,
    getInvByID
};