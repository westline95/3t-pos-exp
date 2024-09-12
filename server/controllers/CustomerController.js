import CustomerModel from "../models/CustomerModel.js";
import { Sequelize } from "sequelize";

const getCustomers = async (req, res) => {
    try{
        const allCust = await CustomerModel.findAll();
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
    const { name, img, custType, email, phonenumber,
        debtLimit, totalSales, totalDebt, gender, dob,
        country, province, city, postalCode, address } = req.body;
    try{
        const newCust = await CustomerModel.create({
            name,
            custType,      
            phonenumber,
            address,
        });
        
        res.status(201).json(newCust);
    } 
    catch(err) {
        console.log(err)

        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleCustomer = async (req, res) => {
    try{
        const newCusts = await CustomerModel.bulkCreate(req.body);
        res.status(201).json(newCusts);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateCust= async (req, res) => {
    try{
        const cust = await CustomerModel.update(req.body, {where:{id: req.query.id}});
        
        res.status(201).json(cust);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteCust = async (req, res) => {
    try{
        const delCust = await CustomerModel.destroy({where:{id: req.query.id}});
        
        res.status(201).json(delCust);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const countCustByName = async (req, res) => {
    // const name = req.query.name;
    try{
        const countCust = await CustomerModel.findAll(
            
            {
                group: `name`,
                attributes: [
                  [Sequelize.literal(`name`), `name`],
                  [Sequelize.fn(`COUNT`, `name`), `count`]
                ]
            }
        );
        if(countProduct){
            res.json(countProduct);
        } else {
            res.status(404).json({error: `product with ? not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}



export default {
    getCustomers, 
    insertCustomers, 
    insertMultipleCustomer, 
    updateCust,  
    deleteCust,
    countCustByName
};