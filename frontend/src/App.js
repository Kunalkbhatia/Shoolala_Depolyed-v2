import WebFont from "webfontloader";
import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.jsx";
import Footer from "./component/layout/Footer/Footer.jsx";
import Home from "./component/Home/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./component/Product/Products.jsx";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import ScrollToTop from "./component/Scroller/ScrolToTop.js";
import Login from "./component/User/Login/Login.jsx";
import Register from "./component/User/Register/Register.jsx";
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userActions.js";
import Profile from "./component/User/Profile/Profile.jsx";
import UpdateUser from "./component/User/Upadte_User/UpdateUser.jsx";
import UpdatePassword from "./component/User/Update_Password/UpdatePassword.jsx";
import Cart from "./component/Cart/Cart/Cart.jsx";
import Shipping from "./component/Cart/Shipping/Shipping.jsx";
import ConfirmOrder from "./component/Cart/Confirm_Order/ConfirmOrder.jsx";
import Payment from "./component/Cart/Payment/Payment.jsx";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./component/Protected Route/ProtectedRoute.jsx";
import OrderSuccess from "./component/Cart/OrderSuccess/OrderSuccess.jsx";
import NotFound from "./component/layout/NotFound/NotFound.jsx";
import UserOrders from "./component/Cart/UserOrders/UserOrders.jsx";
import OrderDetails from "./component/Cart/OrderDetails/OrderDetails.jsx";
import Dashboard from "./component/Admin/Dashboard/Dashboard.jsx";
import ProductList from "./component/Admin/ProductList/ProductList.jsx";
import NewProduct from "./component/Admin/NewProduct/NewProduct.jsx";
import UpdateProduct from "./component/Admin/UpdateProduct/UpdateProduct.jsx";
import OrderList from "./component/Admin/OrderList/OrderList.jsx";
import ProcessOrder from "./component/Admin/ProcessOrder/ProcessOrder.jsx";
function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated === true) getStripeApiKey();
  }, [isAuthenticated, stripeApiKey]);

  return (
    <Router>
      <Header></Header>
      {isAuthenticated && <UserOptions user={user} />}

      <ScrollToTop />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateUser />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )}
        </Route>

        {/* Admin routes  */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
        </Route>

      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
