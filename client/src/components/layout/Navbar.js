import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { toggleSidebar } from "../../actions/interaction";

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  toggleSidebar,
}) => {
  const handleClick = () => {
    toggleSidebar();
  };

  return (
    <div className="navbar container">
      <img
        src={require("../../assets/logo.svg")}
        alt=""
        className="brand-logo"
      />

      <h3 className="logout-btn" onClick={logout}>
        Logout
      </h3>
      <img
        src={require("../../assets/ham.svg")}
        alt=""
        onClick={handleClick}
        className="ham"
      />
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, toggleSidebar })(Navbar);
