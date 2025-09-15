import sequelize from "../config/Database.js";
import AllModel from "../models/AllModel.js";

const insertSalarySett = async(req, res) => {
    const t = await sequelize.transaction();
    const { salary } = req.body;

    try{
        // employee salary
        const checkEmployeeSalary = await AllModel.SalarySettingModel.findOne({
            where: {
                employee_id: salary.employee_id,
                now_active: true
            }
        })
        
        if(checkEmployeeSalary) return res.status(400).json({message: "There is still on going salary setting!"});

        const newSalarySett = await AllModel.SalarySettingModel.create(salary, {
            returning: true
        }, {transaction: t});

        await t.commit();
        res.status(201).json(newSalarySett);
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const getCurrentSalarySettByEmployee = async(req, res) => {
    const {employee_id} = req.params;

    try{
        const currSalarySett = await AllModel.SalarySettingModel.findOne({
            where: {
                employee_id: employee_id,
                now_active: true
            }
        });

        if(!currSalarySett) return res.status(404).json({message: "No salary has been set for this employee!"});

        res.status(201).json(currSalarySett);
    }
    catch(err) {
        res.status(500).json({err: err});
    }
};

const updateSalarySett = async(req, res) => {
    const t = await sequelize.transaction();
    const salary_sett_id = req.query.id;
    const { salary } = req.body;

    try{
        // check salary id
        const checkID = await AllModel.SalarySettingModel.findByPk(salary_sett_id);
        if(!checkID) return res.status(404).json({message: "Salary setting id is not found"});

        const updateSalarySett = await AllModel.SalarySettingModel.update(salary, {
            where: {
                salary_setting_id: salary_sett_id
            }, 
            returning: true
        }, {transaction: t});
        await t.commit();
        res.status(201).json(updateSalarySett);
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const updateMinorSalarySett = async(req, res) => {
    const t = await sequelize.transaction();;
    const salary_sett_id  = req.query.id;

    try{
        // check salary id
        const checkID = await AllModel.SalarySettingModel.findByPk(salary_sett_id);
        if(!checkID) return res.status(404).json({message: "Salary setting id is not found"});

        const updateSalarySett = await AllModel.SalarySettingModel.update(req.body, {
            where: {
                salary_setting_id: salary_sett_id
            }, 
            returning: true
        }, {transaction: t});
        await t.commit();
        res.status(201).json(updateSalarySett);
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const deleteSalarySetting = async(req, res) => {
    const t = await sequelize.transaction();
    const salary_sett_id = req.query.id;

    try{
        // check id
        const checkID = await AllModel.SalarySettingModel.findByPk(salary_sett_id);
        if(!checkID) return res.status(404).json({message: "salary setting id is not found"});

        await AllModel.SalarySettingModel.destroy({where:{
            salaty_setting_id: salary_sett_id
        }}, {transaction: t});
        await t.commit();
        res.status(201).json({message: "success"});
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
}


export default {
    insertSalarySett,
    getCurrentSalarySettByEmployee,
    updateSalarySett,
    updateMinorSalarySett,
    deleteSalarySetting
}