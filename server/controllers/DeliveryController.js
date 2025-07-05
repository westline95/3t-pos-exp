import AllModel from "../models/AllModel.js";

const validStatus = ['pending', 'on-load', 'in-delivery', 'delivered', 'canceled'];

const createDelivery = async (req, res) => {
    try {
        const { order_id, tracking_number, ship_date, delivery_status, delivery_address, courier_id, courier_name } = req.body;

        // checking first, order_id && order_type == delivery
        const checkOrder = await AllModel.OrdersModel.findByPk(order_id);
        if(!checkOrder){
            return res.status(404).json({ message: 'Order not found.' });
        }

        if(checkOrder.order_type != "delivery"){
            return res.status(400).json({ message: 'Delivery only allowed for delivery-type orders.' });
        }

        // check delivery with order id if existed
        const checkExistDelivery = await AllModel.DeliveryModel.findOne({ where: {order_id: order_id} });
        if(checkExistDelivery){
            return res.status(409).json({ message: 'Delivery already exists for this order.' });
        }

        const delivery = await AllModel.DeliveryModel.create({
            order_id,
            courier_id,
            courier_name,
            ship_date,
            delivery_status: 'pending',
            delivery_address
        });
        
        if(delivery){
            res.status(201).json(delivery);
        } else {
            res.status(404).json({error: `failed to create delivery`});
        }
    } catch (err) {
        res.status(500).json({err: err})
    }
};

const assignCourier = async (req, res) => {
    try {
        const { delivery_id } = req.params;
        const { courier_id, tracking_number  } = req.body;
        
        // get delivery id
        const delivery = await AllModel.DeliveryModel.findByPk(delivery_id);
        if (!delivery) return res.status(404).json({ message: 'Delivery not found.' });

        // validation courier
        const courier = await AllModel.UsersModel.findByPk(courier_id);
        if (!courier || courier.role !== 'courier') {
            return res.status(400).json({ message: 'Assigned user is not a valid courier.' });
        }

        // assign courier
        delivery.courier_id = courier_id;
        delivery.tracking_number = tracking_number;
        await delivery.save();

        res.json({ message: 'courir assigned, tracking number created.', delivery });

    } catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const updateStatusDelivery = async (req, res) => {
    try{
        const { delivery_id } = req.params;
        const { delivery_status  } = req.body;

        // get delivery id
        const delivery = await AllModel.DeliveryModel.findByPk(delivery_id);
        if (!delivery) return res.status(404).json({ message: 'Delivery not found.' });

        // validate status
        if (!validStatus.includes(delivery_status)) {
            return res.status(400).json({ message: 'Invalid status value.' });
        }

        // update status
        delivery.delivery_status = delivery_status;
        await delivery.save();

        res.json({ message: 'delivery status updated.', delivery });
    } catch(err) {
        res.status(500).json({err: "internal server error"});
    }
};

const getAllDelivery = async (req, res) => {
    try {
        const delivery = await AllModel.DeliveryModel.findAll({
            include: [
                {
                    model: AllModel.OrdersModel,
                    as: 'order',
                    include: [
                        {
                            model: AllModel.CustomersModel,
                            as: 'customer',
                        }
                    ]
                }
            ]
        });
        
        if(delivery){
            res.status(201).json(delivery);
        } else {
            res.status(404).json({error: `failed to get all delivery`});
        }
    } catch (err) {
        res.status(500).json({err: err})
    }
};


export default {
    createDelivery,
    updateStatusDelivery,
    assignCourier,
    getAllDelivery
}
