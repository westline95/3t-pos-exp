import { Op, Sequelize, where } from "sequelize";
import AllModel from "../models/AllModel.js";
import sequelize from "../config/Database.js";

const createDeliveryGroupReport = async(req, res) => {
    const t = await sequelize.transaction();
    const { delivery_group_report, delivery_group_report_list } = req.body;

    try{
        const newDGR = await AllModel.DeliveryGroupReportModel.create(delivery_group_report, {transaction: t});

        delivery_group_report_list.map(e => {
            e.deliv_group_report_id = newDGR.deliv_group_report_id;
        })

        const newDGRItems = await AllModel.DeliveryGroupReportListModel.bulkCreate(delivery_group_report_list, {transaction: t});

        await t.commit();
        return res.status(201).json({delivery_group_report: newDGR, delivery_group_report_list: newDGRItems, message: "delivery group report created"});
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
}

const getAllDeliveryGroup = async(req, res) => {
    try{
        const allDG = await AllModel.DeliveryGroupsModel.findAll({
            include: [
                {
                    model: AllModel.EmployeesModel
                },
                {
                    model: AllModel.DeliveryGroupItemsModel,
                    include: [
                        {
                            model: AllModel.ProductsCatalogModel
                        }
                    ]
                },
                {
                    model: AllModel.DeliveryGroupReportModel,
                    include: [
                        {
                            model: AllModel.EmployeesModel
                        },
                        {
                            model: AllModel.DeliveryGroupReportListModel,
                            include: [
                                {
                                    model: AllModel.CustomersModel,
                                },
                                {
                                    model: AllModel.ProductsCatalogModel,
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        res.status(201).json(allDG);
    }
    catch(err){
        res.status(500).json({err: err});
    }
}

const getDeliveryGroupByID = async(req, res) => {
    try{
        const allDG = await AllModel.DeliveryGroupsModel.findByPk(req.query.id, {
            include: [
                {
                    model: AllModel.EmployeesModel
                },
                {
                    model: AllModel.DeliveryGroupItemsModel,
                    include: [
                        {
                            model: AllModel.ProductsCatalogModel
                        }
                    ]
                },
                {
                    model: AllModel.DeliveryGroupReportModel,
                    include: [
                        {
                            model: AllModel.EmployeesModel
                        },
                        {
                            model: AllModel.DeliveryGroupReportListModel,
                            include: [
                                {
                                    model: AllModel.CustomersModel,
                                },
                                {
                                    model: AllModel.ProductsCatalogModel,
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        res.status(201).json(allDG);
    }
    catch(err){
        res.status(500).json({err: err});
    }
}

const getDeliveryGroupActiveByEmployee = async(req, res) => {
    try{
        const allDG = await AllModel.DeliveryGroupsModel.findAll({
            where: {
                employee_id: req.query.emp_id,
                status: {
                    [Op.eq]: 1
                }
            },
            include: [
                {
                    model: AllModel.EmployeesModel
                },
                {
                    model: AllModel.DeliveryGroupItemsModel,
                    include: [
                        {
                            model: AllModel.ProductsCatalogModel
                        }
                    ]
                },
                {
                    model: AllModel.DeliveryGroupReportModel,
                    include: [
                        {
                            model: AllModel.EmployeesModel
                        },
                        {
                            model: AllModel.DeliveryGroupReportListModel,
                            include: [
                                {
                                    model: AllModel.CustomersModel,
                                },
                                {
                                    model: AllModel.ProductsCatalogModel,
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        res.status(201).json(allDG);
    }
    catch(err){
        res.status(500).json({err: err});
    }
}

const editDeliveryGroup = async(req, res) => {
    const t = await sequelize.transaction();
    const { delivery_group, delivery_group_items } = req.body;

    try{
        let dg, dGItems = null;
            
        dg = await AllModel.DeliveryGroupsModel.update(delivery_group, {
            where:{
                delivery_group_id: req.query.id
            },
            returning: true,
            transaction: t
        });

        if(delivery_group_items){
            await AllModel.DeliveryGroupItemsModel.destroy({
                where: {
                    delivery_group_id: req.query.id
                },
                transaction: t
            });

            dGItems = await AllModel.DeliveryGroupItemsModel.bulkCreate(delivery_group_items, {
                returning: true,
                transaction: t
            });
        }

        await t.commit();
        return res.status(201).json({ message: "update success", delivery_group: dg[1], delivery_group_items: dGItems});
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
}

const deleteDeliveryGroup = async(req, res) => {
    const t = await sequelize.transaction();
    const delivery_group_id = req.query.id;

    try{
        const checkPK = await AllModel.DeliveryGroupsModel.findByPk(delivery_group_id);

        if(!checkPK) return res.status(404).json({message: "delivery group is not found!"});

        await AllModel.DeliveryGroupsModel.destroy({
            where:{
                delivery_group_id: delivery_group_id
            },
            transaction: t
        });

        await AllModel.DeliveryGroupItemsModel.destroy({
            where:{
                delivery_group_id: delivery_group_id
            }, 
            transaction: t
        })

        await t.commit();
        return res.status(201).json({message: "delete success"});
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
}

const cancelDeliveryGroup = async(req, res) => {
    const t = await sequelize.transaction();
    const delivery_group_id = req.query.id;

    try{
        const checkPK = await AllModel.DeliveryGroupsModel.findByPk(delivery_group_id);

        if(!checkPK) return res.status(404).json({message: "delivery group is not found!"});

        checkPK.status = 2;
        await checkPK.save({transaction: t});

        await t.commit();
        return res.status(201).json({message: "cancel success"});
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
}


export default {
    createDeliveryGroupReport,
    getAllDeliveryGroup,
    getDeliveryGroupByID,
    getDeliveryGroupActiveByEmployee,
    editDeliveryGroup,
    deleteDeliveryGroup,
    cancelDeliveryGroup
}