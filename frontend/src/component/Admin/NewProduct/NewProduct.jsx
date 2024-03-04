import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
// import { clearErrors } from "../../../reducers/Error Slice/ErrorSlice";
import { createNewProduct } from "../../../actions/productActions";
import { Button } from "@mui/material";
import MetaData from "../../layout/Helmets/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "../Sidebar/Sidebar";
import { clearCreateProductErrors, createProductUpdateReset } from "../../../reducers/Product Slice/createProductSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../layout/Loading/Loading";
import toast from "react-hot-toast";
const NewProduct = () => {  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success,error } = useSelector((state) => state.createProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Sandals",
    "Slippers",
    "Sneakers",
    "Boots",
    "Formals",
    "Sports",
    "Heels",
  ];

  useEffect(() => {
    
    if (error) {
      toast.error(error);
      dispatch(clearCreateProductErrors());
    }
    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch(createProductUpdateReset());
    }
  }, [dispatch,navigate, success,error]);

  const createProductSubmitHandler = (event) => {
    event.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    console.log(images)
    console.log(typeof(images))
    dispatch(createNewProduct(myForm));
  };

  const createProductImagesChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 2);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      {loading ? <Loading/> : 
      <Fragment>
      <MetaData title="Create Product" />
      <div className="card-container">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(event) => setCategory(event.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(event) => setStock(event.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>}
    </Fragment>
  );
};

export default NewProduct;