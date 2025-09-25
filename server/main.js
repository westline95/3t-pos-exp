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
import DeliveryRoute from "./routes/DeliveryRoute.js";
import OrderGroupRoute from "./routes/OrderGroupRoute.js";
import RORoute from "./routes/ReturnOrderRoute.js";
import ROItemRoute from "./routes/ReturnOrderItemRoute.js";
import OrdersCreditRoute from "./routes/OrdersCreditRoute.js";
import EmployeeRoute from "./routes/EmployeeRoute.js";
import DepartmentsRoute from "./routes/DepartmentsRoute.js";
import SalarySettingRoute from "./routes/SalarySettingRoute.js";
import SalaryAdjRoute from "./routes/SalaryAdjustmentsRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// Route for GET requests
const verifyToken = 'haduhhhhpusinggaktuh123';
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).send();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).send();
});


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

// // return order CRUD
// app.use(RORoute);
// app.use(CustomersRoute);
// return order CRUD
// app.use(OrdersCreditRoute);
// // return order item CRUD
// app.use(ROItemRoute);
// app.use(OrdersCreditRoute);
// app.use(InvoiceRoute);
// app.use(EmployeeRoute);
// app.use(DepartmentsRoute);
// app.use(SalarySettingRoute);
// // sales CRUD
// app.use(SalesRoute);
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

app.use(OrderGroupRoute);
// product CRUD
app.use(ProductsRoute);

// category CRUD
app.use(CategoryRoute);
// sub category CRUD
app.use(SubCategoryRoute);
// customers CRUD
app.use(CustomersRoute);
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
// delivery CRUD
app.use(DeliveryRoute);
// return order CRUD
app.use(RORoute);
// return order item CRUD
app.use(ROItemRoute);
// sales CRUD
app.use(SalesRoute);
// return order credit CRUD
app.use(OrdersCreditRoute)
// employee CRUD
app.use(EmployeeRoute);
// return departments CRUD
app.use(DepartmentsRoute);
// return salary setting CRUD
app.use(SalarySettingRoute);
// return salary adj CRUD
app.use(SalaryAdjRoute);


app.listen(port, () => console.log(`
    Server running at port ${port}..
`))   


