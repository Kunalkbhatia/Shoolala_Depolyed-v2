import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/Product Slice/productSlice";
import productDetailsReducer from "./reducers/Product Slice/productDetailsSlice";
import userReducer from "./reducers/User Slice/UserSlice";
import cartReducer from "./reducers/Cart Slice/cartSlice";
import newOrderReducer from "./reducers/Order Slice/newOrderSlice";
import orderDetailsReducer from "./reducers/Order Slice/orderDetailSlice";
import ordersReducer from "./reducers/Order Slice/ordersSlice";
import createProductReducer from "./reducers/Product Slice/createProductSlice";
import clearErrorsReducer from "./reducers/Error Slice/ErrorSlice"
import deleteProductReducer from "./reducers/Product Slice/deleteProductSlice";
import updateProductReducer from "./reducers/Product Slice/updateProductSlice";
import deleteOrderReducer from "./reducers/Order Slice/deleteOrderSlice";
import updateOrderReducer from "./reducers/Order Slice/updateOrderSlice";
import createReviewReducer from "./reducers/Product Slice/createReviewSlice";
const appStore = configureStore({
    reducer : {
        products : productReducer,
        productDetails : productDetailsReducer,
        user: userReducer,
        cart: cartReducer,
        newOrder: newOrderReducer,
        orders: ordersReducer,
        orderDetails: orderDetailsReducer,
        createProduct:createProductReducer,
        clearErrors:clearErrorsReducer,
        deleteProduct:deleteProductReducer,
        updateProduct:updateProductReducer,
        deleteOrder:deleteOrderReducer,
        updateOrder:updateOrderReducer,
        createReview:createReviewReducer,

    }
});


export default appStore;