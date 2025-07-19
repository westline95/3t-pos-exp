import sequelize from "../config/Database.js";
import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

const getAllSales = async (req, res) => {
    try{
        const allSales = await AllModel.OrdersModel.findAll({
            order:  [['createdAt', 'ASC']],
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
                {
                    model: AllModel.OrderItemsModel,
                    as: 'order_items',
                    required: true
                },
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoice',
                    include: [
                       {
                            model: AllModel.PaymentsModel,
                            as: 'payments',
                        }
                    ]
                },
                {
                    model: AllModel.DeliveryModel,
                    as: 'delivery',
                },
                {
                    model: AllModel.ROModel,
                    as: 'return_order',
                    include: [
                        {
                            model: AllModel.ROItemsModel,
                            as: 'return_order_item',
                        },
                    ]
                }
            ],
        });
        if(allSales){
            res.json(allSales);
        } else {
            res.status(404).json({error: `get all sales not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: err});
    }
}

const insertSales = async (req, res) => {
    const { 
        salesDate, customer_id, custName, custType, salesData, status, statusId, source, 
        discount, grandTotal, note, totalPayment, remainingPayment, total_sales, 
        paymentMethod, totalQty, paymentData, paid, orderType, orderTypeId
    } = req.body;
    try{
        // update total sales in customer
        const cust = await AllModel.CustomersModel.findByPk(customer_id);
        if(cust){
            cust.total_sales = total_sales;
            await cust.save();
        }
       
        const newCust = await AllModel.OrdersModel.create(req.body, {
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
            ]
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
        const newSales = await AllModel.OrdersModel.bulkCreate(req.body, {
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
            ]
        });
        res.status(201).json(newSales);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

// only one data
const updateSalesAddInv= async (req, res) => {
     try{
        const { invoice_id } = req.body;
        const { order_id } = req.params;

        const sales = await AllModel.OrdersModel.findByPk(order_id);
        
        if(!sales){
            return res.status(404).json({ message: 'Sales not found.' });
        } 

        sales.invoice_id = invoice_id;
        await sales.save();

         res.json({ message: 'Update sales => invoice id column.', sales });
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const updateSalesAddInvoices = async (req, res) => {
     try{

        const sales = await AllModel.OrdersModel.update(req.body, {
            where: {
                order_id: req.query.id
            }
        });
        
        if(!sales){
            return res.status(404).json({ message: 'not found or empty, Failed to update invoice_id in sales' });
        } 

        res.json({ message: 'Update sales => invoice id column.', sales });
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const updateSales= async (req, res) => {
    try{
        const { order_type, ship_date, delivery_address } = req.body;
        const { order_id } = req.query.id;

        const sales = await AllModel.OrdersModel.update(req.body, {
            where:{order_id: order_id},
            returning: true,
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
            ]
        });

        if(!sales){
            res.status(404).json({error: `failed to updated sales`});
        } 
        
        // check order type first
        if(order_type && order_type == 'delivery'){
            // check exist delivery
            const checkExistDelivery = await AllModel.DeliveryModel.findOne({where: {order_id: order_id}});
            if(!checkExistDelivery){
                if(ship_date, delivery_address){
                    const delivery = await AllModel.DeliveryModel.create({
                        order_id,
                        ship_date,
                        delivery_status: 'pending',
                        delivery_address
                    });

                    if(delivery){
                        res.status(201).json(delivery);
                    } else {
                        res.status(404).json({error: `failed to create delivery`});
                    }
                }
            } else {
                return res.status(409).json({ message: 'Delivery already exists for this order.' });
            }
            
        } else {
            res.status(201).json(sales);
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateOrderStatus = async (req, res) => {
    try{
        const { order_status } = req.body;

        const sales = await AllModel.OrdersModel.update({order_status: order_status}, {
            where: {order_id: req.query.id},
            returning: true,
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoice'
                },
            ]
        });

        if(!sales){
            res.status(404).json({erropatchr: `failed to updated sales`});
        } 

        res.status(201).json(sales);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateRO = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { return_order_id } = req.body;
        
        // get order id
        const order = await AllModel.OrdersModel.findByPk(order_id);
        if (!order) return res.status(404).json({ message: 'Order not found.' });

        // assign roID
        order.return_order_id = return_order_id;
        await order.save();

        res.status(201).json(order);
    } catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const deleteSales = async (req, res) => {
    try{
        const delSales = await AllModel.OrdersModel.destroy({where:{order_id: req.query.id}});
        
        res.status(201).json(delSales);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const countSalesByCust = async (req, res) => {
    // const name = req.query.name;
    try{
        const countSales = await AllModel.OrdersModel.findAll(
            
            {
                group: [
                    'customer_id',
                ],
                attributes: [
                  'customer_id',
                  [Sequelize.fn(`COUNT`, `customer_id`), `count`]
                ],
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

const salesByCustUnpaid = async (req, res) => {
    // const name = req.query.name;
    try{
         const countSales = await AllModel.CustomersModel.findAll({
            include: [
                {
                    model: AllModel.OrdersModel,
                    as: 'orders',
                    where: { payment_type: 'unpaid' },
                    required: true
                }
            ]
        });
        if(countSales){
            res.json(countSales);
        } else {
            res.status(404).json({error: `sales data by cust unpaid is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const salesByOneCustPayType = async (req, res) => {
    try{
         const countSales = await AllModel.CustomersModel.findOne({
            where: {customer_id: req.query.custid},
            include: [
                {
                model: AllModel.OrdersModel,
                as: 'orders',
                where: { 
                    payment_type: req.query.paytype,
                    order_status: {[Sequelize.Op.not]: 'canceled'},
                    invoice_id: null 
                },
                required: true
                }
            ]
        });
        if(countSales){
            res.json(countSales);
        } else {
            res.status(404).json({
                error: 404, 
                message: `sales data by cust id where unpaid and doesn't have invoice is not found!`
            });
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const salesByOneCustPayType2 = async (req, res) => {
    try{
         const countSales = await AllModel.CustomersModel.findOne({
            where: {customer_id: req.query.custid},
            include: [
                {
                model: AllModel.OrdersModel,
                as: 'orders',
                where: { 
                    payment_type: req.query.paytype,
                    order_status: {[Sequelize.Op.not]: 'canceled'},
                    invoice_id: {
                        [Sequelize.Op.or]: [null,req.query.invid]
                    }
                },
                required: true
                }
            ]
        });
        if(countSales){
            res.json(countSales);
        } else {
            res.status(404).json({
                error: 404, 
                message: `sales data by cust id where unpaid and doesn't have invoice is not found!`
            });
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getSalesCust = async(req, res) => {
    try{
        const getData = await AllModel.OrdersModel.findAll({
            where: {customer_id: req.query.id},
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
                {
                    model: AllModel.OrderItemsModel,
                    as: 'order_items',
                    required: true
                },
                {
                    model: AllModel.DeliveryModel,
                    as: 'delivery',
                    required: false
                },
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoice',
                    include: [
                        {
                            model: AllModel.PaymentsModel,
                            as: 'payments'
                        },
                    ]
                },
                
            ]
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


const getSalesCustNotCanceled = async(req, res) => {
    try{
        const getData = await AllModel.OrdersModel.findAll({
            where: {
                customer_id: req.query.id,
                order_status: {[Sequelize.Op.not]: 'canceled'},
            },
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
                {
                    model: AllModel.OrderItemsModel,
                    as: 'order_items',
                    required: true,
                    include: [
                        {
                            model: AllModel.ProductsCatalogModel,
                            as: 'product',
                        }
                    ]
                },
                {
                    model: AllModel.DeliveryModel,
                    as: 'delivery',
                },
                {
                    model: AllModel.InvoicesModel,
                    as: 'invoice',
                    include: [
                        {
                            model: AllModel.PaymentsModel,
                            as: 'payments'
                        },
                    ]
                },
                {
                    model: AllModel.ROModel,
                    as: 'return_order',
                    include: [
                        {
                            model: AllModel.ROItemsModel,
                            as: 'return_order_item',
                        },
                    ]
                }
                
            ]
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get customer data with ID and order status not canceled not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getSalesByStatus = async(req, res) => {
    try{
        const getData = await AllModel.OrdersModel.findAll({
            where: {is_complete: req.query.iscomplete},
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
                {
                    model: AllModel.OrderItemsModel,
                    as: 'order_items',
                    required: true
                },
                {
                    model: AllModel.DeliveryModel,
                    as: 'delivery',
                    required: false
                },
            ]
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
        const getData = await AllModel.OrdersModel.findAll({
            where: {order_id: req.query.id},
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer',
                    required: true
                },
                {
                    model: AllModel.OrderItemsModel,
                    as: 'order_items',
                    required: true
                },
                {
                    model: AllModel.DeliveryModel,
                    as: 'delivery',
                    required: false
                },
            ]
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


const salesWOrderItems = async (req, res) => {
    try{
         const countSales = await AllModel.OrdersModel.findAll({
            where: {order_id: req.query.id},
            order: [["order_date", "ASC"]],
            include: [
                {
                    model: AllModel.OrderItemsModel,
                    as: 'order_items',
                    required: true,
                    include: [
                        {
                            model: AllModel.ProductsCatalogModel,
                            as: 'product',
                            required: true,
                        },
                        {
                            model: AllModel.ROItemsModel,
                            as: 'return_order_item',
                            include: [
                                {
                                    model: AllModel.ROModel,
                                    as: 'return_order',
                                },
                            ]
                        },
                    ]
                },
                {
                    model: AllModel.OrdersCreditModel,
                    as: 'orders_credit',
                    include: [
                        {
                            model: AllModel.ROModel,
                            as: 'return_order',
                            include: [
                                {
                                    model: AllModel.ROItemsModel,
                                    as: 'return_order_items',
                                    include: [
                                        {
                                            model: AllModel.OrderItemsModel,
                                            as: 'order_item',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: AllModel.OrdersModel,
                            as: 'order',
                            include: [{
                                model: AllModel.OrderItemsModel,
                                as: 'order_items',
                                include: [
                                    {
                                        model: AllModel.ProductsCatalogModel,
                                        as: 'product',
                                    },
                                    
                                ]
                            }]
                        },
                    ]
                },
                {
                    model: AllModel.DeliveryModel,
                    as: 'delivery',
                    required: false
                },
                {
                    model: AllModel.CustomersModel,
                    as: 'customer',
                    required: true
                },
                
            ]
        });
        if(countSales){
            res.json(countSales);
        } else {
            res.status(404).json({error: `sales data with order items is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getSalesAndSum = async(req, res) => {
    try{
        const getData = await AllModel.OrdersModel.findAll({
            where: {
                customer_id: req.query.id,
                payment_type: req.query.paytype
            },
            attributes: [
                "customer_id",
                [sequelize.fn("SUM", sequelize.col("subtotal")), "total_subtotal"],
                [sequelize.fn("SUM", sequelize.col("grandtotal")), "total_grandtotal"],
                [sequelize.fn("SUM", sequelize.col("order_discount")), "total_order_disc"],
            ],
            group: ['customer_id'],
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get sales data with sum not found!`});
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
    getSalesByID,
    salesByCustUnpaid,
    salesWOrderItems,
    salesByOneCustPayType,
    salesByOneCustPayType2,
    getSalesAndSum,
    updateSalesAddInv,
    updateSalesAddInvoices,
    updateOrderStatus,
    getSalesCustNotCanceled,
    updateRO
};