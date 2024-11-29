import { Sequelize } from "sequelize";
import sequelize from "../config/Database.js";

const StatusModel = sequelize.define("status", 
    {
        id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
        },
    },
    {
        tableName: "status"
    }

)

export default StatusModel;