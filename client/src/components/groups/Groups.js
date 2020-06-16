import React from "react";

// Component imports
import GroupItem from "./GroupItem";

const Groups = () => {
  return (
    <div className="group-box">
      <h2 className="title">GROUPS</h2>
      <GroupItem />
      <GroupItem />
    </div>
  );
};

export default Groups;
