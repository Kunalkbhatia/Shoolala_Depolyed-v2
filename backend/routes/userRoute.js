const express = require("express");
const { registerUser, loginUser, logout, getUserDetails, updatePassword, updateProfile, getAllUsers , updateUserRole, deleteUser, getSingleUser } = require("../controllers/userController");
const { isAuthenticated , authorizationRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated,updatePassword);
router.route("/admin/users").get(isAuthenticated,authorizationRoles("admin"),getAllUsers);
router.route("/me/update").put(isAuthenticated,updateProfile);
router.route("/admin/user/:id").get(isAuthenticated,authorizationRoles("admin"),getSingleUser);
router.route("/admin/user/:id").put(isAuthenticated,authorizationRoles("admin"),updateUserRole);
router.route("/admin/user/:id").delete(isAuthenticated,authorizationRoles("admin"),deleteUser);  


module.exports = router;