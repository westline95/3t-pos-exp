import sequelize from "../config/Database.js";
import AllModel from "../models/AllModel.js";


const insertEmployee = async(req, res) => {
    const t = await sequelize.transaction();
    const { employee } = req.body;
    try {
        const employeeData = await AllModel.EmployeesModel.create(employee, {
            returning: true,
        },{transaction: t});

        await t.commit();
        res.status(201).json(employeeData);
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const getAllEmployees = async(req, res) => {
    try{
       const employees = await AllModel.EmployeesModel.findAll();
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
            }
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
    const { employee } = req.body;

    try{
        // check employeeid
        const checkEmployee = await AllModel.EmployeesModel.findByPk(employee_id);

        if(!checkEmployee) return res.status(404).json({err: 'Employee ID is not found'});

        // update employee
        const employeeData = await AllModel.EmployeesModel.update(employee, {
            where: {
                employee_id: employee_id
            }, returning: true
        }, {transaction: t});

        await t.commit();
        res.status(201).json(employeeData);
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
            }, returning: true
        }, {transaction: t});

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

        await AllModel.EmployeesModel.destroy({
            where: {
                employee_id: employee_id
            }
        }, {transaction: t});

        await t.commit();
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