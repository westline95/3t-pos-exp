import SubCategoryModel from "../models/SubCategoryModel.js";

const getSubCategory = async (req, res) => {
    try{
        const allSubCategory = await SubCategoryModel.findAll();
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
        const allSubCategory = await SubCategoryModel.findAll({where:{category: req.query.category}});
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
        const newSubCategory = await SubCategoryModel.create({
            name,
            category,
            displayPrice,
            img,
            status
        });
        
        res.status(201).json(newSubCategory);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleSubCategory = async (req, res) => {
    try{
        const newSubCategories = await SubCategoryModel.bulkCreate(req.body);
        res.status(201).json(newSubCategories);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateSubCategory = async (req, res) => {
    try{
        const subCategory = await SubCategoryModel.update(req.body, {where:{id: req.query.id}});
        
        res.status(201).json(subCategory);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteSubCategory = async (req, res) => {
    try{
        const delSubCategory = await SubCategoryModel.destroy({where:{id: req.query.id}});
        
        res.status(201).json(delSubCategory);
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
