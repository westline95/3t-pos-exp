import sequelize from "../config/Database.js";
import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

const getAllPayment = async (req, res) => {
    try{
        const allPayment = await AllModel.PaymentsModel.findAll({ 
            include: [
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoice',
                    include: [
                        {
                            model: AllModel.ReceiptsModel,
                            as: 'receipt'
                        },
                    ]
                },
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                }
            ]
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
    const t = await sequelize.transaction();
    
    try{
        const invoice = await AllModel.InvoicesModel.findByPk(req.body.invoice_id);
        if(!invoice) return res.status(404).json({message: 'Invoice not found!'});

        const currentPaid = await AllModel.PaymentsModel.sum('amount_paid', {where: {
            invoice_id: req.body.invoice_id
        }});
        const newTotalPaid = (currentPaid || 0) + req.body.amount_paid;

        const payment = await AllModel.PaymentsModel.create(
            req.body, { transaction: t}
        );
        
        let change = 0;
        if(newTotalPaid > invoice.amount_due){
            change = Math.abs(Number(newTotalPaid) - Number(invoice.amount_due));
        } else {
            change = 0;
        }
        
        // update invoice
        let modelInv = {
            is_paid: false,
            status: 1
        }
        if(newTotalPaid === Number(invoice.amount_due)){
            modelInv.is_paid = true;
            modelInv.remaining_payment = 0;
        }
        else if(newTotalPaid >= Number(invoice.amount_due)){
            modelInv.is_paid = true;
            modelInv.remaining_payment = 0;
        } else {
            modelInv.remaining_payment = (Number(invoice.remaining_payment) - Number(req.body.amount_paid));
        }

        await invoice.update(modelInv, { transaction: t });

        // create receipt if is_paid = true
        let receipt;
        if(modelInv.is_paid){
            receipt = await AllModel.ReceiptsModel.create({
                customer_id: req.body.customer_id,
                invoice_id: req.body.invoice_id,
                total_payment: newTotalPaid,
                change: change,
                url: null,
                receipt_date: new Date(),
            }, {transaction: t});
        }

        // update order status
        let getOrderIds = JSON.parse(invoice.order_id);

        const orders = await AllModel.OrdersModel.findAll({where:{
            order_id: getOrderIds
        }})

        if(!orders) return res.status(404).json({message: 'Orders not found!'});

        let orderStatus = {order_status: modelInv.is_paid ? 'completed' : 'pending'};
        await AllModel.OrdersModel.update(orderStatus, {
            where: {
                order_id: getOrderIds
            }
        }, {transaction: t});

        await t.commit();
        if(receipt){
            res.status(201).json({data: {payment, invoice, receipt}});
        } else {
            res.status(201).json({data: {payment, invoice}});
        }
    } 
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err.message});
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

// const updatePayment= async (req, res) => {
//     try{
//         const payment = await AllModel.PaymentsModel.update(req.body, {
//             where:{payment_id: req.query.id},
//             returning: true,
//             include: [
//                 {
//                     model: AllModel.InvoicesModel,
//                     as: 'invoice'
//                 },
//                 {
//                     model: AllModel.CustomersModel,
//                     as: 'customer'
//                 }
//             ]
//         });
        
//         if(payment){
//             res.status(201).json(payment);
//         } else {
//             res.status(404).json({error: `failed  to update payment!`});
//         }
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

const updatePayment = async (req, res) => {
    const t = await sequelize.transaction();
    
    try{
        const invoice = await AllModel.InvoicesModel.findByPk(req.body.invoice_id);
        if(!invoice) return res.status(404).json({message: 'Invoice not found!'});

        const currentPaid = await AllModel.PaymentsModel.sum('amount_paid', {where: {
            invoice_id: req.body.invoice_id
        }});
        const newTotalPaid = (currentPaid || 0) + req.body.amount_paid;

        const payment = await AllModel.PaymentsModel.update(
            req.body, { transaction: t}
        );
        
        let change = 0;
        if(newTotalPaid > invoice.amount_due){
            change = Math.abs(Number(newTotalPaid) - Number(invoice.amount_due));
        } else {
            change = 0;
        }
        
        // update invoice
        let modelInv = {
            status: 1
        }
        if(newTotalPaid === Number(invoice.amount_due)){
            modelInv.is_paid = true;
            modelInv.remaining_payment = 0;
        }
        else if(newTotalPaid >= Number(invoice.amount_due)){
            modelInv.is_paid = true;
            modelInv.remaining_payment = 0;
        } else {
            modelInv.is_paid = false;
            modelInv.remaining_payment = (Number(invoice.remaining_payment) - Number(req.body.amount_paid));
        }

        await invoice.update(modelInv, { transaction: t });

        // create receipt if is_paid = true
        let receipt;
        if(modelInv.is_paid){
            receipt = await AllModel.ReceiptsModel.create({
                customer_id: req.body.customer_id,
                invoice_id: req.body.invoice_id,
                total_payment: newTotalPaid,
                change: change,
                url: null,
                receipt_date: new Date(),
            }, {transaction: t});
        }

        // update order status
        let getOrderIds = JSON.parse(invoice.order_id);

        const orders = await AllModel.OrdersModel.findAll({where:{
            order_id: getOrderIds
        }})

        if(!orders) return res.status(404).json({message: 'Orders not found!'});

        let orderStatus = {order_status: modelInv.is_paid ? 'completed' : 'pending'};
        await AllModel.OrdersModel.update(orderStatus, {
            where: {
                order_id: getOrderIds
            }
        }, {transaction: t});

        await t.commit();
        if(receipt){
            res.status(201).json({data: {payment, invoice, receipt}});
        } else {
            res.status(201).json({data: {payment, invoice}});
        }
    } 
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err.message});
    }
}

const minorUpdatePayment= async (req, res) => {
    try{
        const payment = await AllModel.PaymentsModel.update(req.body, {
            where:{payment_id: req.query.id},
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
        
        if(payment){
            res.status(201).json(payment);
        } else {
            res.status(404).json({error: `failed  to update payment!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

// const deletePayment = async (req, res) => {
//     try{
//         const delPayment = await AllModel.PaymentsModel.destroy({where:{payment_id: req.query.id}});
        
//         if(delPayment){
//             res.status(201).json(delPayment);
//         } else {
//             res.status(404).json({error: `failed to delete payment!`});
//         }
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

const deletePayment = async (req, res) => {
    const t = await sequelize.transaction();
    
    try{
        const payment = await AllModel.PaymentsModel.findByPk(req.query.id);
        if(!payment) return res.status(404).json({message: 'Payment not found!'});
        
        const invoice = await AllModel.InvoicesModel.findByPk(payment.invoice_id, {
            include: [
                {
                    model: AllModel.ReceiptsModel
                }
            ]
        });
        if(!invoice) return res.status(404).json({message: 'Invoice not found!'});

        const currentPaid = Number(payment.amount_paid);
        
        // update invoice
        let modelInv;
        if(Number(invoice.remaining_payment) === 0){
            modelInv.remaining_payment = currentPaid;
        } else {
            modelInv.remaining_payment = Number(invoice.remaining_payment) + currentPaid;
        }

        
        if(Number(modelInv.remaining_payment) == 0) modelInv.is_paid = true;
        else modelInv.is_paid = false;

        if(modelInv) await invoice.update(modelInv, { transaction: t });
        
        let orderUpdate = {order_status: modelInv.is_paid ? 'completed' : 'pending'};

        // update receipt 
        if(invoice.receipt && !modelInv.is_paid){
            await AllModel.ReceiptsModel.destroy(invoice.receipt.receipt_id, {transaction: t});
            orderUpdate.receipt_id = null;
        }

        // update order status
        let getOrderIds = JSON.parse(invoice.order_id);

        const orders = await AllModel.OrdersModel.findAll({where: {
            order_id: getOrderIds
        }})

        if(!orders) return res.status(404).json({message: 'Orders not found!'});

        await AllModel.OrdersModel.update(orderUpdate, {
            where: {
                order_id: getOrderIds
            }
        }, {transaction: t});

        await t.commit();
        res.status(201).json({data: {payment, invoice}});
    } 
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err.message});
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
        const getData = await AllModel.PaymentsModel.findAll({
            where: {invoice_id: req.query.invid},
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
            res.status(404).json({error: `get payment by invoice id is not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getPaymentByCustId = async(req, res) => {
    try{
        const getData = await AllModel.PaymentsModel.findAll({
            where: {
                customer_id: req.query.custid,
                invoice_id: null
            },
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                }
            ]
        })

        res.json(getData);
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
        const getData = await AllModel.PaymentsModel.findAll({
            where: {payment_id: req.query.id},
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
    minorUpdatePayment,
    deletePayment,
    getPaymentByID,
    getPaymentByInvId,
    getPaymentByCustId
};