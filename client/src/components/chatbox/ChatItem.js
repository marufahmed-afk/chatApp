import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';

const ChatItem = ({ message: { username, text, date }, auth: { user } }) => {
  console.log(date, 'date');
  const isUser = user.username === username;

  if (isUser) {
    return (
      <div
        className='message-container'
        style={user?.username === username ? { alignSelf: 'end' } : ''}
      >
        <div className='message-user'>
          <p className='username'>{username}</p>
        </div>
        <div
          className='message'
          style={
            user?.username === username ? { backgroundColor: '#7904eb' } : ''
          }
        >
          <p className='message-text'>{text}</p>
          <div className='message-time'>
            <p className='time'>{moment(date).fromNow()}</p>
          </div>
        </div>
      </div>
    );
  }

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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ChatItem);
