import mysql from "mysql2";
// import { Sequelize } from "sequelize-cockroachdb";
import { Sequelize } from "sequelize";
// import { MongoClient } from "mongodb";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import pgp from "pg-promise";
import path from "path";
import fs from "fs";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();

// const dbConnection = async () => {
//     const dbLink = "postgresql://3t-pos:u38FrD24WEuZ61N77N9KJw@3t-pos-9761.8nk.gcp-asia-southeast1.cockroachlabs.cloud:26257/3t?sslmode=verify-full"
//     const sequelize = new Sequelize(dbLink,
//     {
//         dialect: 'postgres',
//         protocol: 'postgres',
//         dialectOptions: {
//              ssl: {
//                 require: true,
//                 rejectUnauthorized: false
//              }
//         }
//     }) ;

//     await sequelize.authenticate().then(() => {
//         console.log("connection success");
//     }).catch(err => {
//         console.error("unable to connect: ", err);
//     })
    
// }

// const db = pgp('postgresql://3t-pos:u38FrD24WEuZ61N77N9KJw@3t-pos-9761.8nk.gcp-asia-southeast1.cockroachlabs.cloud:26257/3t?sslmode=verify-full');
const sequelize = new Sequelize({
    dialect: "postgres",
    username: "3t-pos",
    password: "u38FrD24WEuZ61N77N9KJw",
    host: "3t-pos-9761.8nk.gcp-asia-southeast1.cockroachlabs.cloud",
    port: 26257,
    database: "3t",
    dialectOptions: {
    //   ssl: {
        
    //     //For secure connection:
    //     ca: fs.readFileSync('$HOME/Library/CockroachCloud/certs/cc-ca.crt')
    //            .toString()
    //   },
        ssl: {
            require: true, 
            rejectUnauthorized: false
        }
    },
    logging: false, 
  });



export default sequelize;
// export default dbConnection;
// module.exports = dbConnection;
