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
        salesData: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
        source: {
            type: Sequelize.STRING,
        },
    }, 
    {
        tableName: 'customer',
    }
)

export default SalesModel;