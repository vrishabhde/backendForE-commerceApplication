import express from "express";
import { register,  } from "../controllers/user_controller.js";
import { addproduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product_controller.js";
import { addproductAuth, authForGetAllproduct, deleteProductAuth, updateProductAuth } from "../middlewares/pinAuth.js";



const router = express.Router();

router.post("/register", register);
router.post("/addproduct",addproductAuth, addproduct);
router.get("/getAllProducts", authForGetAllproduct, getAllProducts);
router.get("/getProductById", getProductById);
router.put("/updateProduct",updateProductAuth, updateProduct);
router.delete("/deleteProduct",deleteProductAuth, deleteProduct);


export default router;