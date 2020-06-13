import React from "react";

const ChatItem = () => {
  return (
    <div className="message-container">
      <div className="message-user">
        <p className="username">Maruf</p>
      </div>
      <div className="message">
        <p className="message-text">
          Hello this is my first message Hello this is my first message
        </p>
      </div>
      <div className="message-time">
        <p className="time">2:35</p>
      </div>
    </div>
  );
};

export default ChatItem;
