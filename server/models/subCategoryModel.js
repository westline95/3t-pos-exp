import Sequelize from "sequelize";
import sequelize from "../config/Database.js";

const subCategory = sequelize.define("subCategory", {
    _id:{
        type:  Sequelize.INTEGER,
        primaryKey:  true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    },
})

export default subCategory;