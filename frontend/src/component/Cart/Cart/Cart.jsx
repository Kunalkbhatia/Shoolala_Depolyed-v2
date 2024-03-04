import React, { Fragment } from "react";
import "../Cart/cart.css";
import CartItemCard from "../CartItemCard/CartItemCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsTocart,
  removeItemsFromCart,
} from "../../../actions/cartActions.js";
import Typography from "@mui/material/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../layout/Loading/Loading.jsx";
import MetaData from "../../layout/Helmets/MetaData.jsx";


const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);
  

  const increaseQuantity = (item) => {
    const newQty = item.quantity + 1;
    if (item.stock <= item.quantity) {
      return;
    }
    const payload = { ...item , quantity:newQty}
    dispatch(addItemsTocart(payload));
    
};

const decreaseQuantity = (item) => {
  const newQty = item.quantity - 1;
  if (1 >= item.quantity) {
    return;
  }
  console.log(newQty);
    const payload = { ...item , quantity:newQty}
    dispatch(addItemsTocart(payload));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Cart Items" />
          <Fragment>
            {cartItems.length === 0 ? (
              <div className="emptyCart">
                <RemoveShoppingCartIcon />

                <Typography>No Product in Your Cart</Typography>
                <Link to="/products">View Products</Link>
              </div>
            ) : (
              <Fragment>
                <div className="cartPage">
                  <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                  </div>

                  {cartItems &&
                    cartItems.map((item) => (
                      <div className="cartContainer" key={item.product}>
                        <CartItemCard
                          item={item}
                          deleteCartItems={deleteCartItems}
                        />
                        <div className="cartInput">
                          <button
                            onClick={() =>
                              decreaseQuantity(item)
                            }
                          >
                            -
                          </button>
                          <input type="number" className="span" value={item.quantity} readOnly />
                          <button
                            onClick={() =>
                              increaseQuantity(
                                item
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <p className="cartSubtotal">{`₹${
                          item.price * item.quantity
                        }`}</p>
                      </div>
                    ))}

                  <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                      <p>Gross Total</p>
                      <p>{`₹${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                      <button onClick={checkoutHandler}>Check Out</button>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
