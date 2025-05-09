import Sequelize from "sequelize";
import sequelize from "../config/Database.js";

const InvoiceModel = sequelize.define("invoice", 
    {
        id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
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
        salesRef: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        subtotal: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        discount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        },
        grandTotal: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        amountDue: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        invDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        statusId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        url: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    }, 
    {
        tableName: 'invoice',
    }
)

export default InvoiceModel;