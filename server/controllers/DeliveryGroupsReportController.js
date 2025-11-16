import { Op, Sequelize, where } from "sequelize";
import AllModel from "../models/AllModel.js";
import sequelize from "../config/Database.js";

const createDeliveryGroupReport = async(req, res) => {
    const t = await sequelize.transaction();
    const { delivery_group_report, delivery_group_report_orders } = req.body;
    // checking duplicate report with same status
    try{
        const findDuplicateReport = await AllModel.DeliveryGroupReportModel.findOne({
            where: {
                delivery_group_id: delivery_group_report.delivery_group_id,
                report_status: delivery_group_report.report_status
            }
        });

        if(findDuplicateReport) return res.status(403).json({status: 403, message: "duplicate report"});

        // insert delivery group report
        const newDGR = await AllModel.DeliveryGroupReportModel.create(delivery_group_report, {transaction: t});
        
        // add deliv group report id to delivery group report orders
        delivery_group_report_orders.map(ro => ro.deliv_group_report_id = newDGR.deliv_group_report_id);

        const newDGROrder = await AllModel.DeliveryGroupReportOrderModel.bulkCreate(delivery_group_report_orders, {transaction:t});
        // add deliv group report order id to delivery group report lists
        if(!delivery_group_report_orders[0].delivery_group_report_lists) return res.status(404).json({status:404, message: "dg report list data isnot found"});
        if(!delivery_group_report_orders[0].payment) return res.status(404).json({status:404, message: "payment data is not found"});
        
        let onlyDGReportList = [];
        let onyDGReportOrderPayment = [];
        delivery_group_report_orders.map(ro => {
            delivery_group_report_lists.map(item => {
                item.dg_report_order_id = newDGROrder.dg_report_order_id;
                onlyDGReportList.push(item);
            })
            ro.payment.dg_report_order_id = newDGROrder.dg_report_order_id;
            onyDGReportOrderPayment.push(ro.payment);
        })
        
        if(onlyDGReportList.length == 0 || onyDGReportOrderPayment.length == 0) return res.status(505).json({status:505, message: "only dgreportlist or onyDGReportOrderPayment is not valid"});
        
        let newDGRItems = await AllModel.DeliveryGroupReportListModel.bulkCreate(onlyDGReportList, {
            returning:true,
            transaction: t
        });

        // insert payment
        const payment = await AllModel.DGReportOrderPaymentsModel.bulkCreate(onyDGReportOrderPayment, {transaction: t});

        await t.commit();
        res.status(201).json({status: 201, message: "Delivery group report created successfuly"});
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
                            model: AllModel.DeliveryGroupReportOrderModel,
                            include: [
                                {
                                    model: AllModel.DeliveryGroupReportListModel,
                                    include: [
                                        {
                                            model: AllModel.ProductsCatalogModel,
                                        }
                                    ]
                                }, 
                                {
                                    model: AllModel.DGReportOrderPaymentsModel,
                                    include: [
                                        {
                                            model: AllModel.CustomersModel,
                                        },
                                    ]
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
                            model: AllModel.DeliveryGroupReportOrderModel,
                            include: [
                                {
                                    model: AllModel.DeliveryGroupReportListModel,
                                    include: [
                                        {
                                            model: AllModel.ProductsCatalogModel,
                                        }
                                    ]
                                }, 
                                {
                                    model: AllModel.DGReportOrderPaymentsModel,
                                    include: [
                                        {
                                            model: AllModel.CustomersModel,
                                        },
                                    ]
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
                            model: AllModel.DeliveryGroupReportOrderModel,
                            include: [
                                {
                                    model: AllModel.DeliveryGroupReportListModel,
                                    include: [
                                        {
                                            model: AllModel.ProductsCatalogModel,
                                        }
                                    ]
                                }, 
                                {
                                    model: AllModel.DGReportOrderPaymentsModel,
                                    include: [
                                        {
                                            model: AllModel.CustomersModel,
                                        },
                                    ]
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