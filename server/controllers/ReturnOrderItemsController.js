import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

const getAllROItem = async (req, res) => {
    try{
        const allROItems = await AllModel.ROItemsModel.findAll({
            include: [
                {
                    model: AllModel.ROModel,
                    as: 'return_order',
                    include: [
                        {
                            model: AllModel.CustomersModel,
                            as: 'customer'
                        },
                        {
                            model: AllModel.ROModel,
                            as: 'return_order',
                        }
                    ]
                },
            ]
        });
        if(allROItems){
            res.json(allROItems);
        } else {
            res.status(404).json({error: `get all return order items is not found!`});
        }
    } 
    catch(error) {
        res.status(500).json({err: error.message});
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
    catch(error) {
        res.status(500).json({err: error.message});
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
    catch(error) {
        res.status(500).json({err: error.message});
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
    catch(error) {
        res.status(500).json({err: error.message});
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
    catch(error) {
        res.status(500).json({err: error.message});
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
    catch(error) {
        res.status(500).json({err: error.message});
    }
};

export default {
    getAllROItem,
    getROItemByID, 
    deleteROItem,
    updateROItem, 
    insertROItems,
    deleteROItemByRO
};