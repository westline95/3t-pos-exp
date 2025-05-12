import Sequelize from "sequelize";
import sequelize from "../config/Database.js";

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

export default ReceiptModel;

