import sequelize from "../config/Database.js";
import AllModel from "../models/AllModel.js";
import { Op, Sequelize } from "sequelize";

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
                },
                {
                    model: AllModel.OrdersCreditModel,
                    as: 'orders_credit',
                },
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

const validationDateSales = async (req, res) => {
    try{
        const allSales = await AllModel.OrdersModel.findAll({
            where: {
                customer_id: req.query.custid,
                order_date: {
                    [Op.eq]: req.body.order_date, 
                }
            },
        });

        res.json(allSales);
    } 
    catch(err) {
        res.status(500).json({err: err});
    }
}

// const insertSales = async (req, res) => {
//     const { 
//         salesDate, customer_id, custName, custType, salesData, status, statusId, source, 
//         discount, grandTotal, note, totalPayment, remainingPayment, total_sales, 
//         paymentMethod, totalQty, paymentData, paid, orderType, orderTypeId
//     } = req.body;
//     try{
//         // update total sales in customer
//         const cust = await AllModel.CustomersModel.findByPk(customer_id);
//         if(cust){
//             cust.total_sales = total_sales;
//             await cust.save();
//         }
       
//         const newSales = await AllModel.OrdersModel.create(req.body, {
//             returning: true,
//             include: [
//                 {
//                     model: AllModel.CustomersModel,
//                     as: 'customer',
//                     include: [
//                         {
//                             model: AllModel.OrdersCreditModel,
//                             as: 'orders_credits',
//                             where: { 
//                                 order_id: {
//                                     [Sequelize.Op.or]: [null,req.query.invid] }
//                             }
//                         }
//                     ]
//                 },
//             ]
//         });
        
//         res.status(201).json(newSales);
//     } 
//     catch(err) {
//         console.log(err)

//         res.status(500).json({err: "internal server error"});
//     }
// }

const insertSales = async (req, res) => {
    const t = await sequelize.transaction();
    const { 
        sales, order_items, delivery, paidData
    } = req.body;
    try{

        const newSales = await AllModel.OrdersModel.create(sales, {
            returning: true
        }, {transaction: t});

        if(!newSales) return res.status(404).json({ message: 'error when get order_id' });

        order_items.map(e => {
            e.order_id = newSales.order_id;
        })

        await AllModel.OrderItemsModel.bulkCreate(order_items, {transaction:t})

        let deliveryData = {};
        if(newSales.order_type == 'delivery' && delivery.courier_id !== "" || delivery.courier_id){
            let deliveryModel = {
                order_id: newSales.order_id,
                courier_id: delivery.courier_id,
                courier_name: delivery.courier_name,
                delivery_address: delivery.delivery_address,
                ship_date: new Date(delivery.ship_date),
                elivery_status: 'pending',
            }
    
            // check delivery with order id if existed
            const checkExistDelivery = await AllModel.DeliveryModel.findOne({ where: {order_id: newSales.order_id}});
            if(checkExistDelivery){
                return res.status(404).json({ message: 'Delivery already exists for this order.' });
            }
    
            deliveryData = await AllModel.DeliveryModel.create(deliveryModel, {returning:true}, {transaction:t});
        } 

        // check order credit
        const allCreditByCust = await AllModel.OrdersCreditModel.findAll({
            where: {
                customer_id: sales.customer_id,
                order_id: null
            },
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
                {
                    model: AllModel.ROModel,
                    as: 'return_order',
                    include: [
                        {
                            model: AllModel.CustomersModel,
                            as: 'customer'
                        },
                        {
                            model: AllModel.ROItemsModel,
                            as: 'return_order_items',
                        }
                    ]
                },
            ]
        });

        let orderCredit;
        if(allCreditByCust && allCreditByCust.length > 0){
            orderCredit = await AllModel.OrdersCreditModel.findByPk(allCreditByCust[0].order_credit_id,
                {
                    include: [
                        {
                            model: AllModel.ROModel,
                            as: 'return_order',
                        }
                    ]
                }
            );
            
            if(!orderCredit){
                return res.status(404).json({ message: 'Order credit is not found.' });
            } 
    
            orderCredit.order_id = newSales.order_id;
            await orderCredit.save({transaction:t});
        }

        let checkInvBB = false;
        let inv, receipt, updatedOrder = null;
        // invoicing handle (lunas && sebagian)
        if(newSales.payment_type == "lunas" || newSales.payment_type == "sebagian") {
            const invDate = new Date();
            const invDue = (invDate.getDate() + 7);

            let modelInv = {
                customer_id: newSales.customer_id,
                order_id: JSON.stringify([newSales.order_id]),
                invoice_date: invDate,
                invoice_due: invDue,
                subtotal: newSales.subtotal + (orderCredit ? Number(orderCredit.return_order.refund_total) : 0),
                amount_due: newSales.grandtotal + (orderCredit ? Number(orderCredit.return_order.refund_total) : 0),
                total_discount: Number(newSales.order_discount),
                // is_paid: true,
                // remaining_payment: 0,
                payment_type: newSales.payment_type,
                status: 1
            };
            if(newSales.payment_type == "lunas"){
                modelInv.is_paid = true;
                modelInv.remaining_payment = 0;
            } else {
                modelInv.is_paid = false;
                modelInv.remaining_payment = (newSales.grandtotal + (orderCredit ? Number(orderCredit.return_order.refund_total) : 0)) - (paidData ? Number(paidData.amountOrigin):0);
            }

            // create invoice
            inv = await AllModel.InvoicesModel.create(modelInv, {
                returning: true
            },{transaction: t});

            const checkOrder = await AllModel.OrdersModel.findByPk(newSales.order_id);
            if(!checkOrder){
                return res.status(404).json({ message: 'Order is not found.' });
            } 

            updatedOrder = await AllModel.OrdersModel.update({invoice_id: inv.invoice_id}, {
                where:{
                    order_id: newSales.order_id
                },
                returning: true
            }, {transaction: t})
            // updatedOrder.invoice_id = inv.invoice_id;
            // updatedOrder.save({transaction:t});

            // handle payment
             if(!paidData){
                return res.status(404).json({ message: 'Payment data not found' });
            }

            let paymentModel = {
                customer_id: inv.customer_id,
                invoice_id: inv.invoice_id,
                payment_date: paidData.payment_date,
                amount_paid: paidData.amountOrigin,
                payment_method: paidData.payment_method,
                payment_ref: paidData.payment_ref,
                note: paidData.note 
            };

            // save payment
            await AllModel.PaymentsModel.create(paymentModel, {transaction: t});

            // handle receipt if is_paid true
            if(inv.is_paid){
                let receiptModel = {
                    customer_id: inv.customer_id,
                    invoice_id: inv.invoice_id,
                    total_payment: Number(paidData.amountOrigin),
                    change: Number(paidData.change),
                    receipt_date: new Date()
                }

                receipt = await AllModel.ReceiptsModel.create(receiptModel, {returning: true} ,{transaction: t});

                // update order => receipt_id 
                updatedOrder = await AllModel.OrdersModel.update({receipt_id: receipt.receipt_id}, {
                    where:{
                        order_id: newSales.order_id
                    },
                    returning: true
                }, {transaction: t})
            }
            checkInvBB = false;
        } else {
            // control mergeinv by user confirmation in front end 
            // if yes => join order to available invoice then update invoice and order:invoice_id
            // if no do nothing
            checkInvBB = true;
        }

        await t.commit();
        if(Object.keys(deliveryData).length > 0){
            res.status(201).json({
                order: updatedOrder ? updatedOrder[1] : newSales, 
                order_credit: allCreditByCust, 
                delivery: deliveryData,
                invoice: inv,
                receipt: receipt,
                checkInv: checkInvBB
            });
        } else {
            res.status(201).json({
                order: updatedOrder ? updatedOrder[1] : newSales, 
                order_credit: allCreditByCust,
                invoice: inv,
                receipt: receipt,
                checkInv: checkInvBB
            });
        }
    } 
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
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

const updateSalesReceipt = async (req, res) => {
     try{
        const { receipt_id } = req.body;

       const sales = await AllModel.OrdersModel.update({receipt_id: receipt_id, is_complete: true, order_status: 'completed'}, {
            where: {order_id: req.query.id},
            returning: true,
        });

        if(!sales){
            res.status(404).json({err: `failed to update sales=>receipt`});
        } 

        res.status(201).json(sales);
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
        // const { order_type, ship_date, delivery_address } = req.body;
        const { order_id } = req.params;

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
        if(req.body.order_type && req.body.order_type == 'delivery'){
            // check exist delivery
            const checkExistDelivery = await AllModel.DeliveryModel.findOne({where: {order_id: order_id}});
            if(!checkExistDelivery){
                if(req.body.ship_date, req.body.delivery_address){
                    const delivery = await AllModel.DeliveryModel.create({
                        order_id,
                        ship_date: req.body.ship_date,
                        delivery_status: 'pending',
                        delivery_address: req.body.delivery_address
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

const updateSalesMayor= async (req, res) => {
    try{
        // const { order_type, ship_date, delivery_address } = req.body;
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
        if(req.body.order_type && req.body.order_type == 'delivery'){
            // check exist delivery
            const checkExistDelivery = await AllModel.DeliveryModel.findOne({where: {order_id: order_id}});
            if(!checkExistDelivery){
                if(req.body.ship_date, req.body.delivery_address){
                    const delivery = await AllModel.DeliveryModel.create({
                        order_id,
                        ship_date: req.body.ship_date,
                        delivery_status: 'pending',
                        delivery_address: req.body.delivery_address
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
        const { order_status, is_complete } = req.body;

        const sales = await AllModel.OrdersModel.update({order_status: order_status, is_complete: is_complete}, {
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
        const { return_order_id, order_discount } = req.body;
        
        // get order id
        const order = await AllModel.OrdersModel.findByPk(order_id);
        if (!order) return res.status(404).json({ message: 'Order not found.' });

        // assign roID
        order.return_order_id = return_order_id;
        
        if(order_discount){
            order.order_discount = order_discount;
        }
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
                    where: { payment_type: 'belum bayar' },
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
                    required: true,
                    include: [
                        {
                            model: AllModel.ROModel,
                            as: 'return_order',
                        },
                        {
                            model: AllModel.OrdersCreditModel,
                            as: 'orders_credit',
                            include: [
                                {
                                    model: AllModel.ROModel,
                                    as: 'return_order',
                                },
                            ]
                        }
                    ]
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

const checkNextCustSales = async(req, res) => {
    try{
        const { id, order_date  } = req.query;
        const getData = await AllModel.OrdersModel.findAll({
            where: {
                customer_id: id,
                order_date: { [Op.gte]: new Date(order_date) },
                order_status: {[Op.eq]: 'pending'}
            },
            order: [["order_date", "ASC"]],
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
                        },
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

const forFilteredRO = async(req, res) => {
    try{
        const getData = await AllModel.OrdersModel.findAll({
            where: {
                customer_id: req.query.id,
                order_status: {[Op.ne]: 'canceled'},
                return_order_id: {
                    [Op.eq]: null
                }
            },
            include: [
                {
                    model: AllModel.CustomersModel,
                },
                {
                    model: AllModel.OrderItemsModel,
                    required: true,
                    include: [
                        {
                            model: AllModel.ProductsCatalogModel,
                        },
                    ]
                },
                {
                    model: AllModel.DeliveryModel,
                },
                {
                    model: AllModel.InvoicesModel,
                },
                
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
            order: [["createdAt", "ASC"]],
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
                                            include: [
                                                {
                                                    model: AllModel.ProductsCatalogModel,
                                                    as: 'product',
                                                }
                                            ]
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
                    model: AllModel.ROModel,
                    as: 'return_order',
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

const salesByReceipt = async (req, res) => {
    try{
         const countSales = await AllModel.OrdersModel.findAll({
            where: {receipt_id: req.query.id},
            order: [["createdAt", "ASC"]],
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
                                            include: [
                                                {
                                                    model: AllModel.ProductsCatalogModel,
                                                    as: 'product',
                                                }
                                            ]
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
                    model: AllModel.ROModel,
                    as: 'return_order',
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
    updateRO, 
    checkNextCustSales,
    updateSalesMayor,
    validationDateSales,
    updateSalesReceipt,
    forFilteredRO,
    salesByReceipt
};