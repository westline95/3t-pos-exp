import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middleware/credentials.js";
import cookieParser from "cookie-parser";
import accessValidation from "./api/auth.js";
import verifyJWT from "./middleware/verifyJWT.js";
import AuthRouter from "./routes/AuthRoute.js";
import RefreshRoute from "./routes/RefreshTokenRoute.js";
import LogOutRouter from "./routes/LogOutRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ProductsRoute from "./routes/ProductsRoute.js";
import CustomerTypeRoute from "./routes/CustTypeRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import SubCategoryRoute from "./routes/SubCategoryRoute.js";
import CustomersRoute from "./routes/CustomerRoute.js";
import SalesRoute from "./routes/SalesRoute.js";
import InvoiceRoute from "./routes/InvoiceRoute.js";
import StatusRoute from "./routes/StatusRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import ReceiptRoute from "./routes/ReceiptRoute.js";
import OrderItemsRoute from "./routes/OrderItemsRoute.js";
import InvSettRoute from "./routes/InvSettRoute.js";
import MailerSettRoute from "./routes/MailerSettRoute.js";
import UploadImgRoute from "./routes/UploadImgRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// app.use(cors());

// app.set('views', './views');
// app.set('view engine', 'pug');
app.use(express.json({ limit: '50mb' }));

app.use(cookieParser());

// ROUTES
app.get('/', (req, res) => res.send("HelloWorld"));

// auth
app.use(AuthRouter);
// refresh
app.use(RefreshRoute);
// logout
app.use(LogOutRouter);

app.use(verifyJWT);
// app.use(accessValidation);
// upload img
app.use(UploadImgRoute);
// user CRUD
app.use(UserRoute);

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
// payment CRUD
app.use(PaymentRoute);
// receipt CRUD
app.use(ReceiptRoute);
// order items CRUD
app.use(OrderItemsRoute);
// inv sett CRUD
app.use(InvSettRoute);
// mailer sett CRUD
app.use(MailerSettRoute);



app.listen(port, () => console.log(`
    Server running at port ${port}..
`))   


