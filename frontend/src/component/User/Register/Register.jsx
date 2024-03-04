import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../../User/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileImages } from "../profileIcons";
import defaultProfile from "../../../images/Profile.png";
import MetaData from "../../layout/Helmets/MetaData";
import Loading from "../../layout/Loading/Loading.jsx";
import { clearUserErrors } from "../../../reducers/User Slice/UserSlice.js";
import toast from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar:
      "https://res.cloudinary.com/dga6havun/image/upload/v1704269992/profileIcons/profile1_jywzgd.png",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);  

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (error) {
      if (error.substring(0, 6) === "E11000")
        toast.error("User Already Exists");
      else toast.error(error);
      dispatch(clearUserErrors());
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, navigate, error, dispatch]);

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createUser = async (event) => {
    event.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Sign up" />
          <div className="Register-container">
            <h1 className="form-heading">Create your account</h1>
            <form className="Register-form" onSubmit={createUser}>
              <input
                className="name-input"
                type="text"
                placeholder="Name"
                name="name"
                value={user.name}
                onChange={changeHandler}
              />
              <input
                className="email-input"
                type="text"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={changeHandler}
              />
              <div className="password_input">
                <input
                  className="password-input"
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={changeHandler}
                ></input>
                <VisibilityIcon
                  onClick={() => setVisible(true)}
                  className={!visible ? "visibile-icon" : "hiddenIcon"}
                />
                <VisibilityOffIcon
                  onClick={() => setVisible(false)}
                  className={visible ? "visibile-icon" : "hiddenIcon"}
                />
              </div>

              <div className="profile-section">
                <div className="profile-preview">
                  <img
                    src={user.avatar ? user.avatar : defaultProfile}
                    alt=""
                  />
                </div>
                <div className="profile-select">
                  <h2>Select Profile:</h2>
                  <select name="avatar" onChange={changeHandler}>
                    {profileImages.map((url, index) => (
                      <option key={index} value={url}>
                        Profile {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <button className="Register-btn" type="submit">
                  Create Account
                </button>
              </div>

              <Link className="changeTab" to="/login">
                Already have an account?
              </Link>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Register;
