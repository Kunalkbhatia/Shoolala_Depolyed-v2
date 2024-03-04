
import {
  addToCart,
  removeFromCart,
  saveShippinginfo,
} from "../reducers/Cart Slice/cartSlice";

export const addItemsTocart = (payload) => async (dispatch, getState) => {
  // const { data } = await axios.get(`/api/v1/product/${id}`);
  // const payload = {
  //   product: data.product._id,
  //   name: data.product.name,
  //   price: data.product.price,
  //   image: data.product.images[0].url,
  //   stock: data.product.stock,
  //   quantity: quantity,
  // };
  dispatch(addToCart(payload));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch(removeFromCart(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveTheShippingInfo = (shippingData) => async (dispatch, getState) => {
    dispatch(saveShippinginfo(shippingData));
    localStorage.setItem("shippingInfo", JSON.stringify(shippingData));
};
