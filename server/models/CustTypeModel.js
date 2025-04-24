import { Sequelize } from "sequelize";
import sequelize from "../config/Database.js";

const CustTypeModel = sequelize.define("custType", 
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type:{
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.BOOLEAN
        }
    },
    {
        tableName: "custType"
    }
)

export default CustTypeModel;