import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

// AllModel.ReceiptsModel.belongsTo(InvoiceModel, {
//     foreignKey: 'invoiceID'
// });

const getAllReceipt = async (req, res) => {
    try{
        const allReceipt = await AllModel.ReceiptsModel.findAll({
            include: [
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoice',
                    include: [
                        {
                            model: AllModel.PaymentsModel,
                            as: 'payments'
                        }
                    ]
                },
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                }
            ]
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
        const newReceipt = await AllModel.ReceiptsModel.create(req.body,{
            include: [
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoice'
                },
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                }
            ]
        });
        
        if(newReceipt){
            res.status(201).json(newReceipt);
        } else {
            res.status(404).json({error: `failed to insert receipt!`});
        }
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
        const receipt = await AllModel.ReceiptsModel.update(req.body, {
            where:{receipt_id: req.query.id},
            returning: true,
            include: [
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoice'
                },
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                }
            ]
        });
        
        if(receipt){
            res.status(201).json(receipt);
        } else {
            res.status(404).json({error: `failed to update receipt!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteReceipt = async (req, res) => {
    try{
        const delReceipt = await AllModel.ReceiptsModel.destroy({where:{receipt_id: req.query.id}});
        
        if(delReceipt){
            res.status(201).json(delReceipt);
        } else {
            res.status(404).json({error: `failed to delete receipt!`});
        }
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
//         const getData = await AllModel.ReceiptsModel.findAll({
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

const getReceiptByID = async(req, res) => {
    try{
        const getData = await AllModel.ReceiptsModel.findAll({
            where: {receipt_id: req.query.id},
            include: [
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoice'
                },
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                }
            ]
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get receipt data with ID is not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}



export default {
    getAllReceipt,
    insertReceipt,
    deleteReceipt,
    updateReceipt,
    getReceiptByID
};