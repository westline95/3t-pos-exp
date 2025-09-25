import { where } from "sequelize";
import sequelize from "../config/Database.js";
import AllModel from "../models/AllModel.js";


const insertEmployee = async(req, res) => {
    const t = await sequelize.transaction();
    const { employee, department_history } = req.body;
    try {
        const employeeData = await AllModel.EmployeesModel.create(employee, {
            returning: true,
            transaction: t
        });

        department_history.employee_id = employeeData.employee_id;

        // insert to department history
        const dh = await AllModel.DepartmentHistoryModel.create(department_history,{transaction: t});

        await t.commit();
        res.status(201).json({employee: employeeData, department_history: dh});
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const getAllEmployees = async(req, res) => {
    try{
       const employees = await AllModel.EmployeesModel.findAll({
            where: {
                is_active: true
            },
            include: [
                {
                    model: AllModel.SalarySettingModel,
                    required: false
                }, 
                {
                    model: AllModel.SalaryAdjusmentsModel,
                    order: [["createdAt", "DESC"]],
                    limit: 3,
                    separate: true
                }, 
                {
                    model: AllModel.DepartmentHistoryModel,
                    where: {
                        now_active: true
                    },
                    required: false,
                    include: [{
                        model: AllModel.DepartmentModel,
                        required: false
                    }]
                },
            ]
       });
       res.status(201).json(employees);
    }
    catch(err) {
        res.status(500).json({err: err});
    }
};

const getEmployee = async(req, res) => {
    const { employee_id } = req.params;
    try{
        const employees = await AllModel.EmployeesModel.findAll({
            where: {
                employee_id: employee_id
            },
            include: [
                {
                    model: AllModel.SalarySettingModel,
                    required: false
                }, 
                {
                    model: AllModel.DepartmentHistoryModel,
                    where: {
                        now_active: true
                    },
                    required: false,
                    include: [{
                        model: AllModel.DepartmentModel,
                        required: false
                    }]
                },
            ]
        });
       res.status(201).json(employees);
    }
    catch(err) {
        res.status(500).json({err: err});
    }
};

const updateEmployee = async(req, res) => {
    const t = await sequelize.transaction();
    const employee_id = req.query.id;
    const { employee, department_history_id, department_history, exist } = req.body;

    try{
        // check employeeid
        const checkEmployee = await AllModel.EmployeesModel.findByPk(employee_id);

        if(!checkEmployee) return res.status(404).json({err: 'Employee ID is not found'});

        // update employee
        const employeeData = await AllModel.EmployeesModel.update(employee, {
            where: {
                employee_id: employee_id
            }, 
            returning: true,
            transaction: t
        });

        // check dh
        const checkDH = await AllModel.DepartmentHistoryModel.findByPk(department_history_id);
        if(!checkDH) return res.status(404).json({err: "Department history is not found"})

        let dh;
        if(exist){
            // just update
            dh = await AllModel.DepartmentHistoryModel.update(department_history, {
                where: {
                    department_history_id: department_history_id
                },
                returning: true,
                transaction: t
            })
        } else {
            // non active the old one and create new data
            checkDH.now_active = false;
            checkDH.save({transaction:t});
            dh = await AllModel.DepartmentHistoryModel.create(department_history,{
                returning: true, 
                transaction:t
            })
        }

        await t.commit();
        res.status(201).json({employee: employeeData, department_history: dh});
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const updateMinorEmployee = async(req, res) => {
    const t = await sequelize.transaction();
    const employee_id = req.query.id;
    const { employee } = req.body;

    try{
        // check employeeid
        const checkEmployee = await AllModel.EmployeesModel.findByPk(employee_id);

        if(!checkEmployee) return res.status(404).json({err: 'Employee ID is not found'});

        // update employee
        const employeeData = await AllModel.EmployeesModel.update(employee, {
            where: {
                employee_id: employee_id
            }, 
            returning: true,
            include: [
                {
                    model: AllModel.SalarySettingModel,
                    where: {
                        now_active: true
                    }
                }, 
                {
                    model: AllModel.DepartmentHistoryModel,
                    where: {
                        now_active: true
                    },
                    include: [{
                        model: AllModel.DepartmentModel,
                    }]
                },
            ],
            transaction: t
        });

        await t.commit();
        res.status(201).json(employeeData);
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const deleteEmployee = async(req, res) => {
    const t = await sequelize.transaction();
    const  employee_id  = req.query.id;

    try{
        const checkEmployee = await AllModel.EmployeesModel.findByPk(employee_id);

        if(!checkEmployee) return res.status(404).json({err: "Employee id is not found"});

        const deletedEmployee = await AllModel.EmployeesModel.destroy({
            where: {
                employee_id: employee_id
            },
            transaction: t
        });

        await t.commit();
        res.status(201).json(deletedEmployee);
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
}

export default {
    insertEmployee,
    getAllEmployees,
    getEmployee,
    updateEmployee,
    updateMinorEmployee,
    deleteEmployee
}