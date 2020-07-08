import React from "react";

const AddGroup = () => {
  return (
    <div className=" form-box">
      <form className="auth-form">
        <h2>Create/Join a Group</h2>
        <label htmlFor="name">Group Name</label>
        <input type="text" />
        <input className="auth-form-btn" type="submit" value="GO!" />
      </form>
    </div>
  );
};

export default AddGroup;
