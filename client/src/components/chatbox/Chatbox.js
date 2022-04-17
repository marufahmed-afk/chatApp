import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import { updateMessages, getMessages } from '../../actions/groups';

// Component imports
import ChatItem from './ChatItem';

let socket;

const Chatbox = ({
  groups: { currentGroup, loading, storedMessages },
  auth: { user },
  updateMessages,
  getMessages,
}) => {
  let url = window.location.protocol + '//' + window.location.host + '/';

  const [text, setText] = useState('');
  const [newText, setNewText] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (storedMessages.length > 0) {
      setMessages(storedMessages);
    } else {
      setMessages([]);
    }
  }, [storedMessages]);

  useEffect(() => {
    socket = io(url);

    if (currentGroup !== null) {
      getMessages(currentGroup._id);
      const { name } = currentGroup;
      const { username } = user;
      socket.emit('join', { username, name }, () => {});
    }

    socket.on('message', (message) => {
      console.log(message, 'client message');
      setMessages((prev) => [...prev, message]);
    });

    socket.on('connected', () => {
      console.log('connected');
    });

    socket.on('welcome', () => {
      console.log('first');
      // console.log('connected', username);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [currentGroup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('messageUpdate: ', user.username, text, currentGroup.name);
    console.log(user._id, 'id', currentGroup.name);

    socket.emit(
      'sendMessage',
      text,
      user._id,
      currentGroup.name,
      currentGroup._id,
      () => setText('')
    );
  };

  return (
    !loading &&
    currentGroup !== null && (
      <div className='chat-box'>
        <div className='chat-header'>
          <h2 className='chat-title'>{currentGroup?.name}</h2>
        </div>
        <div className='chat-wrapper'>
          <div className='chat-content'>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <ChatItem key={index} message={message} />
              ))
            ) : (
              <p
                style={{ color: 'white', padding: '10px', textAlign: 'center' }}
              >
                Start your conversation!
              </p>
            )}
            <div ref={messagesEndRef} />
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
                <button className='form-btn'>
                  <img
                    src={require('../../assets/send.svg')}
                    alt=''
                    className='send'
                  />
                </button>
              </form>
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

export default connect(mapStateToProps, { updateMessages, getMessages })(
  Chatbox
);
