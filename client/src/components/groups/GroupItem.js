import React from "react";

const GroupItem = ({ groupName }) => {
  return (
    <div className="group-item">
      <h3 className="group-name">{groupName}</h3>
    </div>
  );
};

export default GroupItem;
