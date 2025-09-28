import { where } from "sequelize";
import sequelize from "../config/Database.js";
import AllModel from "../models/AllModel.js";

// Department Table
const insertDepartment = async(req, res) => {
    const t = await sequelize.transaction();
    const { department } = req.body;

    try{
        const newDepartment = await AllModel.DepartmentModel.create(department,{transaction:t});

        await t.commit();
        res.status(201).json(newDepartment);
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const getAllDepartment = async(req, res) => {
    try{
        const allDepartment = await AllModel.DepartmentModel.findAll();

        res.status(201).json(allDepartment);
    }
    catch(err) {
        res.status(500).json({err: err});
    }
};

const updateDepartment = async(req, res) => {
    const t = await sequelize.transaction();
    const department_id = req.query.id;
    const { department } = req.body;

    try{
        const checkID = await AllModel.DepartmentModel.findByPk(department_id);

        if(!checkID) return res.status(404).json({message: "Department id is not found"});

        const updatedDepartment = await AllModel.DepartmentModel.update(department, {
            where: {
                department_id: department_id
            },
            returning: true,
            transaction: t
        });

        await t.commit();
        res.status(201).json(updatedDepartment)
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const updateMinorDepartment = async(req, res) => {
    const t = await sequelize.transaction();
    const department_id = req.query.id;

    try{
        const checkID = await AllModel.DepartmentModel.findByPk(department_id);

        if(!checkID) return res.status(404).json({message: "Department id is not found"});

        const updatedDepartment = await AllModel.DepartmentModel.update(req.body, {
            where: {
                department_id: department_id
            },
            returning: true,
            transaction: t
        });

        await t.commit();
        res.status(201).json(updatedDepartment)
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const deleteDepartment = async(req, res) => {
    const t = await sequelize.transaction();
    const { department_id } = req.params;

    try{
        const checkID = await AllModel.DepartmentModel.findByPk(department_id);

        if(!checkID) return res.status(404).json({message: "Department id is not found"});

        const deletedDepartment = await AllModel.DepartmentModel.destroy({where: {
            department_id: department_id,
            transaction: t
        }});

        await t.commit();
        res.status(201).json(deletedDepartment);
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

// Department History
const insertDepartmentHistory = async(req, res) => {
    const t = await sequelize.transaction();
    const employee_id = req.query.id;
    const { department_history } = req.body;

    try{
        // check first employee id
        const checkID = await AllModel.DepartmentHistoryModel.findByPk(employee_id, {
            where: {
                now_active: true
            }
        });
        if(checkID) return res.status(404).json({message: "There is still active department"});

        const newDH = await AllModel.DepartmentHistoryModel.create(department_history,
            {
                returning:true,
                transaction: t
            }
        );

        await t.commit();
        res.status(201).json(newDH);
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const getAllDepartmentHistory = async(req, res) => {
    try{
        const allDH = await AllModel.DepartmentHistoryModel.findAll();

        res.status(201).json(allDH);
    }
    catch(err) {
        res.status(500).json({err: err});
    }
};

const getDHByEmployee = async(req, res) => {
    const {employeeID} = req.params;
    try{
        const allDH = await AllModel.DepartmentHistoryModel.findAll({
            where: {
                employee_id: employeeID
            }
        });

        res.status(201).json(allDH);
    }
    catch(err) {
        res.status(500).json({err: err});
    }
};

const updateDepartmentHistory = async(req, res) => {
    const t = await sequelize.transaction();
    const department_history_id  = req.query.id;
    const { department_history } = req.body;

    try{
        const checkID = await AllModel.DepartmentHistoryModel.findByPk(department_history_id);

        if(!checkID) return res.status(404).json({message: "Department history id is not found"});

        const updatedDH = await AllModel.DepartmentHistoryModel.update(department_history, {
            where: {
                department_history_id: department_history_id
            },
            returning: true,
            transaction: t
        });

        await t.commit();
        res.status(201).json(updatedDH)
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const updateMinorDH = async(req, res) => {
    const t = await sequelize.transaction();
    const department_history_id  = req.query.id;

    try{
        const checkID = await AllModel.DepartmentHistoryModel.findByPk(department_history_id);

        if(!checkID) return res.status(404).json({message: "Department history id is not found"});

        if(checkID.now_active){
            checkID.now_active = false;
            await checkID.save({transaction:t});
        }
        
        let insertNewOneDH = await AllModel.DepartmentHistoryModel.create(req.body, {
            returning: true,
            transaction: t
        });

        await t.commit();
        res.status(201).json(insertNewOneDH)
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const deleteDepartmentHistory = async(req, res) => {
    const t = await sequelize.transaction();
    const { department_history_id } = req.params;

    try{
        const checkID = await AllModel.DepartmentModel.findByPk(department_history_id);

        if(!checkID) return res.status(404).json({message: "Department history id is not found"});

        const deletedDH = await AllModel.DepartmentHistoryModel.destroy({where: {
            department_history_id: department_history_id,
            transaction: t
        }});

        await t.commit();
        res.status(201).json(deletedDH);
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};



export default{
    insertDepartment,
    getAllDepartment,
    updateDepartment,
    updateMinorDepartment,
    deleteDepartment,
    insertDepartmentHistory,
    getAllDepartmentHistory,
    getDHByEmployee,
    updateDepartmentHistory,
    updateMinorDH,
    deleteDepartmentHistory
}