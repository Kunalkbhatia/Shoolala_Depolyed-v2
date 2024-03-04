import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import MetaData from "../../layout/Helmets/MetaData.jsx";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "../Sidebar/Sidebar.jsx";
import { deleteOrder, getAllAdminOrders } from "../../../actions/orderActions.js";
import { clearDeleteOrderErrors, deleteOrderStatusReset } from "../../../reducers/Order Slice/deleteOrderSlice.js";
import Loading from "../../layout/Loading/Loading.jsx";
import toast from "react-hot-toast";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { orders, loading } = useSelector((state) => state.orders);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteOrder
  );

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };



  useEffect(() => {
    

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearDeleteOrderErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch(deleteOrderStatusReset());
    }

    dispatch(getAllAdminOrders());
  }, [dispatch, deleteError, isDeleted, navigate]);



  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.id === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
            <Fragment>
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
  orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      { loading ? <Loading/> :
        <Fragment>
        <MetaData title={`ALL Orders - Admin`} />
  
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 className="productListHeading">ALL ORDERS</h1>
  
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              initialState={{
                ...rows.initialState,
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[5, 10, 25]}
            />
          </div>
        </div>
      </Fragment>
      }
    </Fragment>
  );
};

export default OrderList;