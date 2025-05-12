import Sequelize from "sequelize";
import sequelize from "../config/Database.js";
import InvoiceModel from "./InvoiceModel.js";

const PaymentModel = sequelize.define("payment", 
    {
        id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        invoiceID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        custID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        custName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        paymentDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        amountPaid: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        change: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        },
        paymentMethod: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        note: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    }, 
    {
        tableName: 'payment',
    }
);



export default PaymentModel;