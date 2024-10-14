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
        },
        custName: {
            type: Sequelize.STRING,
        },
        salesRef: {
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.STRING,
        },
        paid: {
            type: Sequelize.STRING,
        },
        dueDate: {
            type: Sequelize.DATE,
        },
        amountDue: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        }
    }, 
    {
        tableName: 'invoice',
    }
)

export default InvoiceModel;