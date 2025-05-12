import ReceiptModel from "../models/ReceiptModel.js";
import InvoiceModel from "../models/InvoiceModel.js";
import { Sequelize } from "sequelize";

const getAllReceipt = async (req, res) => {
    try{
        const allReceipt = await ReceiptModel.findAll({ 
            include: {
                model: InvoiceModel,
                as: 'invoice'
            }  
        });
        if(allReceipt){
            res.json(allReceipt);
        } else {
            res.status(404).json({error: `get all receipt is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertReceipt = async (req, res) => {
    try{
        const newReceipt = await ReceiptModel.create(req.body);
        res.status(201).json(newReceipt);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

// const insertMultipleSales = async (req, res) => {
//     try{
//         const newSales = await SalesModel.bulkCreate(req.body);
//         res.status(201).json(newSales);
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

const updateReceipt= async (req, res) => {
    try{
        const receipt = await ReceiptModel.update(req.body, {where:{id: req.query.id}});
        
        res.status(201).json(receipt);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteReceipt = async (req, res) => {
    try{
        const delReceipt = await ReceiptModel.destroy({where:{id: req.query.id}});
        
        res.status(201).json(delReceipt);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

// const countSalesByCust = async (req, res) => {
//     // const name = req.query.name;
//     try{
//         const countSales = await SalesModel.findAll(
            
//             {
//                 group: [
//                     'custID',
//                     'custName',
//                     'custType',
//                     'salesData'
//                 ],
//                 attributes: [
//                   'custID',
//                   'custName',
//                   'custType',
//                   'salesData',
//                   [Sequelize.fn(`COUNT`, `custID`), `count`]
//                 ]
//             }
//         );
//         if(countSales){
//             res.json(countSales);
//         } else {
//             res.status(404).json({error: `sales data by custID is not found!`});
//         }
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const getDebtData = async(req, res) => {
//     try{
//         const getData = await CustomerModel.findAll({
//             attributes: [
//                 'debtLimit',
//                 'totalDebt'
//             ],
//             where: {id: req.query.id}
//         })

//         if(getData){
//             res.json(getData);
//         } else {
//             res.status(404).json({error: `get customer debt data not found!`});
//         }
//     }
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const getPaymentByInvId = async(req, res) => {
//     try{
//         const getData = await ReceiptModel.findAll({
//             where: {invoiceID: req.query.id}
//         })

//         if(getData){
//             res.json(getData);
//         } else {
//             res.status(404).json({error: `get payment by invoice id is not found!`});
//         }
//     }
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const getSalesByStatus = async(req, res) => {
//     try{
//         const getData = await SalesModel.findAll({
//             where: {status: req.query.status},
//         })

//         if(getData){
//             res.json(getData);
//         } else {
//             res.status(404).json({error: `get customer data with ID not found!`});
//         }
//     }
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const getPaymentByID = async(req, res) => {
//     try{
//         const getData = await ReceiptModel.findAll({
//             where: {id: req.query.id}
//         })

//         if(getData){
//             res.json(getData);
//         } else {
//             res.status(404).json({error: `get payment data with ID is not found!`});
//         }
//     }
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }



export default {
    getAllReceipt,
    insertReceipt,
    deleteReceipt,
    updateReceipt
};