const express = require("express");
const { isAuthenticated, authorizationRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

router.route("/order/new").post(isAuthenticated,newOrder);
router.route("/orders/me").get(isAuthenticated,myOrders);
router.route("/orders/:id").get(isAuthenticated,getSingleOrder);

router.route("/admin/orders").get(isAuthenticated,authorizationRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticated,authorizationRoles("admin"),updateOrder);
router.route("/admin/order/:id").delete(isAuthenticated,authorizationRoles("admin"),deleteOrder);

module.exports = router;
