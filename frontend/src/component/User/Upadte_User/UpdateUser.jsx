import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../../User/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateUser } from "../../../actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileImages } from "../profileIcons";
import defaultProfile from "../../../images/Profile.png";
import { clearUserErrors, updateReset } from "../../../reducers/User Slice/UserSlice";
import Loading from "../../layout/Loading/Loading";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const { user, isUpdated , loading, error} = useSelector((state) => state.user);
  const [currentUserDetails, setcurrentUserDetails] = useState({ ...user });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdated) {
      dispatch(loadUser());
      navigate("/account");
      toast.success("User Updated")
      dispatch(updateReset());
    }
    if(error){
      toast.error(error);
      dispatch(clearUserErrors());
    }

    
  }, [isUpdated, navigate, dispatch,error]);

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setcurrentUserDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateTheUser = async (event) => {
    event.preventDefault();
    dispatch(updateUser(currentUserDetails));
  };

  return (
<Fragment>
  {
    loading? <Loading/> :
    <Fragment>
        <div className="Register-container">
      <form className="Register-form" onSubmit={updateTheUser}>
        <h1 className="form-heading">Update your account</h1>
        <input
          className="name-input"
          type="text"
          placeholder="Name"
          name="name"
          value={currentUserDetails.name}
          onChange={changeHandler}
        />
        <input
          className="email-input"
          type="text"
          placeholder="Email"
          name="email"
          value={currentUserDetails.email}
          onChange={changeHandler}
        />

        <div className="profile-section">
          <div className="profile-preview">
            <img
              src={
                currentUserDetails.avatar
                  ? currentUserDetails.avatar
                  : defaultProfile
              }
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
            Update Account
          </button>
        </div>

        <Link className="changeTab" to="/account">
          Go back to account ?
        </Link>
      </form>
    </div>
    </Fragment>
  }
</Fragment>
  );
};

export default UpdateUser;
