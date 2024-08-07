import Sequelize from "sequelize";
import sequelize from "../config/Database.js";

const ProductsCatalogModel = sequelize.define("products", 
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
        subCategory: {
            type: Sequelize.STRING,
        },
        variant: {
            type: Sequelize.STRING,
        },        
        unit: {
            type: Sequelize.STRING,
        },
        prodCost: {
            type: Sequelize.STRING,
        },
        sellPrice: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
    }, 
    {
        tableName: 'products',
    }
)

export default ProductsCatalogModel;