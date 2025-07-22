import AllModel from "../models/AllModel.js";
import { Op, Sequelize } from "sequelize";

const getAllOrdersCredit = async(req, res) => {
    try{
        const ordersCredit = await AllModel.OrdersCreditModel.findAll({
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
        })

        if(ordersCredit){
            res.json(ordersCredit);
        } else {
            res.status(404).json({error: `get all orders credit`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const getOrderCreditByCust = async (req, res) => {
    try{
        const { cust_id } = req.params;
        const allCreditByCust = await AllModel.OrdersCreditModel.findAll({
            where: {customer_id: cust_id},
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
        });
        if(allCreditByCust){
            res.json(allCreditByCust);
        } else {
            res.status(404).json({error: `get all order credits by customer is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getAvailableOrderCreditByCust = async (req, res) => {
    try{
        const { cust_id } = req.params;
        const allCreditByCust = await AllModel.OrdersCreditModel.findAll({
            where: {
                customer_id: cust_id,
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
        if(allCreditByCust){
            res.json(allCreditByCust);
        } else {
            res.status(404).json({error: `get all order credits by customer is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getOrderCreditByRO = async (req, res) => {
    try{
        const { ro_id } = req.params;
        const allCreditByRO = await AllModel.OrdersCreditModel.findOne({
            where: {
                return_order_id: ro_id,
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
                {
                    model: AllModel.OrdersModel,
                    as: 'order',
                },
            ]
        });
        // if(allCreditByRO){
            res.json(allCreditByRO);
        // } else {
        //     res.status(404).json({error: `get all order credits by RO is not found!`});
        // }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertOrderCredit = async (req, res) => {
    try{
        const newOrderCredit = await AllModel.OrdersCreditModel.create(req.body);
        
        if(newOrderCredit){
            res.status(201).json(newOrderCredit);
        } else {
            res.status(404).json({error: `failed to insert order credit!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateMayorOrderCredit = async (req, res) => {
    try{
        const orderCredit = await AllModel.OrdersCreditModel.update(req.body, 
            {
                where:{order_credit_id: req.query.id},
                returning: true,
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
            });
        
        if(orderCredit){
            res.status(201).json(orderCredit);
        } else {
            res.status(404).json({error: `failed to update order credit!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const updateOrderIdOrderCredit = async (req, res) => {
    try{
        const { order_credit_id, order_id } = req.params;

        const orderCredit = await AllModel.OrdersCreditModel.findByPk(order_credit_id);
        
        if(!orderCredit){
            return res.status(404).json({ message: 'Order credit is not found.' });
        } 

        orderCredit.order_id = order_id;
        await orderCredit.save();

         res.json({ message: 'Update order credit => order id column.', orderCredit });
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteOrderCredit = async (req, res) => {
    try{
        const delOrderCredit = await AllModel.OrdersCreditModel.destroy({where:{order_credit_id: req.query.id}});
        
        if(delOrderCredit){
            res.status(201).json(delOrderCredit);
        } else {
            res.status(404).json({error: `failed to delete order credit!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const deleteOrderCreditByROId = async (req, res) => {
    try{
        const orderCredit = await AllModel.OrdersCreditModel.destroy({
            where:{
                return_order_id: req.query.ro_id
            }
        });

        if(orderCredit){
            res.status(201).json(orderCredit);
        } else {
            res.status(404).json({error: `failed to delete order credit by ro id!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};



export default {
    getAllOrdersCredit,
    getOrderCreditByCust,
    insertOrderCredit,
    updateMayorOrderCredit,
    getAvailableOrderCreditByCust,
    updateOrderIdOrderCredit,
    deleteOrderCredit,
    deleteOrderCreditByROId,
    getOrderCreditByRO
};