import React from "react";

const Navbar = () => {
  return (
    <div className="navbar container">
      <img
        src={require("../../assets/logo.svg")}
        alt=""
        className="brand-logo"
      />
      <h3 className="logout-btn">Logout</h3>
      <img src={require("../../assets/ham.svg")} alt="" className="ham" />
    </div>
  );
};

export default Navbar;
