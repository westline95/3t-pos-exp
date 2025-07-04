import AllModel from "../models/AllModel.js";

const getCategories = async (req, res) => {
    try{
        const allCategory = await AllModel.CategoriesModel.findAll();
        if(allCategory){
            res.json(allCategory);
        } else {
            res.status(404).json({error: `get all category not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}


const insertCategory = async (req, res) => {
    const { name, img, status } = req.body;
    try{
        const newCategory = await AllModel.CategoriesModel.create(req.body);
        
        if(newCategory){
            res.status(201).json(newCategory);
        } else {
            res.status(404).json({error: `failed to insert category`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleCategory = async (req, res) => {
    try{
        const newCategories = await AllModel.CategoriesModel.bulkCreate(req.body);
        
        if(newCategories){
            res.status(201).json(newCategories);
        } else {
            res.status(404).json({error: `failed to multiple insert category!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateCategory = async (req, res) => {
    try{
        const category = await AllModel.CategoriesModel.update(req.body, {
            where:{category_id: req.query.id},
            returning: true,
        });
        
        if(category){
            res.status(201).json(category);
        } else {
            res.status(404).json({error: `failed to update category`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteCategory = async (req, res) => {
    try{
        const category = await AllModel.CategoriesModel.destroy({
            where:{category_id: req.query.id}
        });
        
        if(category){
             res.status(201).json(category);
        } else {
            res.status(404).json({error: `failed to delete category`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}



export default {
    getCategories, 
    insertCategory, 
    insertMultipleCategory, 
    updateCategory,  
    deleteCategory
};