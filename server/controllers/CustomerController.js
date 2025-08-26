import AllModel from "../models/AllModel.js";
import { Op, Sequelize, where } from "sequelize";

const getCustomers = async (req, res) => {
    try{
        const allCust = await AllModel.CustomersModel.findAll({
            include: [
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoices',
                    include: [
                        {
                            model: AllModel.CustomersModel,
                            as: 'customer'
                        }
                    ]
                },
                {
                    model: AllModel.PaymentsModel,
                    as: 'payments'
                },
                {
                    model: AllModel.OrdersModel,
                    as: 'orders',
                    include: [
                        {
                            model: AllModel.OrderItemsModel,
                            as: 'order_items'
                        }
                    ]
                },
            ]
        });
        if(allCust){
            res.json(allCust);
        } else {
            res.status(404).json({error: `get all customer not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getCustomersUnpaidInv = async (req, res) => {
    try{
        const allCust = await AllModel.CustomersModel.findAll({
            // where: { customer_id: req.query.custid },
            include: [
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoices',
                    where: { is_paid: false },
                    include: [
                        {
                            model: AllModel.CustomersModel,
                            as: 'customer'
                        },
                        {
                            model: AllModel.PaymentsModel,
                            as: 'payments'
                        },
                    ]
                },
                {
                    model: AllModel.PaymentsModel,
                    as: 'payments'
                },
                {
                    model: AllModel.OrdersModel,
                    as: 'orders',
                    include: [
                        {
                            model: AllModel.OrderItemsModel,
                            as: 'order_items'
                        }
                    ]
                },
            ]
        });
        if(allCust){
            res.json(allCust);
        } else {
            res.status(404).json({error: `get all customer not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertCustomers = async (req, res) => {
    const { name, img, custType, custTypeId, email, phonenumber,
        debtLimit, totalSales, totalDebt, gender, dob,
        country, province, city, postalCode, address } = req.body;
    try{
        const newCust = await AllModel.CustomersModel.create(req.body);
        
        if(newCust){
            res.status(201).json(newCust);
        } else {
            res.status(404).json({error: `failed to insert customer`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleCustomer = async (req, res) => {
    try{
        const newCusts = await AllModel.CustomersModel.bulkCreate(req.body);
        
        if(newCusts){
            res.status(201).json(newCusts);
        } else {
            res.status(404).json({error: `failed to multiple insert customer`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateCust= async (req, res) => {
    try{
        const cust = await AllModel.CustomersModel.update(req.body, {
            where:{customer_id: req.query.id},
            returning: true,
        });
        
        if(cust){
            res.status(201).json(cust);
        } else {
            res.status(404).json({error: `failed to update customer`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateCreditCust= async (req, res) => {
    try{
        const { customer_id } = req.params;
        const { credit } = req.body;
        
        // get customer id
        const cust = await AllModel.CustomersModel.findByPk(customer_id);
        if (!cust) return res.status(404).json({ message: 'customer not found.' });

        // assign data
        cust.credit = credit;
        await cust.save();

        res.json({ message: 'credit added.', cust });
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateOrderValue= async (req, res) => {
    try{
        const { customer_id, ordervalue } = req.params;
        const { order_unpaid } = req.body;
        
        // get customer id
        const cust = await AllModel.CustomersModel.findByPk(customer_id);
        if (!cust) return res.status(404).json({ message: 'customer not found.' });

        // assign data
        cust.total_sales = ordervalue;
        if(order_unpaid){
            cust.total_debt = order_unpaid;
        }
        await cust.save();

        res.json(cust);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateDebt = async (req, res) => {
    try{
        const { customer_id, debtminus } = req.params;
        
        // get customer id
        const cust = await AllModel.CustomersModel.findByPk(customer_id);
        if (!cust) return res.status(404).json({ message: 'customer not found.' });

        // assign data
        cust.total_debt = debtminus;
        await cust.save();

        res.json(cust);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateSalesDebt = async (req, res) => {
    try{
        const { customer_id, total_debt, total_sales } = req.params;
        
        // get customer id
        const cust = await AllModel.CustomersModel.findByPk(customer_id);
        if (!cust) return res.status(404).json({ message: 'customer not found.' });

        // assign data
        cust.total_debt = total_debt;
        cust.total_sales = total_sales;
        await cust.save();

        res.json(cust);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteCust = async (req, res) => {
    try{
        const delCust = await AllModel.CustomersModel.destroy({
            where:{customer_id: req.query.id}
        });
        
        if(delCust){
            res.status(201).json(delCust);
        } else {
            res.status(404).json({error: `failed to delete customer`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const countCustByName = async (req, res) => {
    // const name = req.query.name;
    try{
        const countCust = await AllModel.CustomersModel.findAll(
            
            {
                group: `name`,
                attributes: [
                  [Sequelize.literal(`name`), `name`],
                  [Sequelize.fn(`COUNT`, `name`), `count`]
                ]
            }
        );
        if(countCust){
            res.json(countCust);
        } else {
            res.status(404).json({error: `cust with ? not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getDebtData = async(req, res) => {
    try{
        const getData = await AllModel.CustomersModel.findAll({
            attributes: [
                'debt_limit',
                'total_debt'
            ],
            where: {customer_id: req.query.id}
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

const getCustomerByID = async(req, res) => {
    try{
        const getData = await AllModel.CustomersModel.findOne({
            where: {customer_id: req.query.id}
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

const getDetailedSales = async(req, res) => {

    try {
        const getAllAmount = await AllModel.CustomersModel.findAll({
            where: {
                customer_id: req.query.custid,
            },
            attributes: [
                'customer_id',
                'name',
                [Sequelize.fn("sum", Sequelize.col("orders.grandtotal")), "total_sales_grandtotal"],
                [Sequelize.fn("sum", Sequelize.col("orders->return_order.refund_total")), "total_refund"],
            ],
            include: [{
                model: AllModel.OrdersModel,
                where: {
                    order_status: {
                        [Op.ne]: 'canceled'
                    }
                },
                attributes:[],
                include: [
                    {
                        model: AllModel.ROModel,
                         as: 'return_order',
                        attributes:[],
                    }
                ]
            }],
            group: ['customers.customer_id']
        });
    
        if(getAllAmount){
            res.json(getAllAmount);
        } else {
            res.status(404).json({error: `get all total customer not found!`});
        }
    }
     catch(err) {
        res.status(500).json({err: err});
    }
}

const getDetailedCust = async(req, res) => {
    try {
        const getTotalSales = await AllModel.CustomersModel.findAll({
            where: {
                customer_id: req.query.custid,
            },
            attributes: [
                'customer_id',
                'name',
                [Sequelize.fn("COALESCE", Sequelize.fn("sum", Sequelize.col("orders.grandtotal")),0), "total_sales_grandtotal"],
                // [Sequelize.fn("COALESCE", Sequelize.fn("sum", Sequelize.col("orders->return_order.refund_total")),0), "total_refund"],
                // [Sequelize.fn("COALESCE", Sequelize.fn("sum", Sequelize.col("orders->return_order->orders_credit")),0), "total_refund"],
            ],
            include: [
                {
                    model: AllModel.OrdersModel,
                    where: {
                        order_status: {
                            [Op.ne]: 'canceled'
                        }
                    },
                    attributes:[],
                    // include: [
                    //     {
                    //         model: AllModel.ROModel,
                    //         as: 'return_order',
                    //         attributes:[],
                    //         where:{
                    //             return_method_id: 2
                    //         },                            
                    //     }
                    // ]
                },
                // {
                //     model: AllModel.OrdersCreditModel,
                //     // as: 'order',
                //     attributes:[],
                //     where:{
                //         order_id: {
                //             [Op.ne]: null
                //         }
                //     }
                // }
            ],
            group: ['customers.customer_id']
        });


        const getOrderCreditAvail = await AllModel.ROModel.findOne({
            attributes: [
                // 'customer_id',
                [Sequelize.fn("COALESCE",Sequelize.fn("SUM", Sequelize.col("refund_total")),0), "total"],
                
            ],
            include: [
                {
                model: AllModel.OrdersCreditModel,
                required: true,
                attributes: [],
                include: [
                    {
                    model: AllModel.OrdersModel,
                    required: true,
                    attributes: [],
                    where: {
                        customer_id: req.query.custid, // atau gunakan BigInt jika perlu
                        order_status: {
                            [Op.ne]: 'canceled'
                        }
                    }
                    }
                ]
                }
            ],
            raw: true,
            subQuery:false
        });

        const getOrderCreditNotComplete = await AllModel.ROModel.findOne({
            attributes: [
                // 'customer_id',
                [Sequelize.fn("COALESCE",Sequelize.fn("SUM", Sequelize.col("refund_total")),0), "total"],
                
            ],
            include: [
                {
                model: AllModel.OrdersCreditModel,
                required: true,
                attributes: [],
                include: [
                    {
                    model: AllModel.OrdersModel,
                    required: true,
                    attributes: [],
                    where: {
                        customer_id: req.query.custid, // atau gunakan BigInt jika perlu
                        is_complete: false
                    }
                    }
                ]
                }
            ],
            raw: true,
            subQuery:false
        });

        const totalRefund = await AllModel.ROModel.sum('refund_total', {
            where: { 
                customer_id: req.query.custid,
                return_method_id: 2,
                status: {
                    [Op.ne]: 'batal'
                }
            }
        });
        
        const getPartialOrder = await AllModel.OrdersModel.findAll({
            where: {
                customer_id: req.query.custid,
                payment_type: 'sebagian',
                order_status: {
                    [Op.ne]: 'canceled'
                }
            },
            attributes: [
                // 'customer_id',
                // 'name',
                [Sequelize.fn("COALESCE", Sequelize.fn("sum", Sequelize.col("invoice.remaining_payment")),0), "sisa"],
            ],
            include: [
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoice',
                    where: {
                        is_paid: false
                    },
                    attributes:[],
                }
            ],
            group: ['orders.customer_id']
            
        });

        const getAllAmount = await AllModel.CustomersModel.findAll({
            where: {
                customer_id: req.query.custid,
            },
            attributes: [
                'customer_id',
                'name',
                [Sequelize.fn("COALESCE", Sequelize.fn("sum", Sequelize.col("orders.grandtotal")),0), "total_debt_grandtotal"],
                // [Sequelize.fn("COALESCE", Sequelize.fn("sum", Sequelize.col("return_orders.refund_total")),0), "total_refund"],
                // [Sequelize.fn("sum", Sequelize.literal("DISTINCT payments.amount_paid")), "total_payment"],
            ],
            include: [
                {
                    model: AllModel.OrdersModel,
                    where: {
                        payment_type: {
                            [Op.eq]: 'bayar nanti',
                        },
                        order_status: {
                            [Op.ne]: 'canceled'
                        },
                        invoice_id: {
                            [Op.eq]: null
                        },
                        return_order_id: {
                            [Op.eq]: null
                        }
                    },
                    attributes:[],
                   
                },
            ],
            group: ['customers.customer_id']
        });

        const getOrderBBInvoiced = await AllModel.CustomersModel.findAll({
            where: {
                customer_id: req.query.custid,
            },
            attributes: [
                // [Sequelize.fn("COALESCE", Sequelize.fn("sum", Sequelize.col("orders.grandtotal")),0), "total_debt_grandtotal"],
                // [Sequelize.fn("COALESCE", Sequelize.fn("sum", Sequelize.col("orders->return_order.refund_total")),0), "total_refund"],
                [Sequelize.fn("COALESCE", Sequelize.fn("sum", Sequelize.col("orders->invoice.remaining_payment")),0), "sisa_hutang"],
            ],
            include: [
                {
                    model: AllModel.OrdersModel,
                    where: {
                        payment_type: {
                            [Op.eq]: 'bayar nanti',
                        },
                        order_status: {
                            [Op.ne]: 'canceled'
                        },
                        invoice_id: {
                            [Op.ne]: null
                        }
                    },
                    attributes:[],
                    include: [
                        {
                            model: AllModel.InvoicesModel,
                            as: 'invoice',
                            where: {
                                is_paid: false
                            },
                            attributes:[],
                        }
                    ],
                },
            ],
            group: ['customers.customer_id']
        });

        // if(getTotalSales && getAllAmount && getPartialOrder && getOrderBBInvoiced && ){
            let sales = getTotalSales.length > 0 ? getTotalSales : null;
            let debt = getAllAmount.length > 0 ? getAllAmount : null;

            // sales[0].setDataValue('availableRO', getROWAvailNextOrder[0]);
            if(sales){
                sales[0].setDataValue('return_refund', totalRefund ? totalRefund : 0);
                sales[0].setDataValue('orders_credit_uncanceled', getOrderCreditAvail);
            } else {
                sales = [];
                let obj = {
                    return_refund: totalRefund ? totalRefund : 0,
                    orders_credit_uncanceled: getOrderCreditAvail
                }
                sales.push(obj);
            }
            
            if(debt){
                // debt[0].setDataValue('availableRO', getROWAvailNextOrder[0]);
                debt[0].setDataValue('partial_sisa',getPartialOrder[0]);
                debt[0].setDataValue('hutang_invoice',getOrderBBInvoiced[0]);
                debt[0].setDataValue('return_refund', totalRefund ? totalRefund : 0);
                debt[0].setDataValue('orders_credit_uncomplete', getOrderCreditNotComplete);
                // debt[0].setDataValue('total_refund', totalRefund);
            } else {
                debt = [];
                let obj = {
                    return_refund: totalRefund ? totalRefund : 0,
                    partial_sisa: getPartialOrder[0] ? {...getPartialOrder[0]} : null,
                    hutang_invoice: getOrderBBInvoiced[0] ? getOrderBBInvoiced[0] : null,
                    orders_credit_uncomplete: getOrderCreditNotComplete
                };
                debt.push(obj);
            }

            res.json({sales: sales, debt: debt});
            // res.json(getAllAmount);
        // } else {
        //     res.status(404).json({error: `get all total customer not found!`});
        // }
    }
     catch(err) {
        res.status(500).json({err: err});
    }
}

export default {
    getCustomers, 
    getCustomerByID,
    insertCustomers, 
    insertMultipleCustomer, 
    updateCust,  
    deleteCust,
    countCustByName,
    getDebtData,
    getCustomersUnpaidInv,
    updateCreditCust,
    updateOrderValue,
    updateDebt,
    getDetailedSales,
    getDetailedCust,
    updateSalesDebt
};