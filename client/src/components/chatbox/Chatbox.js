import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

// Component imports
import ChatItem from './ChatItem';

let socket;

const Chatbox = ({ groups: { currentGroup } }) => {
  let url = window.location.protocol + '//' + window.location.host + '/';

  useEffect(() => {
    socket = io(url);

    if (currentGroup !== null) {
      const { name } = currentGroup;
      socket.emit('join', { name }, () => {});
    }

    console.log(socket);

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [currentGroup]);

  return (
    <div className='chat-box'>
      <div className='chat-header'>
        <h2 className='chat-title'>Siege Clan</h2>
      </div>
      <div className='chat-wrapper'>
        <div className='chat-content'>
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </div>

        <div className='chat-input'>
          <div className='type-area'>
            <input type='text' placeholder='Start Typing Here...' />
            <div className='form-btn'>
              <img
                src={require('../../assets/send.svg')}
                alt=''
                className='send'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  groups: state.groups,
});

export default connect(mapStateToProps)(Chatbox);
