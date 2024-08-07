import express from "express";
import ReadCategoryRoute from "./routes/ReadCategory.js";
import ReadProductsRoute from "./routes/ReadProductsRoute.js";
import ReadSubCategory from "./routes/ReadSubCategory.js";
import WriteProductsCatalogRoute from "./routes/WriteProductsCatalogRoute.js";
import WriteSubCategoryRoute from "./routes/WriteSubCategoryRoute.js";
// import subCategoryRoute from "./routes/subCategoryRoute.js";

import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.set('views', './views');
// app.set('view engine', 'pug');
app.use(express.json());
app.get('/', (req, res) => res.send("HelloWorld"));
app.use("/category", ReadCategoryRoute);
app.use("/sub-category", ReadSubCategory);
app.use("/products", ReadProductsRoute);
app.use("/prod-catalog", WriteProductsCatalogRoute);
app.use("/sub-category", WriteSubCategoryRoute);

// mongoose.connect("mongodb+srv://3t-pos:s9Ib9KsV01bmB7WQ@3t.ddktddt.mongodb.net/?retryWrites=true&w=majority&appName=3t")
// .then(() =>{
//     console.log("db connected");
    app.listen(port, () => console.log(`
        Server running at port ${port}..
    `))    
// })
// .catch(()=> {
//     console.log("db faied to connect")
// })


