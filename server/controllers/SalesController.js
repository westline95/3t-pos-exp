import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

const getAllSales = async (req, res) => {
    try{
        const allSales = await AllModel.OrdersModel.findAll({
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
            ]
        });
        if(allSales){
            res.json(allSales);
        } else {
            res.status(404).json({error: `get all sales not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertSales = async (req, res) => {
    const { 
        salesDate, custID, custName, custType, salesData, status, statusId, source, 
        discount, grandTotal, note, totalPayment, remainingPayment, totalSales, 
        paymentMethod, totalQty, paymentData, paid, orderType, orderTypeId
    } = req.body;
    try{
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

const updateSales= async (req, res) => {
    try{
        const sales = await AllModel.OrdersModel.update(req.body, {
            where:{order_id: req.query.id},
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
            ]
        });
        
        res.status(201).json(sales);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

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

const salesByCustPayType = async (req, res) => {
    // const name = req.query.name;
    try{
        const countSales = await AllModel.OrdersModel.findAll({
                 where: {
                    payment_type: req.query.type,
                    customer_id: req.query.custid,
                },
            }
        );
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

const getSalesCust = async(req, res) => {
    try{
        const getData = await AllModel.OrdersModel.findAll({
            where: {customer_id: req.query.id},
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
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

const getSalesByStatus = async(req, res) => {
    try{
        const getData = await AllModel.OrdersModel.findAll({
            where: {is_complete: req.query.iscomplete},
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
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
                    as: 'customer'
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
    salesByCustPayType
};