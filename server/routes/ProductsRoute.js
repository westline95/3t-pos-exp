import express from "express";
import ProductController from "../controllers/ProductController.js";
import accessValidation from "../api/auth.js";


const ProductsRoute = express.Router();

ProductsRoute.get("/products",accessValidation, ProductController.getProducts);
ProductsRoute.post("/product",accessValidation, ProductController.getProductID);
ProductsRoute.get("/products/group",accessValidation, ProductController.countProductByName);
ProductsRoute.get("/products/category",accessValidation, ProductController.getProductsByCategory);
ProductsRoute.post("/product",accessValidation, ProductController.insertProducts);
ProductsRoute.post("/products",accessValidation, ProductController.insertMultipleProducts);
ProductsRoute.put("/products",accessValidation, ProductController.updateProduct);
ProductsRoute.delete("/products",accessValidation, ProductController.deleteProduct);

export default ProductsRoute;