import express from "express";
import prodCategoryRoutes from "./routes/ProductRoute.js";
import mongoose from "mongoose";
// import mysql from "mysql2";
// import dbConnection from "./config/Database.js";
// import { DataTypes, Sequelize } from "sequelize";
import bodyParser from "body-parser";
// const db = require("./config/Database")
// import { sequelize } from "sequelize";
// import sequlize from "./config/Database.js";
import dotenv from "dotenv";

// import pool  from "./config/Database.js";
// const db = require("./config/Database");
import cors from "cors";
// import { Timestamp } from "mongodb";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.set('views', './views');
// app.set('view engine', 'pug');
app.use(express.json());
app.get('/', (req, res) => res.send("HelloWorld"));
app.use("/api", prodCategoryRoutes);



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


