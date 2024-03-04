import React from 'react'
import "./OrderDeatils.css"
import { Link, useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { Fragment } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loading from '../../layout/Loading/Loading'
import { getOrderDetails } from '../../../actions/orderActions'
import MetaData from '../../layout/Helmets/MetaData'

const OrderDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const {order , loading} = useSelector((state) => state.orderDetails)
  const {orderItems = [],shippingInfo = {}} = order || {}
  const address = shippingInfo?`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`:"";


  useEffect(() => {
      dispatch(getOrderDetails(params))
  },[dispatch,params])


  return (
    <Fragment>
      {loading ? <Loading/> : (
      <Fragment>
        <MetaData title="Order Details"/>
        <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{order?.user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{order?.shippingInfo?.phoneNumber}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {orderItems &&
                orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{order.itemsPrice}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{order.shippingPrice}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{order.taxPrice}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{order.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
      </Fragment>
      )}
    </Fragment>
  )
}

export default OrderDetails
