import Sequelize from "sequelize";
import sequelize from "../config/Database.js";
import PaymentModel from "./PaymentModel.js";
import InvoiceModel from "./InvoiceModel.js";

const ReceiptModel = sequelize.define("receipt", 
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
        paymentID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        url: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    }, 
    {
        tableName: 'receipt',
    }
);

ReceiptModel.belongsTo(InvoiceModel, {
    foreignKey: {
        name: 'invoiceID'
    }
});

export default ReceiptModel;

