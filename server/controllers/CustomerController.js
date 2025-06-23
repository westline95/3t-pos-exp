import AllModel from "../models/AllModel.js";
import { Sequelize, where } from "sequelize";

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
        const getData = await AllModel.CustomersModel.findAll({
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



export default {
    getCustomers, 
    getCustomerByID,
    insertCustomers, 
    insertMultipleCustomer, 
    updateCust,  
    deleteCust,
    countCustByName,
    getDebtData,
    getCustomersUnpaidInv
};