import { Sequelize } from "sequelize";
import sequelize from "../config/Database.js";
// import mongoose from "mongoose";
// import { INTEGER } from "sequelize";

// const sequelize = new Sequelize({
//     dialect: "postgres",
//     username: "3t-pos",
//     password: "u38FrD24WEuZ61N77N9KJw",
//     host: "3t-pos-9761.8nk.gcp-asia-southeast1.cockroachlabs.cloud",
//     port: 26257,
//     database: "3t",
//     dialectOptions: {
//     //   ssl: {
        
//     //     //For secure connection:
//     //     ca: fs.readFileSync('$HOME/Library/CockroachCloud/certs/cc-ca.crt')
//     //            .toString()
//     //   },
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     },
//     logging: false, 
//   });

  const ProdCategory = sequelize.define("prodCategories", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
    //   allowNull: false
    },
    img: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    }
 });

 sequelize.sync()
 .then(() => {
    console.log("db and tables sync");
 })
 .catch(err => {
    console.error("error sync: ", err);
 })


 export default ProdCategory;