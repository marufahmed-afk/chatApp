import React from "react";

// Component imports
import Chatbox from "../chatbox/Chatbox";
import Groups from "../groups/Groups";

const Dashboard = () => {
  return (
    <div className="main-grid">
      <Groups />
      <Chatbox />
    </div>
  );
};

export default Dashboard;
