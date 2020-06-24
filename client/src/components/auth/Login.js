import React, { userState } from "react";

const Login = () => {
  return (
    <div className="auth-grid container">
      <div className="intro">
        <img
          src={require("../../assets/intro-logo.svg")}
          alt=""
          className="intro-logo"
        />
        <p className="intro-text">
          Meet your next favorite messaging platform!
        </p>
      </div>
      <div className="form-box">
        <h2 className="form-header">Login</h2>
        <form className="auth-form">
          <label htmlFor="username">Username</label>
          <input type="text" />

          <label htmlFor="password">Password</label>
          <input type="text" />

          <input className="auth-form-btn" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
