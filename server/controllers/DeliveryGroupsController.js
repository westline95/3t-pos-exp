import { Op, Sequelize, where } from "sequelize";
import AllModel from "../models/AllModel.js";
import sequelize from "../config/Database.js";

const setDeliveryGroup = async(req, res) => {
    const t = await sequelize.transaction();
    const { delivery_group, delivery_group_items } = req.body;

    try{
        const newDG = await AllModel.DeliveryGroupsModel.create(delivery_group, {transaction: t});

        delivery_group_items.map(e => {
            e.delivery_group_id = newDG.delivery_group_id;
            e.session = 1;
        })

        const newDGItems = await AllModel.DeliveryGroupItemsModel.bulkCreate(delivery_group_items, {transaction: t});

        await t.commit();
        return res.status(201).json({delivery_group: newDG, delivery_group_items: newDGItems, message: "delivery group created"});
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
}

const getAllDeliveryGroup = async(req, res) => {
    try{
        const allDG = await AllModel.DeliveryGroupsModel.findAll({
            order: [["delivery_group_date", "DESC"]],
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

        const formatted = allDG.map((group) => {
            const items = group.delivery_group_items || [];

            // Group items by session
            const groupedItems = Object.values(
                items.reduce((acc, item) => {
                    const session = item.session || null;
                    const qty = Number(item.quantity);
                    const value = (Number(item.quantity)*Number(item.sell_price))-(Number(item.quantity)*Number(item.disc_prod_rec));
                    if (!acc[session]) acc[session] = { session, items: [], total_item: 0, total_value: 0};
                    acc[session].items.push(item);
                    acc[session].total_item += qty;
                    acc[session].total_value += value;
                    return acc;
                }, {})
            );

            // Sort berdasarkan session (ascending)
            groupedItems.sort((a, b) => {
                // Pastikan session valid, Unknown di akhir
                if (a.session === null) return 1;
                if (b.session === null) return -1;
                return a.session - b.session;
            });

            return {
                ...group.toJSON(),
                DeliveryGroupItemsGrouped: groupedItems,
            };
        });

        res.status(201).json(formatted);
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

        const items = allDG.delivery_group_items || [];

        // Group items by log time
        const groupedItems = Object.values(
            items.reduce((acc, item) => {
                const session = item.session || null;
                const qty = Number(item.quantity);
                const value = (Number(item.quantity)*Number(item.sell_price))-(Number(item.quantity)*Number(item.disc_prod_rec));
                if (!acc[session]) acc[session] = { session, items: [], total_item: 0, total_value: 0};
                acc[session].items.push(item);
                acc[session].total_item += qty;
                acc[session].total_value += value;
                return acc;
            }, {})
        );

        // Sort berdasarkan logTime (ascending)
        groupedItems.sort((a, b) => {
            // Pastikan logTime valid date, Unknown di akhir
            if (a.session === null) return 1;
            if (b.session === null) return -1;
            return a.session - b.session;
        });
            
        const formatted = {
            ...allDG.toJSON(),
            DeliveryGroupItemsGrouped: groupedItems,
        }

        res.status(201).json(formatted);
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
            order: [["delivery_group_date", "ASC"]],
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
    const { delivery_group } = req.body;
    const delivery_group_id = req.query.id;

    try{
        let dg, dGItems = null;
        dg = await AllModel.DeliveryGroupsModel.findByPk(delivery_group_id);

        if(!dg) return res.status(404).json({message: "delivery group id is not found"});

        await AllModel.DeliveryGroupsModel.update(delivery_group, {
            where:{
                delivery_group_id: delivery_group_id
            },
            returning: true,
            transaction: t
        });

        // await AllModel.DeliveryGroupItemsModel.destroy({
        //     where: {
        //         delivery_group_id: req.query.id,
        //         session: session
        //     },
        //     transaction: t
        // });
        
        // if(delivery_group_items.length > 0){
        //     dGItems = await AllModel.DeliveryGroupItemsModel.bulkCreate(delivery_group_items, {
        //         returning: true,
        //         transaction: t
        //     });
        // }

        // // update delivery group
        // const getDGItems = await AllModel.DeliveryGroupItemsModel.findAll({
        //     where: {
        //         delivery_group_id: req.query.id,
        //     },
        //     transaction: t
        // })
        // let totalQty = 0;
        // let totalValue = 0;
        // getDGItems.reduce((prev, curr) => {
        //     totalQty = Number(prev.quantity) + Number(curr.quantity);
        //     totalValue = (Number(prev.quantity)*Number(prev.sell_price))-(Number(prev.quantity)*Number(prev.disc_prod_rec));
        // },0);

        // dg.total_item = totalQty;
        // dg.total_value = totalValue;
        // await dg.save({transaction: t});

        await t.commit();
        res.status(201).json({ message: "update success", delivery_group: dg});
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
}

const editDeliveryGroupList = async(req, res) => {
    const t = await sequelize.transaction();
    const { session, delivery_group_items } = req.body;
    const delivery_group_id = req.query.id;

    try{
        let dg, dGItems = null;
        dg = await AllModel.DeliveryGroupsModel.findByPk(delivery_group_id);

        if(!dg) return res.status(404).json({message: "delivery group id is not found"});

        await AllModel.DeliveryGroupItemsModel.destroy({
            where: {
                delivery_group_id: delivery_group_id,
                session: session
            },
            transaction: t
        });
        
        if(delivery_group_items.length > 0){
            dGItems = await AllModel.DeliveryGroupItemsModel.bulkCreate(delivery_group_items, {
                returning: true,
                transaction: t
            });
        }

        // update delivery group
        const getDGItems = await AllModel.DeliveryGroupItemsModel.findAll({
            where: {
                delivery_group_id: delivery_group_id,
            },
            transaction: t
        })

        let totalQty = 0;
        let totalValue = 0;
        getDGItems.reduce((prev, curr) => {
            totalQty = Number(prev.quantity) + Number(curr.quantity);
            totalValue = (Number(prev.quantity)*Number(prev.sell_price))-(Number(prev.quantity)*Number(prev.disc_prod_rec));
        },0);

        dg.total_item = totalQty;
        dg.total_value = totalValue;
        await dg.save({transaction: t});

        await t.commit();
        res.status(201).json({ message: "update success", delivery_group_items: dGItems});
    }
    catch(err){
        await t.rollback();
        res.status(500).json({err: err});
    }
}

const addMoreItemDeliveryGroup = async(req, res) => {
    const t = await sequelize.transaction();
    const { delivery_group, delivery_group_items } = req.body;

    try{
        let dg, dGItems = null;
        dg = await AllModel.DeliveryGroupsModel.findByPk(delivery_group);

        if(!dg) return res.status(404).json({message: "delivery group id is not found"});

        dg = await AllModel.DeliveryGroupsModel.update(delivery_group, {
            where:{
                delivery_group_id: req.query.id
            },
            returning: true,
            transaction: t
        });

        if(delivery_group_items){
            const dgItemsAll = await AllModel.DeliveryGroupItemsModel.findAll({
                order: [["createdAt", "DESC"]],
                where: {
                    delivery_group_id: req.query.id,
                },
                transaction: t
            });

            delivery_group_items.map(e => {
                e.session = dgItemsAll[0].session+1;
            })

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
    setDeliveryGroup,
    getAllDeliveryGroup,
    getDeliveryGroupByID,
    getDeliveryGroupActiveByEmployee,
    editDeliveryGroup,
    editDeliveryGroupList,
    addMoreItemDeliveryGroup,
    deleteDeliveryGroup,
    cancelDeliveryGroup
}