import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../actions/orderActions";
import "./UserOrders.css";
import { Link } from "react-router-dom";
import Loading from "../../layout/Loading/Loading";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <div className="orders-container">
      <div className="fields">
        <div>OrderId</div>
        <div>Status</div>
        <div>Items</div>
        <div>Amount</div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        orders &&
        orders.map((order) => (
          <Link key={order._id} to={`/order/${order._id}`} className="order">
            <div className="order-id">{order._id}</div>
            <div>{order.orderStatus}</div>
            <div>{order.orderItems.length}</div>
            <div>{`₹${order.totalPrice}`}</div>
          </Link>
        ))
      )}
    </div>
  );
};

export default UserOrders;
