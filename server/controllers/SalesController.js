import SalesModel from "../models/SalesModel.js";
import { Sequelize } from "sequelize";

const getAllSales = async (req, res) => {
    try{
        const allSales = await SalesModel.findAll();
        if(allSales){
            res.json(allSales);
        } else {
            res.status(404).json({error: `get all sales not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertSales = async (req, res) => {
    const { 
        salesDate, custID, custName, custType, salesData, status, statusId, source, 
        discount, grandTotal, note, totalPayment, remainingPayment, totalSales, 
        paymentMethod, totalQty, paymentData, paid
    } = req.body;
    try{
        const newCust = await SalesModel.create({
            salesDate,
            custID,
            custName,
            custType,      
            salesData,
            status,
            statusId,
            source,
            discount,
            grandTotal,
            note,
            totalPayment, 
            remainingPayment, 
            totalSales, 
            paymentMethod,
            totalQty,
            paymentData,
            paid
        });
        
        res.status(201).json(newCust);
    } 
    catch(err) {
        console.log(err)

        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleSales = async (req, res) => {
    try{
        const newSales = await SalesModel.bulkCreate(req.body);
        res.status(201).json(newSales);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateSales= async (req, res) => {
    try{
        const sales = await SalesModel.update(req.body, {where:{id: req.query.id}});
        
        res.status(201).json(sales);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteSales = async (req, res) => {
    try{
        const delSales = await SalesModel.destroy({where:{id: req.query.id}});
        
        res.status(201).json(delSales);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const countSalesByCust = async (req, res) => {
    // const name = req.query.name;
    try{
        const countSales = await SalesModel.findAll(
            
            {
                group: [
                    'custID',
                    'custName',
                    'custType',
                    'salesData'
                ],
                attributes: [
                  'custID',
                  'custName',
                  'custType',
                  'salesData',
                  [Sequelize.fn(`COUNT`, `custID`), `count`]
                ]
            }
        );
        if(countSales){
            res.json(countSales);
        } else {
            res.status(404).json({error: `sales data by custID is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getDebtData = async(req, res) => {
    try{
        const getData = await CustomerModel.findAll({
            attributes: [
                'debtLimit',
                'totalDebt'
            ],
            where: {id: req.query.id}
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get customer debt data not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getSalesCust = async(req, res) => {
    try{
        const getData = await SalesModel.findAll({
            where: {id: req.query.id}
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get customer data with ID not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getSalesByStatus = async(req, res) => {
    try{
        const getData = await SalesModel.findAll({
            where: {status: req.query.status},
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get customer data with ID not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getSalesByID = async(req, res) => {
    try{
        const getData = await SalesModel.findAll({
            where: {id: req.query.id}
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
    getAllSales,
    insertSales, 
    updateSales,
    insertMultipleSales, 
    deleteSales,  
    countSalesByCust,
    getSalesCust,
    getSalesByStatus,
    getSalesByID
};