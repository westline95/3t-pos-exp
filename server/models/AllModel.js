import Sequelize from "sequelize";
import sequelize from "../config/Database.js";

const UsersModel = sequelize.define("users", 
    {
        id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },    
        user_mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true
        },
        user_pass: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        refresh_token: {
            type: Sequelize.STRING,
            allowNull: true,
        },

    }, 
    {
        tableName: 'users',
    }
);

const CustomersModel = sequelize.define("customers", 
    {
        customer_id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        img: {
            type: Sequelize.STRING,
            allowNull: true,
        },       
        email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        phonenumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        debt_limit: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        total_sales: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            defaultValue: 0.00
        },
        total_debt: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            defaultValue: 0.00
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        country: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        province: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        postal_code: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        address: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    }, 
    {
        tableName: 'customers',
    }
);

const CategoriesModel = sequelize.define("categories", 
    {
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      img: {
        type: Sequelize.STRING,
        allowNull: true
      },
    },
    {
      tableName: "categories"
    }
  );

const CustTypeModel = sequelize.define("cust_type", 
    {
        cust_type_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type:{
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.BOOLEAN
        }
    },
    {
        tableName: "cust_type",
    }
);

const ProductsCatalogModel = sequelize.define("products", 
    {
        product_id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        product_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sku: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        category_id: {
            type: Sequelize.INTEGER,
        },
        variant: {
            type: Sequelize.STRING,
            allowNull: true,
        },        
        unit: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        product_cost: {
            type: Sequelize.DECIMAL,
            allowNull:false
        },
        sell_price: {
            type: Sequelize.DECIMAL,
            allowNull:false
        },
        discount: {
            type: Sequelize.DECIMAL,
            allowNull:true
        },
        img: {
            type: Sequelize.STRING,
            allowNull:true
        }
    }, 
    {
        tableName: 'products',
    }
);

const OrdersModel = sequelize.define("orders", 
    {
        order_id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },       
        customer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },       
        invoice_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        order_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        order_status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        source: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        payment_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        shipped_date:{
            type: Sequelize.DATE,
            allowNull: true,
        },
        order_discount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        },
        subtotal: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0
        },
        grandtotal: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0
        },
        note: {
            type: Sequelize.STRING,
            allowNull: true
        },
        is_complete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, 
    {
        tableName: 'orders',
    }
);

const OrderItemsModel = sequelize.define("order_items", {
    item_id: {
        type:  Sequelize.INTEGER,
        primaryKey:  true,
        autoIncrement: true,
        allowNull: false,
    },
    order_id: {
        type:  Sequelize.INTEGER,
        allowNull: false,
    },
    product_id: {
        type:  Sequelize.INTEGER,
        allowNull: false,
    },
    quantity: {
        type:  Sequelize.DECIMAL,
        allowNull: false,
    },
    sell_price: {
        type:  Sequelize.DECIMAL,
        allowNull: false,
    },
    discount_prod_rec: {
        type:  Sequelize.DECIMAL,
        allowNull: true,
    },

}, { 
    tableName: 'order_items'
})

const StatusModel = sequelize.define("statusList", 
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        status:{
            type: Sequelize.STRING,
        }
    },
    {
        tableName: 'status',
    }

);

const SubCategoryModel = sequelize.define("subCategory", 
    {
        id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
        },
        category: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
        displayPrice: {
            type: Sequelize.STRING,
        }, 
        img: {
            type: Sequelize.STRING,
        },
    }, 
    {
        tableName: 'subCategory',
    }
);

const InvoicesModel = sequelize.define("invoices", 
    {
        invoice_id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        invoice_number:{
            type:  Sequelize.STRING,
            unique: true,
        },
        customer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        order_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        invoice_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        invoice_due: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        subtotal: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        amount_due: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        total_discount: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue:0
        },
        is_paid: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        payment_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        remaining_payment: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0
        },
        url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, 
    {
        tableName: 'invoices',
    }
);


const OrdersGroupModel = sequelize.define("orders_group", 
    {
        order_group_id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
         invoice_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        order_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, 
    {
        tableName: 'orders_group',
    }
);

InvoicesModel.beforeCreate(async (inv, options) => {
  const now = new Date();
  const timestamp = Date.now().toString(36);
  const dateKey = now.toISOString().slice(0, 10);

  const countToday = await InvoicesModel.count({
    where: {
      createdAt: {
        [Sequelize.Op.gte]: new Date(`${dateKey}T00:00:00Z`),
        [Sequelize.Op.lt]: new Date(`${dateKey}T23:59:59Z`),
      }
    }
  });

  const sequence = String(countToday + 1).padStart(3, '0');
  inv.invoice_number = `INV-3T${timestamp}${sequence}`;
});

const PaymentsModel = sequelize.define("payments", 
    {
        payment_id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        customer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        invoice_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        payment_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        amount_paid: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        payment_method: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        note: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        payment_ref: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    }, 
    {
        tableName: 'payments',
    }
);

const ReceiptsModel = sequelize.define("receipts", 
    {
        receipt_id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        customer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        invoice_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        receipt_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        total_payment: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        change: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0
        },
        url: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    }, 
    {
        tableName: 'receipts',
    }
);

const invSettModel = sequelize.define("inv_setting", 
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        weekly_created: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    }, 
    {
        tableName: 'inv_setting',
    }
);

const mailerSettModel = sequelize.define("mailer_setting", 
    {
        id:{
            type:  Sequelize.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            allowNull: false,
        },
        mailer_host: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mailer_port: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        mailer_mail: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mailer_pass: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mailer_from_mail: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, 
    {
        tableName: 'mailer_setting',
    }
);

const DeliveryModel = sequelize.define("delivery", 
    {
        delivery_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false
        },
        order_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }, 
        tracking_number: {
            type: Sequelize.STRING,
            unique: true
        },
        ship_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        courier_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        courier_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        delivery_status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        delivery_address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        shipped_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        
    },
    {
        tableName: 'delivery'
    }
);

const ROModel = sequelize.define("return_orders", 
    {
        return_order_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false
        },
        order_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }, 
        customer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        return_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        reason: {
            type: Sequelize.STRING,
            allowNull: false
        },
        refund_amount: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        
    },
    {
        tableName: 'return_orders'
    }
);

const ROItemsModel = sequelize.define("return_order_items", 
    {
        ro_item_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false
        },
        return_order_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }, 
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        sell_price: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        discount_prod_rec: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        item_status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        refund_amount: {
            type: Sequelize.DECIMAL,
        },
    },
    {
        tableName: 'return_order_items'
    }
);

DeliveryModel.beforeCreate(async (deliv, options) => {
  const now = new Date();
  const timestamp = Date.now().toString(36);
  const dateKey = now.toISOString().slice(0, 10);

  const countToday = await DeliveryModel.count({
    where: {
      createdAt: {
        [Sequelize.Op.gte]: new Date(`${dateKey}T00:00:00Z`),
        [Sequelize.Op.lt]: new Date(`${dateKey}T23:59:59Z`),
      }
    }
  });

  const sequence = String(countToday + 1).padStart(3, '0');
  deliv.tracking_number = `TR-3T${timestamp}${sequence}`;
});

// assocations
// one to many (categories - products)
CategoriesModel.hasMany(ProductsCatalogModel, {
    sourceKey: 'category_id',
    foreignKey: 'category_id',
});
ProductsCatalogModel.belongsTo(CategoriesModel,{
    foreignKey: 'category_id',
    targetKey: 'category_id'
});

// one to many (customers - orders)
CustomersModel.hasMany(OrdersModel, {
    sourceKey: 'customer_id',
    foreignKey: 'customer_id',
});
OrdersModel.belongsTo(CustomersModel, {
    foreignKey: 'customer_id',
    targetKey: 'customer_id'
});

// one to many (orders - order items)
OrdersModel.hasMany(OrderItemsModel, {
    sourceKey: 'order_id',
    foreignKey: 'order_id',
});
OrderItemsModel.belongsTo(OrdersModel, {
    foreignKey: 'order_id',
    targetKey: 'order_id',
});

// one to many (products - order-items)
ProductsCatalogModel.hasMany(OrderItemsModel, {
    sourceKey: 'product_id',
    foreignKey: 'product_id',
});
OrderItemsModel.belongsTo(ProductsCatalogModel, {
    foreignKey: 'product_id',
    targetKey: 'product_id'
})

// one to many (customers - payments)
CustomersModel.hasMany(PaymentsModel, {
    sourceKey: 'customer_id',
    foreignKey: 'customer_id',
});
PaymentsModel.belongsTo(CustomersModel, {
    foreignKey: 'customer_id',
    targetKey: 'customer_id'
})

// one to many (invoices - payments)
InvoicesModel.hasMany(PaymentsModel, {
    sourceKey: 'invoice_id',
    foreignKey: 'invoice_id',
});
PaymentsModel.belongsTo(InvoicesModel, {
    foreignKey: 'invoice_id',
    targetKey: 'invoice_id'
});

// InvoicesModel.hasMany(OrdersGroupModel, {
//     foreignKey: 'invoice_id',
//     sourceKey: 'invoice_id',
// });
// OrdersGroupModel.belongsTo(InvoicesModel, {
//     foreignKey: 'invoice_id',
//     targetKey: 'invoice_id'
// });

// one to many (customers - invoices)
CustomersModel.hasMany(InvoicesModel, {
    sourceKey: 'customer_id',
    foreignKey: 'customer_id',
});
InvoicesModel.belongsTo(CustomersModel, {
    foreignKey: 'customer_id',
    targetKey: 'customer_id'
});

// one to many (invoices - orders)
// orderid in invoices model diff data types because wanted to be array with full of order id
// foreing key is in order table => invoice_id
InvoicesModel.hasMany(OrdersModel, {
    sourceKey: 'invoice_id',
    foreignKey: 'invoice_id',
});
OrdersModel.belongsTo(InvoicesModel, {
    foreignKey: 'invoice_id',
    targetKey: 'invoice_id'
});

// one to many (customers - invoices)
CustomersModel.hasMany(ReceiptsModel, {
    sourceKey: 'customer_id',
    foreignKey: 'customer_id',
});
ReceiptsModel.belongsTo(CustomersModel, {
    foreignKey: 'customer_id',
    targetKey: 'customer_id'
});


// // // one to many (order group - invoices)
// InvoicesModel.hasMany(OrdersGroupModel, {
//     sourceKey: 'invoice_id',
//     foreignKey: 'invoice_id',
// });
// OrdersGroupModel.belongsTo(InvoicesModel, {
//     foreignKey: 'invoice_id',
//     targetKey: 'invoice_id'
// });

// one to one (invoices - receipts)
InvoicesModel.hasOne(ReceiptsModel, {
    sourceKey: 'invoice_id',
    foreignKey: 'invoice_id',
});
ReceiptsModel.belongsTo(InvoicesModel, {
    foreignKey: 'invoice_id',
    targetKey: 'invoice_id'
})

// one to one (orders - delivery)
OrdersModel.hasOne(DeliveryModel, {
    sourceKey: 'order_id',
    foreignKey: 'order_id',
})
DeliveryModel.belongsTo(OrdersModel,{
    foreignKey: 'order_id',
    targetKey: 'order_id'
})



// // one to many (order group - order)
OrdersGroupModel.hasMany(OrdersModel, {
    sourceKey: 'order_id',
    foreignKey: 'order_id',
});
OrdersModel.belongsTo(OrdersGroupModel, {
    foreignKey: 'order_id',
    targetKey: 'order_id'
});

// // one to many (order group - order)
InvoicesModel.hasMany(OrdersGroupModel, {
    sourceKey: 'invoice_id',
    foreignKey: 'invoice_id',
});
OrdersGroupModel.belongsTo(InvoicesModel, {
    foreignKey: 'invoice_id',
    targetKey: 'invoice_id'
});

// one to many (return_orders - order)
OrdersModel.hasMany(ROModel, {
    sourceKey: 'order_id',
    foreignKey: 'order_id',
});
ROModel.belongsTo(OrdersModel, {
    foreignKey: 'order_id',
    targetKey: 'order_id'
});

// one to many (customer - return_orders)
CustomersModel.hasMany(ROModel, {
    sourceKey: 'customer_id',
    foreignKey: 'customer_id',
});
ROModel.belongsTo(CustomersModel, {
    foreignKey: 'customer_id',
    targetKey: 'customer_id'
});

// one to many (return_orders - return_order_items)
ROModel.hasMany(ROItemsModel, {
    sourceKey: 'return_order_id',
    foreignKey: 'return_order_id'
});
ROItemsModel.belongsTo(ROModel, {
    foreignKey: 'return_order_id',
    targetKey: 'return_order_id'
});

// one to many (return_order_items - product)
ProductsCatalogModel.hasMany(ROItemsModel, {
    sourceKey: 'product_id',
    foreignKey: 'product_id'
});
ROItemsModel.belongsTo(ProductsCatalogModel, {
    foreignKey: 'product_id',
    targetKey: 'product_id'
});


export default {
    UsersModel,
    CustomersModel,
    CategoriesModel,
    SubCategoryModel,
    StatusModel,
    CustTypeModel,
    ProductsCatalogModel,
    OrderItemsModel,
    OrdersModel,
    InvoicesModel, 
    PaymentsModel,
    ReceiptsModel,
    invSettModel,
    mailerSettModel,
    DeliveryModel,
    OrdersGroupModel,
    ROItemsModel,
    ROModel
};