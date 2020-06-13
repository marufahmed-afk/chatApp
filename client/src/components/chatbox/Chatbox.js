import React from "react";

// Component imports
import ChatItem from "./ChatItem";

const Chatbox = () => {
  return (
    <div className="chat-box">
      <div className="chat-header">
        <h2 className="chat-title">Siege Clan</h2>
      </div>
      <div className="chat-wrapper">
        <ChatItem />
        <div className="chat-input">
          <input type="text" />
          <div className="form-btn">
            <img
              src={require("../../assets/send.svg")}
              alt=""
              className="send"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
