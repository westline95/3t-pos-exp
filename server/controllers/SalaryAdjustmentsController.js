import { Op } from "sequelize";
import sequelize from "../config/Database.js";
import AllModel from "../models/AllModel.js";

const insertSalaryAdj = async(req, res) => {
    const t = await sequelize.transaction();
    const { employee_id, salary_sett, salary_adj } = req.body;

    try{
        // logging employee salary
        const checkEmployeeSalary = await AllModel.SalarySettingModel.findOne({
            where: {
                employee_id: employee_id,
            }
        })
        
        if(!checkEmployeeSalary) return res.status(400).json({message: "There is no base salary found!"});

        const loggingSalaryAdj = await AllModel.SalaryAdjustmentsModel.create(salary_adj, {
            returning: true,
            transaction: t
        });

        const updateNewSalary = await AllModel.SalarySettingModel.update(salary_sett, {
            where: {
                employee_id: employee_id
            },
            returning: true,
            transaction: t
        })

        await t.commit();
        res.status(201).json({old_salary: checkEmployeeSalary, new_salary: updateNewSalary});
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({err: err});
    }
};

const getSalaryByPeriod = async(req, res) => {
    const { employee_id, start_date, end_date } = req.body;

    try{
        const currSalarySett = await AllModel.SalaryAdjustmentsModel.findAll({
            where: {
                employee_id: employee_id,
                effective_date: {
                    [Op.between]: [start_date, end_date]
                }
            }
        });

        let currSalary;
        if(!currSalarySett) {
            const getSalarySett = await AllModel.SalarySettingModel.findOne({
                where: {
                    employee_id: employee_id,
                }
            });

            if(!currSalarySett) return res.status(404).json({message: "No salary has been found based by given date"});
            currSalary = getSalarySett;
        }
        currSalary = currSalarySett;

        res.status(201).json(currSalary);
    }
    catch(err) {
        res.status(500).json({err: err});
    }
};

// const updateSalaryAdj = async(req, res) => {
//     const t = await sequelize.transaction();
//     const salary_adj_id = req.query.id;
//     const { salary_adj } = req.body;

//     try{
//         // check salary id
//         const checkID = await AllModel.SalarySettingModel.findByPk(salary_sett_id);
//         if(!checkID) return res.status(404).json({message: "Salary setting id is not found"});

//         const updateSalarySett = await AllModel.SalarySettingModel.update(salary, {
//             where: {
//                 salary_setting_id: salary_sett_id
//             }, 
//             returning: true,
//             transaction: t
//         });
//         await t.commit();
//         res.status(201).json(updateSalarySett);
//     }
//     catch(err) {
//         await t.rollback();
//         res.status(500).json({err: err});
//     }
// };

// const updateMinorSalarySett = async(req, res) => {
//     const t = await sequelize.transaction();;
//     const salary_sett_id  = req.query.id;

//     try{
//         // check salary id
//         const checkID = await AllModel.SalarySettingModel.findByPk(salary_sett_id);
//         if(!checkID) return res.status(404).json({message: "Salary setting id is not found"});

//         const updateSalarySett = await AllModel.SalarySettingModel.update(req.body, {
//             where: {
//                 salary_setting_id: salary_sett_id
//             }, 
//             returning: true,
//             transaction: t
//         });
//         await t.commit();
//         res.status(201).json(updateSalarySett);
//     }
//     catch(err) {
//         await t.rollback();
//         res.status(500).json({err: err});
//     }
// };

// const deleteSalarySetting = async(req, res) => {
//     const t = await sequelize.transaction();
//     const salary_sett_id = req.query.id;

//     try{
//         // check id
//         const checkID = await AllModel.SalarySettingModel.findByPk(salary_sett_id);
//         if(!checkID) return res.status(404).json({message: "salary setting id is not found"});

//         await AllModel.SalarySettingModel.destroy({
//             where:{
//                 salaty_setting_id: salary_sett_id,
//                 transaction: t
//             }
//         });
//         await t.commit();
//         res.status(201).json({message: "success"});
//     }
//     catch(err) {
//         await t.rollback();
//         res.status(500).json({err: err});
//     }
// }


export default {
    insertSalaryAdj,
    getSalaryByPeriod,
    // updateSalarySett,
    // updateMinorSalarySett,
    // deleteSalarySetting
}