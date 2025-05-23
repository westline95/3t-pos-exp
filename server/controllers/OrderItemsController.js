import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

const getAllOrderItem = async (req, res) => {
    try{
        const allOrderItems = await AllModel.OrderItemsModel.findAll({
            include: [
                {
                    model: AllModel.OrdersModel,
                    as: 'order'
                },
                {
                    model: AllModel.ProductsCatalogModel,
                    as: 'product'
                },
            ]
        });
        if(allOrderItems){
            res.json(allOrderItems);
        } else {
            res.status(404).json({error: `get all order items not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertOrderItems = async (req, res) => {
    const { 
        salesDate, custID, custName, custType, salesData, status, statusId, source, 
        discount, grandTotal, note, totalPayment, remainingPayment, totalSales, 
        paymentMethod, totalQty, paymentData, paid, orderType, orderTypeId
    } = req.body;
    try{
        const newOrderItem = await AllModel.OrderItemsModel.create(req.body, {
            include: [
                {
                    model: AllModel.OrdersModel,
                    as: 'order'
                },
                {
                    model: AllModel.ProductsCatalogModel,
                    as: 'product'
                },
            ]
        });
        
        if(newOrderItem){
            res.status(201).json(newOrderItem);
        } else {
            res.status(404).json({error: `failed to insert order item!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleOrderItem = async (req, res) => {
    try{
        const newOrderItems = await AllModel.OrderItemsModel.bulkCreate(req.body,{
            include: [
                {
                    model: AllModel.OrdersModel,
                    as: 'order'
                },
                {
                    model: AllModel.ProductsCatalogModel,
                    as: 'product'
                },
            ]
        });
        
        if(newOrderItems){
            res.status(201).json(newOrderItems);
        } else {
            res.status(404).json({error: `failed to insert multiples order item!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateOrderItem= async (req, res) => {
    try{
        const orderItem = await AllModel.OrderItemsModel.update(req.body, 
            {
                where:{id: req.query.id},
                returning: true,
                include: [
                    {
                        model: AllModel.OrdersModel,
                        as: 'order'
                    },
                    {
                        model: AllModel.ProductsCatalogModel,
                        as: 'product'
                    },
                ],
            });
        
        if(orderItem){
            res.status(201).json(orderItem);
        } else {
            res.status(404).json({error: `failed to update order item!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteOrderItem = async (req, res) => {
    try{
        const delOrderItem = await AllModel.OrderItemsModel.destroy({where:{id: req.query.id}});
        
        if(delOrderItem){
            res.status(201).json(delOrderItem);
        } else {
            res.status(404).json({error: `failed to delete order item!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const deleteOrderItemByOrderID = async (req, res) => {
    try{
        const delOrderItem = await AllModel.OrderItemsModel.destroy({where:{order_id: req.query.id}});
        
        if(delOrderItem){
            res.status(201).json(delOrderItem);
        } else {
            res.status(404).json({error: `failed to delete order item by order id!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const getOrderItemByID = async(req, res) => {
    try{
        const getData = await AllModel.OrderItemsModel.findAll({
            where: {item_id: req.query.id},
            include: [
                {
                    model: AllModel.OrdersModel,
                    as: 'order'
                },
                {
                    model: AllModel.ProductsCatalogModel,
                    as: 'product'
                },
            ]
        })

        if(getData){
            res.json(getData);
        } else {
            res.status(404).json({error: `get order item with ID not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const orderItemsByOrder = async (req, res) => {
    // const name = req.query.name;
    try{
        const orderItemGroup = await AllModel.OrderItemsModel.findAll({
            where: {order_id: req.query.id},
            include: [
                {
                    model: AllModel.OrdersModel,
                    as: 'order'
                },
                {
                    model: AllModel.ProductsCatalogModel,
                    as: 'product'
                },
            ]
        });
        if(orderItemGroup){
            res.json(orderItemGroup);
        } else {
            res.status(404).json({error: `order item group by order id is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

export default {
    getAllOrderItem,
    insertOrderItems, 
    updateOrderItem,
    insertMultipleOrderItem, 
    deleteOrderItem,
    getOrderItemByID,
    orderItemsByOrder,
    deleteOrderItemByOrderID
};