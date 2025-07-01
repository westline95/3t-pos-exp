import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

const getProducts = async (req, res) => {
    try{
        const allProduct = await AllModel.ProductsCatalogModel.findAll({
            include: [
                {
                    model: AllModel.CategoriesModel,
                    as: 'category'
                },
            ]
        });
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
        const allProduct = await AllModel.ProductsCatalogModel.findAll({
            where:{category_id: req.query.categoryid},
            include: [
                {
                    model: AllModel.CategoriesModel,
                    as: 'category'
                },
            ]
        });
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
    try {
        const newProduct = await AllModel.ProductsCatalogModel.create(req.body);
        
        if(newProduct){
            res.status(201).json(newProduct);
        } else {
            res.status(404).json({error: `failed to insert product!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleProducts = async (req, res) => {
    try{
        const newProducts = await AllModel.ProductsCatalogModel.bulkCreate(req.body,{
            include: [
                {
                    model: AllModel.CategoriesModel,
                    as: 'category'
                },
            ]
        });
        
        if(newProducts){
            res.status(201).json(newProducts);
        } else {
            res.status(404).json({error: `failed to insert multiple product!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateProduct = async (req, res) => {
    try{
        const product = await AllModel.ProductsCatalogModel.update(req.body, 
            {
                where:{product_id: req.query.id},
                returning: true,
                include: [
                    {
                        model: AllModel.CategoriesModel,
                        as: 'category'
                    },
                ]
            });
        
        if(product){
            res.status(201).json(product);
        } else {
            res.status(404).json({error: `failed to update product!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getProductID = async (req, res) => {
    try{
        const product = await AllModel.ProductsCatalogModel.findAll({
            where:{product_id: req.query.id},
            include: [
                {
                    model: AllModel.CategoriesModel,
                    as: 'category'
                },
            ]
        });
        
        if(product){
            res.status(201).json(product);
        } else {
            res.status(404).json({error: `failed to get product by id!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteProduct = async (req, res) => {
    try{
        const delProduct = await AllModel.ProductsCatalogModel.destroy({where:{product_id: req.query.id}});
        
        if(delProduct){
            res.status(201).json(delProduct);
        } else {
            res.status(404).json({error: `failed to delete product!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const countProductByName = async (req, res) => {
    // const name = req.query.name;
    try{
        const countProduct = await AllModel.ProductsCatalogModel.findAll(
            
            {
                group: `category_id`,
                attributes: [
                  [Sequelize.literal(`category_id`), `category_id`],
                  [Sequelize.fn(`COUNT`, `product_name`), `count`],
                ],
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