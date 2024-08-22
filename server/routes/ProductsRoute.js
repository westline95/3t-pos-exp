import express from "express";
import ProductController from "../controllers/ProductController.js";


const ProductsRoute = express.Router();

ProductsRoute.get("/products", ProductController.getProducts);
ProductsRoute.get("/products/group", ProductController.countProductByName);
ProductsRoute.post("/product", ProductController.insertProducts);
ProductsRoute.post("/products", ProductController.insertMultipleProducts);
ProductsRoute.put("/products", ProductController.updateProduct);
ProductsRoute.delete("/products", ProductController.deleteProduct);

export default ProductsRoute;