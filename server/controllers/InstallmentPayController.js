// import InstallmentPaymentModel from "../models/InstallmentPaymentModel.js";
// import { Sequelize } from "sequelize";

// const getAllInstallPayment = async (req, res) => {
//     try{
//         const allPayment = await InstallmentPaymentModel.findAll();
//         if(allPayment){
//             res.json(allPayment);
//         } else {
//             res.status(404).json({error: `get all installment payment is not found!`});
//         }
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const insertInstallPayment = async (req, res) => {
//     try{
//         const newPayment = await InstallmentPaymentModel.create(req.body);
//         res.status(201).json(newPayment);
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// // const insertMultipleSales = async (req, res) => {
// //     try{
// //         const newSales = await SalesModel.bulkCreate(req.body);
// //         res.status(201).json(newSales);
// //     } 
// //     catch(err) {
// //         res.status(500).json({err: "internal server error"});
// //     }
// // }

// const updateInstallPayment= async (req, res) => {
//     try{
//         const payment = await InstallmentPaymentModel.update(req.body, {where:{id: req.query.id}});
        
//         res.status(201).json(payment);
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const deleteInstallPayment = async (req, res) => {
//     try{
//         const delPayment = await InstallmentPaymentModel.destroy({where:{id: req.query.id}});
        
//         res.status(201).json(delPayment);
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// // const countSalesByCust = async (req, res) => {
// //     // const name = req.query.name;
// //     try{
// //         const countSales = await SalesModel.findAll(
            
// //             {
// //                 group: [
// //                     'custID',
// //                     'custName',
// //                     'custType',
// //                     'salesData'
// //                 ],
// //                 attributes: [
// //                   'custID',
// //                   'custName',
// //                   'custType',
// //                   'salesData',
// //                   [Sequelize.fn(`COUNT`, `custID`), `count`]
// //                 ]
// //             }
// //         );
// //         if(countSales){
// //             res.json(countSales);
// //         } else {
// //             res.status(404).json({error: `sales data by custID is not found!`});
// //         }
// //     } 
// //     catch(err) {
// //         res.status(500).json({err: "internal server error"});
// //     }
// // }

// // const getDebtData = async(req, res) => {
// //     try{
// //         const getData = await CustomerModel.findAll({
// //             attributes: [
// //                 'debtLimit',
// //                 'totalDebt'
// //             ],
// //             where: {id: req.query.id}
// //         })

// //         if(getData){
// //             res.json(getData);
// //         } else {
// //             res.status(404).json({error: `get customer debt data not found!`});
// //         }
// //     }
// //     catch(err) {
// //         res.status(500).json({err: "internal server error"});
// //     }
// // }

// const getInstallPaymentByInvId = async(req, res) => {
//     try{
//         const getData = await InstallmentPaymentModel.findAll({
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

// // const getSalesByStatus = async(req, res) => {
// //     try{
// //         const getData = await SalesModel.findAll({
// //             where: {status: req.query.status},
// //         })

// //         if(getData){
// //             res.json(getData);
// //         } else {
// //             res.status(404).json({error: `get customer data with ID not found!`});
// //         }
// //     }
// //     catch(err) {
// //         res.status(500).json({err: "internal server error"});
// //     }
// // }

// const getInstallPaymentByID = async(req, res) => {
//     try{
//         const getData = await InstallmentPaymentModel.findAll({
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



// export default {
//     getAllInstallPayment,
//     insertInstallPayment,
//     updateInstallPayment,
//     deleteInstallPayment,
//     getInstallPaymentByID,
//     getInstallPaymentByInvId
// };