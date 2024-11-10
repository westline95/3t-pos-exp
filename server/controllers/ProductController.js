import ProductsCatalogModel from "../models/ProductsCatalogModel.js";
import { Sequelize } from "sequelize";
const getProducts = async (req, res) => {
    try{
        const allProduct = await ProductsCatalogModel.findAll();
        if(allProduct){
            res.json(allProduct);
        } else {
            res.status(404).json({error: `get all product not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getProductsByCategory = async (req, res) => {
    try{
        const allProduct = await ProductsCatalogModel.findAll({where:{category: req.query.category}});
        if(allProduct){
            res.json(allProduct);
        } else {
            res.status(404).json({error: `get product by category not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}


const insertProducts = async (req, res) => {
    const { name, category, variant, unit, prodCost, sellPrice, status } = req.body;
    try{
        const newProduct = await ProductsCatalogModel.create({
            name,
            category,
            variant,      
            unit,
            prodCost,
            sellPrice,
            status
        });
        
        res.status(201).json(newProduct);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleProducts = async (req, res) => {
    try{
        const newProducts = await ProductsCatalogModel.bulkCreate(req.body);
        res.status(201).json(newProducts);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateProduct = async (req, res) => {
    try{
        const product = await ProductsCatalogModel.update(req.body, {where:{id: req.query.id}});
        
        res.status(201).json(product);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getProductID = async (req, res) => {
    try{
        const product = await ProductsCatalogModel.findAll(req.body, {where:{id: req.query.id}});
        
        res.status(201).json(product);
        // res.status(404).json("product with that id not found!");
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteProduct = async (req, res) => {
    try{
        const delProduct = await ProductsCatalogModel.destroy({where:{id: req.query.id}});
        
        res.status(201).json(delProduct);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const countProductByName = async (req, res) => {
    // const name = req.query.name;
    try{
        const countProduct = await ProductsCatalogModel.findAll(
            
            {
                group: `category`,
                attributes: [
                  [Sequelize.literal(`category`), `category`],
                  [Sequelize.fn(`COUNT`, `name`), `count`]
                ]
            }
        );
        if(countProduct){
            res.json(countProduct);
        } else {
            res.status(404).json({error: `product with ? not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}



export default {
    getProducts, 
    insertProducts, 
    insertMultipleProducts, 
    updateProduct,  
    deleteProduct,
    countProductByName,
    getProductsByCategory,
    getProductID
};