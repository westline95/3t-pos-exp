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
        },
        custName: {
            type: Sequelize.STRING,
        },        
        custID: {
            type: Sequelize.INTEGER,
        },
        custType: {
            type: Sequelize.STRING,
        },
        salesData: {
            type: Sequelize.STRING,
        },
        statusId: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.STRING,
        },
        source: {
            type: Sequelize.STRING,
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
        paymentMethod: {
            type: Sequelize.INTEGER,
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
        },
        orderType: {
            type: Sequelize.INTEGER,
        },
    }, 
    {
        tableName: 'sales',
    }
)

export default SalesModel;