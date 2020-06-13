import React from "react";

// Component imports
import GroupItem from "./GroupItem";

const Groups = () => {
  return (
    <div className="group-box">
      <h1 className="title">GROUPS</h1>
      <GroupItem />
      <GroupItem />
      <p className="logout">Logout</p>
    </div>
  );
};

export default Groups;
