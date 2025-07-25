import sequelize from "../config/Database.js";
import AllModel from "../models/AllModel.js";
import { Sequelize } from "sequelize";

const getAllRO = async (req, res) => {
    try{
        const allRO = await AllModel.ROModel.findAll({
            return_order:  [['return_date', 'ASC']],
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
                {
                    model: AllModel.ROItemsModel,
                    as: 'return_order_items',
                    include: [
                        {
                            model: AllModel.OrderItemsModel,
                            as: 'order_item',
                            include: [
                                {
                                    model: AllModel.ProductsCatalogModel,
                                    as: 'product',
                                },
                            ]
                        }
                    ]
                },
                {
                    model: AllModel.OrdersModel,
                    as: 'order',
                    include: [
                        {
                            model: AllModel.OrderItemsModel,
                            as: 'order_items',
                            include: [
                                {
                                    model: AllModel.ProductsCatalogModel,
                                    as: 'product',
                                },
                                {
                                    model: AllModel.ROItemsModel,
                                    as: 'return_order_item',
                                }
                                
                            ]
                        },
                        {
                            model: AllModel.InvoicesModel,
                            as: 'invoice',
                        }
                    ]
                },
            ],
        });
        if(allRO){
            res.json(allRO);
        } else {
            res.status(404).json({error: `get all return order is not found!`});
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const insertRO = async (req, res) => {
    try{
        // check if already exist
        const { order_id } = req.body;
        const ro = await AllModel.ROModel.findOne({where: {order_id: order_id}});

        if(ro){
            res.status(403).json({error: `Return order already exist!`});
        } else {
            const newRO = await AllModel.ROModel.create(req.body);
            
            if(newRO){
                res.status(201).json(newRO);
            } else {
                res.status(500).json({error: `Error when create return order!`});
            }
        }
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const updateRO = async (req, res) => {
     try{

        const RO = await AllModel.ROModel.update(req.body, {
            where: {
                return_order_id: req.query.ro_id
            },
            returning:true
        });
        
        if(!RO){
            return res.status(404).json({ message: 'not found or empty, Failed to update return order' });
        } 

        res.status(201).json(RO);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

// const updateFullRO = async (req, res) => {
//      try{
//         const { ro_data } = req.body;
//         const { return_order_id } = req.params;
//         const parsedToCheck = JSON.parse(ro_data);

//         if(!parsedToCheck.ro_item || !parsedToCheck.ro){
//             throw new Error('403, Data is not complete!');
//         }

//         // delete all return order items
//         const ROItem = await AllModel.ROItemsModel.destroy({
//             where: {
//                 return_order_id: return_order_id
//             }
//         });
        
//         if(!ROItem){
//             throw new Error('404, Not found');
//         } 

//         // insert ROItem
//         const ROItemNew = await AllModel.ROItemsModel.create(JSON.stringify(parsedToCheck.ro_item));
        
//         if(!ROItemNew){
//             throw new Error('403, Failed to insert new return order item!');
//         } 

//          // Update RO
//         const RO = await AllModel.ROModel.update(JSON.stringify(parsedToCheck.ro), {
//             where: {
//                 return_order_id: return_order_id
//             }
//         });
        
//         if(!RO){
//             throw new Error('403, Failed to update return order!');
//         } 
//         res.status(201).json({ message: 'Successfully update full return order', RO});

//     } 
//     catch(err) {
//         res.status(500).json({err: err});
//     }
// };

const updateROStatus = async (req, res) => {
    try{
        const { status } = req.body;

        const RO = await AllModel.ROModel.update({status: status}, {
            where: {return_order_id: req.query.id},
            returning: true,
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
                {
                    model: AllModel.OrdersModel,
                    as: 'order',
                    include: [{
                        model: AllModel.OrderItemsModel,
                        as: 'order_items'
                    }]
                },
            ]
        });

        if(!RO){
            res.status(404).json({err: `failed to update RO`});
        } 

        res.status(201).json(RO);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

const deleteRO = async (req, res) => {
    try{
        const delRO = await AllModel.ROModel.destroy({where:{return_order_id: req.query.id}});
        
        if(!delRO){
            res.status(404).json({err: 'Return order id is not found!'});
        }
        res.status(201).json(delRO);
    } 
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}

// const countSalesByCust = async (req, res) => {
//     // const name = req.query.name;
//     try{
//         const countSales = await AllModel.OrdersModel.findAll(
            
//             {
//                 group: [
//                     'customer_id',
//                 ],
//                 attributes: [
//                   'customer_id',
//                   [Sequelize.fn(`COUNT`, `customer_id`), `count`]
//                 ],
//             }
//         );
//         if(countSales){
//             res.json(countSales);
//         } else {
//             res.status(404).json({error: `sales data by custID is not found!`});
//         }
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const salesByCustUnpaid = async (req, res) => {
//     // const name = req.query.name;
//     try{
//          const countSales = await AllModel.CustomersModel.findAll({
//             include: [
//                 {
//                 model: AllModel.OrdersModel,
//                 as: 'orders',
//                 where: { payment_type: 'unpaid' },
//                 required: true
//                 }
//             ]
//         });
//         if(countSales){
//             res.json(countSales);
//         } else {
//             res.status(404).json({error: `sales data by cust unpaid is not found!`});
//         }
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const salesByOneCustPayType = async (req, res) => {
//     try{
//          const countSales = await AllModel.CustomersModel.findOne({
//             where: {customer_id: req.query.custid},
//             include: [
//                 {
//                 model: AllModel.OrdersModel,
//                 as: 'orders',
//                 where: { 
//                     payment_type: req.query.paytype,
//                     order_status: {[Sequelize.Op.not]: 'canceled'},
//                     invoice_id: null 
//                 },
//                 required: true
//                 }
//             ]
//         });
//         if(countSales){
//             res.json(countSales);
//         } else {
//             res.status(404).json({
//                 error: 404, 
//                 message: `sales data by cust id where unpaid and doesn't have invoice is not found!`
//             });
//         }
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const salesByOneCustPayType2 = async (req, res) => {
//     try{
//          const countSales = await AllModel.CustomersModel.findOne({
//             where: {customer_id: req.query.custid},
//             include: [
//                 {
//                 model: AllModel.OrdersModel,
//                 as: 'orders',
//                 where: { 
//                     payment_type: req.query.paytype,
//                     order_status: {[Sequelize.Op.not]: 'canceled'},
//                     invoice_id: {
//                         [Sequelize.Op.or]: [null,req.query.invid]
//                     }
//                 },
//                 required: true
//                 }
//             ]
//         });
//         if(countSales){
//             res.json(countSales);
//         } else {
//             res.status(404).json({
//                 error: 404, 
//                 message: `sales data by cust id where unpaid and doesn't have invoice is not found!`
//             });
//         }
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const getSalesCust = async(req, res) => {
//     try{
//         const getData = await AllModel.OrdersModel.findAll({
//             where: {customer_id: req.query.id},
//             include: [
//                 {
//                     model: AllModel.CustomersModel,
//                     as: 'customer'
//                 },
//                 {
//                     model: AllModel.OrderItemsModel,
//                     as: 'order_items',
//                     required: true
//                 },
//                 {
//                     model: AllModel.DeliveryModel,
//                     as: 'delivery',
//                     required: false
//                 },
                
//             ]
//         })

//         if(getData){
//             res.json(getData);
//         } else {
//             res.status(404).json({error: `get customer data with ID not found!`});
//         }
//     }
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const getSalesByStatus = async(req, res) => {
//     try{
//         const getData = await AllModel.OrdersModel.findAll({
//             where: {is_complete: req.query.iscomplete},
//             include: [
//                 {
//                     model: AllModel.CustomersModel,
//                     as: 'customer'
//                 },
//                 {
//                     model: AllModel.OrderItemsModel,
//                     as: 'order_items',
//                     required: true
//                 },
//                 {
//                     model: AllModel.DeliveryModel,
//                     as: 'delivery',
//                     required: false
//                 },
//             ]
//         })

//         if(getData){
//             res.json(getData);
//         } else {
//             res.status(404).json({error: `get customer data with ID not found!`});
//         }
//     }
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

const getROByOrderID = async(req, res) => {
    try{
        const getRO = await AllModel.ROModel.findAll({
            where: {order_id: req.query.id},
            include: [
                {
                    model: AllModel.CustomersModel,
                    as: 'customer'
                },
                {
                    model: AllModel.ROItemsModel,
                    as: 'return_order_items',
                    include: [
                        {
                            model: AllModel.OrderItemsModel,
                            as: 'order_item',
                            include: [
                                {
                                    model: AllModel.ProductsCatalogModel,
                                    as: 'product',
                                },    
                            ]
                        }
                    ]
                },
                {
                    model: AllModel.OrdersModel,
                    as: 'order',
                    include: [{
                        model: AllModel.OrderItemsModel,
                        as: 'order_items',
                        include: [
                            {
                                model: AllModel.ProductsCatalogModel,
                                as: 'product',
                            },
                            
                        ]
                    }]
                },
            ],
        })

        if(getRO){
            res.json(getRO);
        } else {
            res.status(404).json({error: `get return order data by order ID is not found!`});
        }
    }
    catch(err) {
        res.status(500).json({err: "internal server error"});
    }
}


// const salesWOrderItems = async (req, res) => {
//     try{
//          const countSales = await AllModel.OrdersModel.findAll({
//             where: {order_id: req.query.id},
//             order: [["order_date", "ASC"]],
//             include: [
//                 {
//                     model: AllModel.OrderItemsModel,
//                     as: 'order_items',
//                     required: true,
//                     include: [
//                         {
//                             model: AllModel.ProductsCatalogModel,
//                             as: 'product',
//                             required: true,
//                         }
//                     ]
//                 },
//                 {
//                     model: AllModel.DeliveryModel,
//                     as: 'delivery',
//                     required: false
//                 },
//                 {
//                     model: AllModel.CustomersModel,
//                     as: 'customer',
//                     required: true
//                 },
//             ]
//         });
//         if(countSales){
//             res.json(countSales);
//         } else {
//             res.status(404).json({error: `sales data with order items is not found!`});
//         }
//     } 
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }

// const getSalesAndSum = async(req, res) => {
//     try{
//         const getData = await AllModel.OrdersModel.findAll({
//             where: {
//                 customer_id: req.query.id,
//                 payment_type: req.query.paytype
//             },
//             attributes: [
//                 "customer_id",
//                 [sequelize.fn("SUM", sequelize.col("subtotal")), "total_subtotal"],
//                 [sequelize.fn("SUM", sequelize.col("grandtotal")), "total_grandtotal"],
//                 [sequelize.fn("SUM", sequelize.col("order_discount")), "total_order_disc"],
//             ],
//             group: ['customer_id'],
//         })

//         if(getData){
//             res.json(getData);
//         } else {
//             res.status(404).json({error: `get sales data with sum not found!`});
//         }
//     }
//     catch(err) {
//         res.status(500).json({err: "internal server error"});
//     }
// }


export default {
    getAllRO,
    insertRO, 
    updateRO,
    updateROStatus, 
    getROByOrderID,
    deleteRO,  
    // updateFullRO
    // countSalesByCust,
    // getSalesCust,
    // getSalesByStatus,
    // getSalesByID,
    // salesByCustUnpaid,
    // salesWOrderItems,
    // salesByOneCustPayType,
    // salesByOneCustPayType2,
    // getSalesAndSum,
    // updateSalesAddInv,
    // updateSalesAddInvoices,
    // updateOrderStatus,
};