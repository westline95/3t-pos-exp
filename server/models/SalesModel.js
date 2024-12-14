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
        salesDue: {
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
        status: {
            type: Sequelize.STRING,
        },
        source: {
            type: Sequelize.STRING,
        },
        totalSales: {
            type: Sequelize.STRING,
        },
        totalPayment: {
            type: Sequelize.STRING,
        },
        remainingPayment: {
            type: Sequelize.STRING,
        },
        paymentMethod: {
            type: Sequelize.INTEGER,
        },
        grandTotal: {
            type: Sequelize.STRING,
        },
        note: {
            type: Sequelize.STRING,
        },
        totalQty: {
            type: Sequelize.STRING,
        },

    }, 
    {
        tableName: 'sales',
    }
)

export default SalesModel;