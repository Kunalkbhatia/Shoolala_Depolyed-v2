import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../layout/Helmets/MetaData.jsx";
import Loading from "../layout/Loading/Loading.jsx";

import axios from "axios";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [homeProducts, setHomeProducts] = useState([]);

  useEffect(() => {
    const getProductsData = async () => {
      let link = `/api/v1/products?page=${currentPage}`;
      const { data } = await axios.get(link);
      const nextProducts = data.products;
      setHomeProducts((prev) => [...prev, ...nextProducts]);
      setLoading(false);
    };
    getProductsData();
  }, [currentPage]);

  const handelInfiniteScroll = async () => {
    try {
          
      if (
        window.innerHeight + document.documentElement.scrollTop + 20 >=
        document.documentElement.scrollHeight
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={"Home"}></MetaData>
          <div className="banner">
            <p>Welcome to Shoolala</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          
          <div className="container" id="container">
            {homeProducts &&
              homeProducts.map((product) => (
                <ProductCard key={product._id} product={product}></ProductCard>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
