import Sequelize from "sequelize";
import sequelize from "../config/Database.js";

const SubCategoryModel = sequelize.define("subCategory", 
    {
        id:{
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
        displayPrice: {
            type: Sequelize.STRING,
        }, 
        img: {
            type: Sequelize.STRING,
        },
    }, 
    {
        tableName: 'subCategory',
    }
)

export default SubCategoryModel;