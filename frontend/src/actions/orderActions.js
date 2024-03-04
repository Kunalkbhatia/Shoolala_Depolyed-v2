import axios from "axios";
import {
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
} from "../reducers/Order Slice/newOrderSlice";

import {
  getAdminOrdersFail,
  getAdminOrdersRequest,
  getAdminOrdersSuccess,
  getOrdersFail,
  getOrdersRequest,
  getOrdersSuccess,
} from "../reducers/Order Slice/ordersSlice";

import {
  orderDetailsFail,
  orderDetailsRequest,
  orderDetailsSuccess,
} from "../reducers/Order Slice/orderDetailSlice";
import {
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
} from "../reducers/Order Slice/deleteOrderSlice";
import {
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
} from "../reducers/Order Slice/updateOrderSlice";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(order);

    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch(createOrderSuccess(data));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(createOrderFail(payload));
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(getOrdersRequest());

    const { data } = await axios.get("/api/v1/orders/me");
    dispatch(getOrdersSuccess(data));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(getOrdersFail(payload));
  }
};

export const getOrderDetails =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch(orderDetailsRequest());

      const { data } = await axios.get(`/api/v1/orders/${id}`);

      dispatch(orderDetailsSuccess(data.order));
    } catch (error) {
      const payload = error.response.data.message;
      dispatch(orderDetailsFail(payload));
    }
  };

export const getAllAdminOrders = () => async (dispatch) => {
  try {
    dispatch(getAdminOrdersRequest());

    const { data } = await axios.get("/api/v1/admin/orders");
    

    dispatch(getAdminOrdersSuccess(data.orders));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(getAdminOrdersFail(payload));
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch(deleteOrderSuccess(data.success));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(deleteOrderFail(payload));
  }
};

export const updateAdminOrder = (id, order) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch(updateOrderSuccess(data.success));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(updateOrderFail(payload));
  }
};
