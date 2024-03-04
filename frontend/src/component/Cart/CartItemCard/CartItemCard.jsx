import React from 'react'
import "./cartItemCard.css";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast"

const CartItemCard = ({item , deleteCartItems}) => {
  return (
   <div className="cartItemCard">
    <img src={item.image} alt="Please refresh" />
    <div>
      <Link to={`/product/${item.product}`}>{item.name}</Link>
      <span>{`Price: ₹${item.price}`}</span>
      <p onClick={() => {
        toast.success("Item removed from cart")
        deleteCartItems(item.product)}}>remove</p>
    </div>
   </div>
  )
}

export default CartItemCard
