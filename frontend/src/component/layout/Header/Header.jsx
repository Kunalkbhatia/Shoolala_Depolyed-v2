import React, { useState } from "react";
import logo from "../../../images/logo.png";
import Search from "../../layout/Search/Search.jsx";
import { Link, useNavigate } from "react-router-dom";
import "../../layout/Header/Header.css";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux/es/hooks/useSelector.js";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="header-section">
      <div onClick={() => navigate("/")} className="logo-section">
        <img className="logo" src={logo} alt="img can't load please referesh" />
      </div>
      <Search />
      <div className={`nav-links ${checked ? `hamburgerActive` : `hamburger`}`}>
        <Link to="/" className="linkStyle">
          Home
        </Link>
        <Link to="/products" className="linkStyle">
          Products
        </Link>
        <Link to="/cart" className="linkStyle">
          Cart {cartItems.length > 0 ? `(${cartItems.length})` : ""}
        </Link>
        <Link
          to={isAuthenticated ? "/account" : "/login"}
          className="linkStyle"
        >
          {checked ? "Account": <PersonIcon fontSize="large" />}
        </Link>
      </div>
      <div className="ham">
        <input
          type="checkbox"
          id="ham"
          checked={checked}
        />
        <label htmlFor="ham" onClick={() => setChecked(!checked)}>
          {checked ? <CloseIcon fontSize="large"/> : <MenuIcon fontSize="large" />}
        </label>
      </div>
    </div>
  );
};

export default Header;
