import CategoryModel from "../models/CategoryModel.js";

const getCategories = async (req, res) => {
    try{
        const allCategory = await CategoryModel.findAll();
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
        const newCategory = await CategoryModel.create({
            name,
            img,
            status
        });
        
        res.status(201).json(newCategory);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertMultipleCategory = async (req, res) => {
    try{
        const newCategories = await CategoryModel.bulkCreate(req.body);
        res.status(201).json(newCategories);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateCategory = async (req, res) => {
    try{
        const category = await CategoryModel.update(req.body, {where:{id: req.query.id}});
        
        res.status(201).json(category);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteCategory = async (req, res) => {
    try{
        await CategoryModel.destroy({where:{id: req.query.id}});
        
        res.status(201).json({message: "delete category success"});
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