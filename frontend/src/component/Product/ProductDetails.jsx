import React, { useEffect, useState } from "react";
import { Fragment } from "react";
// import Carousel from "react-material-ui-carousel";
import Carousel from "../layout/Carousel/Carousel";
import { getProductDetails, newReview } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import "../Product/productDetails.css";
import Loading from "../layout/Loading/Loading";
import { addItemsTocart } from "../../actions/cartActions";
import { clearCreateReviewErrors, createReviewStatusReset } from "../../reducers/Product Slice/createReviewSlice";


import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from '@mui/material';
import toast from "react-hot-toast";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { product, loading } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.createReview
  );




  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearCreateReviewErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch(createReviewStatusReset());
    }
    dispatch(getProductDetails(params));
  }, [dispatch, params,reviewError,success]);

  const addToCartHandler = () => {
    const payload = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.stock,
      quantity: quantity,
    };
    dispatch(addItemsTocart(payload));
    toast.success("Item added to cart");
  };

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="wrapperProductDetails">
          <div className="ProductDetails">
            <div>
              <Carousel images={product.images}></Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({product?.reviews?.length} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button
                      onClick={() =>
                        setQuantity((quantity) =>
                          quantity <= 1 ? quantity : quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <input className="span" readOnly type="number" value={quantity} />
                    <button
                      onClick={() =>
                        setQuantity((quantity) =>
                          product.stock > quantity ? quantity + 1 : quantity
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>{" "}
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
            </div>
          </div>
          
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
