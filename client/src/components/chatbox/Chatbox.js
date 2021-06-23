import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import { updateMessages } from '../../actions/groups';

// Component imports
import ChatItem from './ChatItem';

let socket;

const Chatbox = ({
  groups: { currentGroup, loading },
  auth: { user },
  updateMessages,
}) => {
  let url = window.location.protocol + '//' + window.location.host + '/';

  const [text, setText] = useState('');
  const [newText, setNewText] = useState('');

  useEffect(() => {
    socket = io(url);

    if (currentGroup !== null) {
      const { name } = currentGroup;
      const { username } = user;
      socket.emit('join', { username, name }, () => {});
    }

    console.log(socket);

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [currentGroup]);

  useEffect(() => {
    socket.on('message', (message) => {
      setNewText(message);
    });
  }, [newText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('messageUpdate: ', user.username, text, currentGroup._id);

    socket.emit('sendMessage', text, user._id, () => setText(''));

    //updateMessages(user.username, text, currentGroup._id);
  };

  return (
    !loading &&
    currentGroup !== null && (
      <div className='chat-box'>
        <div className='chat-header'>
          <h2 className='chat-title'>Siege Clan</h2>
        </div>
        <div className='chat-wrapper'>
          <div className='chat-content'>
            {currentGroup &&
              currentGroup.messages.map((message) => (
                <ChatItem key={message._id} message={message} />
              ))}
            <ChatItem message={newText} />
          </div>

          <div className='chat-input'>
            <div className='type-area'>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Start Typing Here...'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>

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
    )
  );
};

const mapStateToProps = (state) => ({
  groups: state.groups,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateMessages })(Chatbox);
