import express from "express";
import ProductController from "../controllers/ProductController.js";

const ProductsRoute = express.Router();

ProductsRoute.get("/products", ProductController.getProducts);
ProductsRoute.post("/product", ProductController.getProductID);
ProductsRoute.get("/products/group", ProductController.countProductByName);
ProductsRoute.get("/products/category", ProductController.getProductsByCategory);
ProductsRoute.post("/product", ProductController.insertProducts);
ProductsRoute.post("/products", ProductController.insertMultipleProducts);
ProductsRoute.put("/products", ProductController.updateProduct);
ProductsRoute.delete("/products", ProductController.deleteProduct);

export default ProductsRoute;