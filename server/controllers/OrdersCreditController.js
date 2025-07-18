import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

const getOrderCreditByCust = async (req, res) => {
    try{
        const allCreditByCust = await AllModel.OrdersCreditModel.findAll({
            where: {customer_id: req.query.custid},
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

const insertROItems = async (req, res) => {
    // const { 
    //     salesDate, custID, custName, custType, salesData, status, statusId, source, 
    //     discount, grandTotal, note, totalPayment, remainingPayment, totalSales, 
    //     paymentMethod, totalQty, paymentData, paid, orderType, orderTypeId
    // } = req.body;
    try{
        const newROItem = await AllModel.ROItemsModel.bulkCreate(req.body);
        
        if(newROItem){
            res.status(201).json(newROItem);
        } else {
            res.status(404).json({error: `failed to insert return order item!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateROItem= async (req, res) => {
    try{
        const ROItem = await AllModel.ROItemsModel.update(req.body, 
            {
                where:{ro_item_id: req.query.id},
                returning: true,
                include: [
                    {
                        model: AllModel.ROModel,
                        as: 'return_order'
                    },
                    {
                        model: AllModel.ProductsCatalogModel,
                        as: 'product'
                    },
                ],
            });
        
        if(ROItem){
            res.status(201).json(ROItem);
        } else {
            res.status(404).json({error: `failed to update order item!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteROItem = async (req, res) => {
    try{
        const delRO = await AllModel.ROItemsModel.destroy({where:{ro_item_id: req.query.id}});
        
        if(delRO){
            res.status(201).json(delRO);
        } else {
            res.status(404).json({error: `failed to delete order item!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const deleteROItemByRO = async (req, res) => {
    try{
        const delROI = await AllModel.ROItemsModel.destroy({
            where:{
                return_order_id: req.query.ro_id
            }
        });

        if(delROI){
            res.status(201).json(delROI);
        } else {
            res.status(404).json({error: `failed to delete order item by ro id!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const getROItemByID = async(req, res) => {
    try{
        const getRO = await AllModel.ROItemsModel.findAll({
            where: {return_order_id: req.query.id},
            include: [
                {
                    model: AllModel.ROModel,
                    as: 'return_order',
                     include: [
                        {
                            model: AllModel.CustomersModel,
                            as: 'customer'
                        }
                    ]
                },
            ]
        })

        if(getRO){
            res.json(getRO);
        } else {
            res.status(404).json({error: `get return order item by return order ID is not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

export default {
    getOrderCreditByCust,
    // getROItemByID, 
    // deleteROItem,
    // updateROItem, 
    // insertROItems,
    // deleteROItemByRO
};