import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import ProductCard from "../Home/ProductCard";
import Loading from "../layout/Loading/Loading";
import MetaData from "../layout/Helmets/MetaData";
import Slider from "@mui/material/Slider";
import "../Product/Products.css";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Pagination from "react-js-pagination";

const categories = [
  "Sandals",
  "Slippers",
  "Sneakers",
  "Boots",
  "Formals",
  "Sports",
  "Heels",
];

const Products = () => {
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");
  const [currentPage , setCurrentPage] = useState(1);
  const [ratings, setRatings] = useState(0);

  const dispatch = useDispatch();
  const { loading, products, productsCount, resultPerPage } = useSelector((state) => state.products);
  const { keyword } = useParams();

  const setCurrentPageNo = (event) => {
    setCurrentPage(event)
  }

  const ratingHandler = (event ,newRating ) => {
    setRatings(newRating);
  }

  useEffect(() => {
    dispatch(getProducts(keyword,currentPage, price, category,ratings));
  }, [dispatch, keyword, price, category,currentPage,ratings]);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS " />
          <h1 className="productsHeading">Products</h1>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
              size="small"
              style={{
                color: 'tomato', 
              }}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange  ={ratingHandler}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
                size="small"
                style={{
                  color: 'tomato', 
                }}
              />

            </fieldset>
          </div>
         
          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
         
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
