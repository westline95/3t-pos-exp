import { where } from "sequelize";
import sequelize from "../config/Database.js";
import AllModel from "../models/AllModel.js";
import bcrypt from "bcrypt";


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

const insertEmployeeAcc = async(req, res) => {
    const t = await sequelize.transaction();    
    const { user, employee_id } = req.body;

    try{
        const checkEmployee = await AllModel.EmployeesModel.findByPk(employee_id);
        
        if(!checkEmployee) return res.status(404).json({msg: "Employee id is not found"});
        
        const checkEmployeeUserMail = await AllModel.UsersModel.findOne({
            where: {
                user_mail: user.user_mail
            }
        });
        
        if(checkEmployeeUserMail) return res.status(400).json({msg: "email aready exist!"});

        const hashedPass = await bcrypt.hash(user.user_pass, 10);
        const newUser = await AllModel.UsersModel.create({
            user_name: user.user_name,
            user_mail: user.user_mail,
            user_pass: hashedPass,
            role: user.role,
            employee_id: employee_id
        }, {
            returning: true,
            transaction: t
        });

        // update user_id => employee
        checkEmployee.user_id = newUser.id;
        await checkEmployee.save({transaction:t});
        
        await t.commit();
        res.status(201).json({message: 'user created'});
    } 
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const getAllEmployees = async(req, res) => {
    try{
       const employees = await AllModel.EmployeesModel.findAll({
            include: [
                {
                    model: AllModel.SalarySettingModel,
                    required: false
                }, 
                {
                    model: AllModel.UsersModel,
                }, 
                {
                    model: AllModel.SalaryAdjustmentsModel,
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

const getAllEmployeesByActive = async(req, res) => {
    const is_active = req.query.active;
    try{
       const employees = await AllModel.EmployeesModel.findAll({
            where: {
                is_active: is_active
            },
            include: [
                {
                    model: AllModel.SalarySettingModel,
                    required: false
                }, 
                {
                    model: AllModel.SalaryAdjustmentsModel,
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
                    model: AllModel.UsersModel,
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
    insertEmployeeAcc,
    getAllEmployees,
    getAllEmployeesByActive,
    getEmployee,
    updateEmployee,
    updateMinorEmployee,
    deleteEmployee
}