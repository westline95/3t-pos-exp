import Sequelize from "sequelize";
import sequelize from "../config/Database.js";
import InvoiceModel from "./InvoiceModel.js";

const InstallmentPaymentModel = sequelize.define("installmentPayment", 
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
        dueDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        paymentData: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        amount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        },
        amountDue: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        isPaid: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    }, 
    {
        tableName: 'installment_payment',
    }
)

export default InstallmentPaymentModel;