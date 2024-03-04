import React, { Fragment, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../../actions/productActions.js";
import { getAllAdminOrders } from "../../../actions/orderActions.js";
import MetaData from "../../layout/Helmets/MetaData.jsx";
import {Chart, ArcElement,CategoryScale,LinearScale, PointElement,LineElement,Tooltip, Legend} from 'chart.js'
import Loading from "../../layout/Loading/Loading.jsx";
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {
  const dispatch = useDispatch();

  const { loading ,products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.orders);
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllAdminOrders());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <Fragment>
      { loading ? <Loading/> : 
        <Fragment>
          <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>

        </Fragment>
      }
    </Fragment>
  );
};

export default Dashboard;