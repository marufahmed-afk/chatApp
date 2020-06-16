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
        <div className="chat-content">
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </div>

        <div className="chat-input">
          <div className="type-area">
            <input type="text" placeholder="Start Typing Here..." />
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
    </div>
  );
};

export default Chatbox;
