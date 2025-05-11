import Sequelize from "sequelize";
import sequelize from "../config/Database.js";

const SalesModel = sequelize.define("sales", 
    {
        id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        salesDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        custName: {
            type: Sequelize.STRING,
            allowNull: false,
        },        
        custID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        custType: {
            type: Sequelize.STRING,
        },
        salesData: {
            type: Sequelize.STRING,
        },
        statusId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        source: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        totalSales: {
            type: Sequelize.DECIMAL,
        },
        totalPayment: {
            type: Sequelize.DECIMAL,
        },
        remainingPayment: {
            type: Sequelize.DECIMAL,
        },
        paymentType: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        discount: {
            type: Sequelize.DECIMAL,
        },
        grandTotal: {
            type: Sequelize.DECIMAL,
        },
        note: {
            type: Sequelize.STRING,
        },
        totalQty: {
            type: Sequelize.DECIMAL,
        },
        paymentData: {
            type: Sequelize.STRING,
        },
        paid: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        orderTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        orderType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, 
    {
        tableName: 'sales',
    }
)

export default SalesModel;