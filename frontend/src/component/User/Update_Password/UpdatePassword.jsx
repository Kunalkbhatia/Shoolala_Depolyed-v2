import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../../User/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updatePassword } from "../../../actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearUserErrors, updatePasswordReset, updateReset } from "../../../reducers/User Slice/UserSlice";
import Loading from "../../layout/Loading/Loading";
import toast from "react-hot-toast";


const UpdatePassword = () => {
  const { isUpdated, loading, error } = useSelector((state) => state.user);
  const [ passwords, setPasswords ] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
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

    dispatch(updatePasswordReset());
  }, [isUpdated, navigate, dispatch,error]);

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setPasswords((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateThePassword = async (event) => {
    event.preventDefault();
    dispatch(updatePassword(passwords));
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="Login-container">
            <form className="Login-form" onSubmit={updateThePassword}>
              <h1 className="form-heading">Update your password</h1>

              <input
                className="password-input"
                type="password"
                placeholder="Enter Old Password"
                name="oldPassword"
                // value={passwords.oldPassword}
                onChange={changeHandler}
              />
              <input
                className="password-input"
                type="password"
                placeholder="Enter New Password"
                name="newPassword"
                // value={passwords.newPassword}
                onChange={changeHandler}
              />
              <input
                className="password-input"
                type="password"
                placeholder="Confirm New Password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={changeHandler}
              />
              <div>
                <button className="Login-btn" type="submit">
                  Update Password
                </button>
              </div>
              <Link to="/account" className="changeTab">
                Go back to account?
              </Link>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
