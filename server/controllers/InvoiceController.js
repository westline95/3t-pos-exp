import { Op, Sequelize, where } from "sequelize";
// import PaymentModel from "../models/PaymentModel.js";
import AllModel from "../models/AllModel.js";
import sequelize from "../config/Database.js";

const getAllInv = async (req, res) => {
    try{
        const allInv = await AllModel.InvoicesModel.findAll({
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
                {
                    model: AllModel.PaymentsModel,
                    as: 'payments',
                },
                {
                    model: AllModel.ReceiptsModel,
                    as: 'receipt',
                },
                
            ]
        });
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

// const insertInv = async (req, res) => {
//     const { custID, custName, salesRef, amount,
//         paid, dueDate, amountDue, status } = req.body;
//     try{
//         const newInv = await AllModel.InvoicesModel.create(req.body,{
//             include: [
//                 {
//                     model: AllModel.CustomersModel,
//                     as: 'customer'
//                 },
//             ]
//         });
        
//         if(newInv){
//             res.status(201).json(newInv);
//         } else {
//             res.status(404).json({error: `failed to insert invoice!`});
//         }
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }
const insertInv = async (req, res) => {
    const t = await sequelize.transaction();
    const { invoiceData,  paidData } = req.body;

    try{
        const newInv = await AllModel.InvoicesModel.create(invoiceData ,{
            returning: true,
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
            ]
        },{transaction: t});

        // update order => inv
        const orderIDs = JSON.parse(newInv.order_id);

        await AllModel.OrdersModel.update({invoice_id: newInv.invoice_id}, {
            where: {
                order_id: orderIDs
            }
        },{transaction: t});


        // if(paidData){
        //     // check if paidData is not null => insert payment
        //     let paymentModel = {
        //         customer_id: newInv.customer_id,
        //         invoice_id: newInv.invoice_id,
        //         payment_date: paidData.payment_date,
        //         amount_paid: paidData.amountOrigin,
        //         payment_method: paidData.payment_method,
        //         payment_ref: paidData.payment_ref,
        //         note: paidData.note 
        //     };

        //     await AllModel.PaymentsModel.create(paymentModel, {transaction: t});
        // }

        // if(newInv.is_paid){
        //     // create receipt
        //     let receiptModel = {
        //         customer_id: newInv.customer_id,
        //         invoice_id: newInv.invoice_id,
        //         total_payment: paidData.amountOrigin,
        //         change: paidData.change,
        //         receipt_date: new Date()
        //     };

        //     await AllModel.ReceiptsModel.create(receiptModel, {transaction: t});
        // }

        await t.commit();
        
    } 
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
}

const insertMultipleInv = async (req, res) => {
    try{
        const newInvs = await AllModel.InvoicesModel.bulkCreate(req.body);
        
        if(newInvs){
            res.status(201).json(newInvs);
        } else {
            res.status(404).json({error: `failed to insert multiple invoice`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateInv = async (req, res) => {
    try{
        const inv = await AllModel.InvoicesModel.update(req.body, {
            where:{invoice_id: req.query.id},
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
            ],
            returning: true
        });
        
        if(inv){
            res.status(201).json(inv);
        } else {
            res.status(404).json({error: `failed to update invoice`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}



const deleteInv = async (req, res) => {
    try{
        const delInv = await AllModel.InvoicesModel.destroy({where:{invoice_id: req.query.id}});
        
        if(delInv){
            res.status(201).json(delInv);
        } else {
            res.status(404).json({error: `failed to delete invoice`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const countInvByCust = async (req, res) => {
    // const name = req.query.name;
    try{
        const countInv = await AllModel.InvoicesModel.findAll(
            
            {
                group: `customer_id`,
                attributes: [
                  [Sequelize.literal(`customer_id`), `customer_id`],
                  [Sequelize.fn(`COUNT`, `customer_id`), `count`]
                ],
            }
        );
        if(countInv){
            res.json(countInv);
        } else {
            res.status(404).json({error: `invoice with cust id not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getInvByStatus = async(req, res) => {
    try{
        const getInv = await AllModel.InvoicesModel.findAll({
            
            where: {is_paid: req.query.ispaid},
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
            ]
        })

        if(getInv){
            res.json(getInv);
        } else {
            res.status(404).json({error: `get invoice data by paid status!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getInvByID = async(req, res) => {
    try{
        const getInv = await AllModel.InvoicesModel.findByPk(req.query.id,{
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer',
                },
                {
                    model: AllModel.PaymentsModel,
                    as: 'payments',
                },
                {
                    model: AllModel.ReceiptsModel,
                },
            ]
        })

        if(getInv){
            res.json(getInv);
        } else {
            res.status(404).json({error: `get invoice data with ID not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getInvByStatusCustId = async(req, res) => {
    try{
        const getInv = await AllModel.InvoicesModel.findAll({
            where: {
                customer_id: req.query.custid,
                is_paid: req.query.ispaid,
                payment_type: req.query.type
            },
            order:  [['invoice_date', 'ASC']],
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer',
                    include:[
                        {
                            model: AllModel.OrdersCreditModel,
                            as: 'orders_credits',
                            where:{
                                order_id: { [Op.ne]: null}
                            }
                        }
                    ]
                },
                {
                    model: AllModel.PaymentsModel,
                    as: 'payments',
                }
            ]
        })

        if(getInv){
            res.json(getInv);
        } else {
            res.status(404).json({error: `get invoice data with status and cust id is not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: err});
    }
};

export default {
    getAllInv,
    insertInv, 
    insertMultipleInv, 
    updateInv,  
    deleteInv,
    countInvByCust,
    getInvByStatus,
    getInvByID,
    getInvByStatusCustId,
};