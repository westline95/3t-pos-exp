import Sequelize from "sequelize";
import sequelize from "../config/Database.js";

const CustomerModel = sequelize.define("customer", 
    {
        id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
        },
        img: {
            type: Sequelize.STRING,
        },
        custType: {
            type: Sequelize.STRING,
        },  
        custTypeId: {
            type: Sequelize.INTEGER,
        },        
        email: {
            type: Sequelize.STRING,
        },
        phonenumber: {
            type: Sequelize.STRING,
        },
        debtLimit: {
            type: Sequelize.STRING,
        },
        totalSales: {
            type: Sequelize.STRING,
        },
        totalDebt: {
            type: Sequelize.STRING,
        },
        gender: {
            type: Sequelize.STRING,
        },
        dob: {
            type: Sequelize.DATE,
        },
        country: {
            type: Sequelize.STRING,
        },
        province: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        postalCode: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.TEXT,
        },
    }, 
    {
        tableName: 'customer',
    }
)

export default CustomerModel;