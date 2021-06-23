import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const ChatItem = ({ message: { username, text, date } }) => {
  return (
    <div className='message-container'>
      <div className='message-user'>
        <p className='username'>{username}</p>
      </div>
      <div className='message'>
        <p className='message-text'>{text}</p>
        <div className='message-time'>
          <p className='time'>{moment(date).startOf('hour').fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
