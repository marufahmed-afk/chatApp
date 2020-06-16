import React from "react";

// Component imports
import Chatbox from "../chatbox/Chatbox";
import Groups from "../groups/Groups";

const Dashboard = () => {
  return (
    <div className="main-grid container">
      <Chatbox />
      <Groups />
    </div>
  );
};

export default Dashboard;
