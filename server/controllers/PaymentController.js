import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

const getAllPayment = async (req, res) => {
    try{
        const allPayment = await AllModel.PaymentModel.findAll({ 
            include: {
                model: AllModel.InvoiceModel,
                as: 'invoice'
            }  
        });
        if(allPayment){
            res.json(allPayment);
        } else {
            res.status(404).json({error: `get all payment is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertPayment = async (req, res) => {
    try{
        const newPayment = await AllModel.PaymentModel.create(req.body);
        res.status(201).json(newPayment);
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

const updatePayment= async (req, res) => {
    try{
        const payment = await AllModel.PaymentModel.update(req.body, {where:{id: req.query.id}});
        
        res.status(201).json(payment);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deletePayment = async (req, res) => {
    try{
        const delPayment = await AllModel.PaymentModel.destroy({where:{id: req.query.id}});
        
        res.status(201).json(delPayment);
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

const getPaymentByInvId = async(req, res) => {
    try{
        const getData = await AllModel.PaymentModel.findAll({
            where: {invoiceID: req.query.id},
            include: {
                model: AllModel.InvoiceModel,
                as: 'invoice'
            } 
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get payment by invoice id is not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

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

const getPaymentByID = async(req, res) => {
    try{
        const getData = await AllModel.PaymentModel.findAll({
            where: {id: req.query.id},
            include: {
                model: AllModel.InvoiceModel,
                as: 'invoice'
            } 
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get payment data with ID is not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}



export default {
    getAllPayment,
    insertPayment,
    updatePayment,
    deletePayment,
    getPaymentByID,
    getPaymentByInvId
};