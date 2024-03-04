import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../../User/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../actions/userActions";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../layout/Loading/Loading";
import MetaData from "../../layout/Helmets/MetaData";
import toast from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { clearUserErrors } from "../../../reducers/User Slice/UserSlice";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const redirect = location.search ? location.search.split("=")[1] : "account";
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserErrors());
    }
    if (isAuthenticated) {
      if (redirect === "account") toast.success("Logged In");
      navigate(`/${redirect}`);
    } else {
      toast(
        "you can use the credentials to use the admin feature. Please Don't tamper the data with bad intentions ",
        { duration: 6000 }
      );
      toast("email: testing@gmail.com , password: Password  ", {
        duration: 7000,
      });
    }
  }, [dispatch, redirect, isAuthenticated, navigate, error]);

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const login = (event) => {
    event.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Login" />
          <div className="Login-container">
            <h1 className="form-heading">Login to your account</h1>
            <form className="Login-form" onSubmit={login}>
              <input
                className="email-input"
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={changeHandler}
              />
              <div className="password_input" >

              <input
                className="password-input"
                type={visible ? "text" : "password"} 
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={changeHandler}
              >
              </input>
              <VisibilityIcon onClick = {()=> setVisible(true)} className={!visible?"visibile-icon":"hiddenIcon"} />
              <VisibilityOffIcon onClick = {()=> setVisible(false)} className={visible?"visibile-icon":"hiddenIcon"} />
              </div>
              
              <div>
                <button className="Login-btn" type="submit">  
                  Login In
                </button>
              </div>
              <Link to="/register" className="changeTab">
                Create an account?
              </Link>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
