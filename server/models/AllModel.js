import Sequelize from "sequelize";
import sequelize from "../config/Database.js";

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
        cust_type: {
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
            defaultValue: 0.00
        },
        total_sales: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0.00
        },
        total_debt: {
            type: Sequelize.DECIMAL,
            allowNull: false,
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
      status: {
        type: Sequelize.STRING,
        allowNull: false
      }
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
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
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
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'in-stock'
        },
        img: {
            type: Sequelize.STRING,
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
    discount: {
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
        remaining_payment: {
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
        tableName: 'invoices',
    }
);

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
// InvoicesModel.hasMany(OrdersModel, {
//     sourceKey: 'order_id',
//     foreignKey: 'order_id',
// });
// OrdersModel.belongsTo(InvoicesModel, {
//     foreignKey: 'order_id',
//     targetKey: 'order_id'
// });

// one to many (customers - invoices)
CustomersModel.hasMany(ReceiptsModel, {
    sourceKey: 'customer_id',
    foreignKey: 'customer_id',
});
ReceiptsModel.belongsTo(CustomersModel, {
    foreignKey: 'customer_id',
    targetKey: 'customer_id'
});

// one to one (invoices - receipts)
InvoicesModel.hasOne(ReceiptsModel, {
    sourceKey: 'invoice_id',
    foreignKey: 'invoice_id',
});
ReceiptsModel.belongsTo(InvoicesModel, {
    foreignKey: 'invoice_id',
    targetKey: 'invoice_id'
})

export default {
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
    ReceiptsModel
};
