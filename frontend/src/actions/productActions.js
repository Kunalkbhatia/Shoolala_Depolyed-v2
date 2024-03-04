import axios from "axios";
import {
  allProductRequest,
  allProductFail,
  allProductSucces,
  allAdminProductRequest,
  allAdminProductSucces,
  allAdminProductFail,
} from "../reducers/Product Slice/productSlice";
import {
  productDetailsFail,
  productDetailsRequest,
  productDetailsSuccess,
} from "../reducers/Product Slice/productDetailsSlice";
import {
  createProductFail,
  createProductRequest,
  createProductSuccess,
} from "../reducers/Product Slice/createProductSlice";
import {
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
} from "../reducers/Product Slice/deleteProductSlice";
import {
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
} from "../reducers/Product Slice/updateProductSlice";
import {
  createReviewFail,
  createReviewRequest,
  createReviewSuccess,
} from "../reducers/Product Slice/createReviewSlice";

export const getProducts =
  (keyword = "", currentPage = 1, price = [0, 100000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch(allProductRequest());
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);
      
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        data.products = [...array]
      }
      shuffleArray(data.products);
      dispatch(allProductSucces(data));
    } catch (error) {
      const payload = error.response.data.message;
      dispatch(allProductFail(payload));
    }
  };

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch(allAdminProductRequest());

    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch(allAdminProductSucces(data));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(allAdminProductFail(payload));
  }
};

export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch(createProductRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch(createProductSuccess(data));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(createProductFail(payload));
  }
};

export const getProductDetails =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch(productDetailsRequest());
      const { data } = await axios.get(`/api/v1/product/${id}`);
      dispatch(productDetailsSuccess(data.product));
    } catch (error) {
      const payload = error.response.data.message;
      dispatch(productDetailsFail(payload));
    }
  };

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch(deleteProductSuccess(data.success));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(deleteProductFail(payload));
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch(updateProductSuccess(data.success));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(updateProductFail(payload));
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch(createReviewSuccess(data.success));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(createReviewFail(payload));
  }
};
