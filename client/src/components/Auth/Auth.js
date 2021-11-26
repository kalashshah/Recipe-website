import React, { useState } from "react";
import * as styles from "./styles";
import { Navbar } from "../";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const Auth = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const formSwitchHandler = (event) => {
    event.preventDefault();
    setIsLogin(!isLogin);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      dispatch(signin(formInput, history));
    } else {
      dispatch(signup(formInput, history));
    }
  };

  const changeHandler = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/recipes");
    } catch (error) {
      console.error(error);
    }
  };

  const googleFailure = (error) => {
    console.error(error);
    console.log("Sign In uncessfull");
  };

  return (
    <>
      <Navbar />
      <form className={styles.form} onSubmit={submitHandler}>
        <div className="p-3">
          <h2 className={styles.title}>{isLogin ? "Login" : "Sign Up"}</h2>
        </div>

        <div className="p-3">
          <GoogleLogin
            clientId="359419344357-385ik3n8hsp4u0sqs4gfkc0e991ilf0a.apps.googleusercontent.com"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
            onClick={() => console.log("Click")}
          />
        </div>
        <hr className="mb-2" />

        {!isLogin && (
          <div className="p-3">
            <label className="block mb-1">Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              onChange={changeHandler}
            />
          </div>
        )}
        <div className="p-3">
          <label className="block mb-1">Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            onChange={changeHandler}
          />
        </div>
        <div className="p-3 py-2">
          <label className="block mb-1">Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            onChange={changeHandler}
          />
        </div>
        <button className={styles.button} type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <hr className="my-2" />
        <div className="flex items-center">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button className={styles.button} onClick={formSwitchHandler}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Auth;
