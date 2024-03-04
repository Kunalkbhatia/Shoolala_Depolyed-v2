const express = require("express");
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAllProductsForAdmin } = require("../controllers/productController");
const { isAuthenticated, authorizationRoles } = require("../middleware/auth");



const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/review").put( isAuthenticated ,createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, deleteReview);
  
  router.route("/admin/products").get(isAuthenticated , authorizationRoles("admin") , getAllProductsForAdmin);
  router.route("/admin/product/new").post(isAuthenticated , authorizationRoles("admin") , createProduct);
  router.route("/product/:id").get(getProductDetails);
  router.route("/admin/product/:id").put(isAuthenticated , authorizationRoles("admin") , updateProduct);
  router.route("/admin/product/:id").delete(isAuthenticated , authorizationRoles("admin") , deleteProduct);



module.exports = router; 