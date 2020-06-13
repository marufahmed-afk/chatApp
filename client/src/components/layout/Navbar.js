import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Chat.</h2>
      <img src={require("../../assets/ham.svg")} alt="" className="ham" />
    </div>
  );
};

export default Navbar;
