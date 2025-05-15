import AllModel from "../models/AllModel.js";

const getSubCategory = async (req, res) => {
    try{
        const allSubCategory = await AllModel.SubCategoryModel.findAll();
        if(allSubCategory){
            res.json(allSubCategory);
        } else {
            res.status(404).json({error: `get all sub category not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const getSubCategorybyCategory = async (req, res) => {
    try{
        const allSubCategory = await AllModel.SubCategoryModel.findAll({where:{category: req.query.category}});
        if(allSubCategory){
            res.json(allSubCategory);
        } else {
            res.status(404).json({error: `get all sub category by category not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}


const insertSubCategory = async (req, res) => {
    const { name, category, displayPrice, img, status } = req.body;
    try{
        const newSubCategory = await AllModel.SubCategoryModel.create(req.body);
        
        if(newSubCategory){
            res.status(201).json(newSubCategory);
        } else {
            res.status(404).json({error: `failed to insert sub category!`});
        }
        
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleSubCategory = async (req, res) => {
    try{
        const newSubCategories = await AllModel.SubCategoryModel.bulkCreate(req.body);
        if(newSubCategories){
            res.status(201).json(newSubCategories);
        } else {
            res.status(404).json({error: `failed to insert multiple sub category!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateSubCategory = async (req, res) => {
    try{
        const subCategory = await AllModel.SubCategoryModel.update(req.body, {where:{id: req.query.id}});
        
        if(subCategory){
            res.status(201).json(subCategory);
        } else {
            res.status(404).json({error: `failed to update sub category!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteSubCategory = async (req, res) => {
    try{
        const delSubCategory = await AllModel.SubCategoryModel.destroy({where:{id: req.query.id}});
        
        if(delSubCategory){
            res.status(201).json(delSubCategory);
        } else {
            res.status(404).json({error: `failed to delete sub category!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}



export default {
    getSubCategory, 
    getSubCategorybyCategory,
    insertSubCategory, 
    insertMultipleSubCategory, 
    updateSubCategory,  
    deleteSubCategory
};
