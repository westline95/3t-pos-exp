import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import ProductsRoute from "./routes/ProductsRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import SubCategoryRoute from "./routes/SubCategoryRoute.js";
import CustomersRoute from "./routes/CustomerRoute.js";
import SalesRoute from "./routes/SalesRoute.js";
import InvoiceRoute from "./routes/InvoiceRoute.js";
import StatusRoute from "./routes/StatusRoute.js";
import CustomerTypeRoute from "./routes/CustTypeRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.set('views', './views');
// app.set('view engine', 'pug');
app.use(express.json());
app.get('/', (req, res) => res.send("HelloWorld"));

// product CRUD
app.use(ProductsRoute);
// category CRUD
app.use(CategoryRoute);
// sub category CRUD
app.use(SubCategoryRoute);
// customers CRUD
app.use(CustomersRoute);
// sales CRUD
app.use(SalesRoute);
// invoice CRUD
app.use(InvoiceRoute);
// status CRUD
app.use(StatusRoute);
// customer type CRUD
app.use(CustomerTypeRoute);



app.listen(port, () => console.log(`
    Server running at port ${port}..
`))   


