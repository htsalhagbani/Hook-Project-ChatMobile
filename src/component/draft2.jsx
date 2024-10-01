// src/ChatWindow.js
import React from 'react';
import PropTypes from 'prop-types';

const ChatWindow = ({ user, messages, sendMessage }) => {
  const [input, setInput] = React.useState('');

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(user, input);
      setInput('');
    }
  };

  return (

    <div className="card w-96 bg-base-100 shadow-xl m-4">
      <div className="card-body">
        <h3 className="card-title">{user}'s Chat</h3>
        <div className="overflow-y-auto h-60 border p-2 mb-2">
          {messages.map((msg, index) => (
            <div key={index} className={`p-1 ${msg.user === user ? 'text-green-500' : 'text-gray-500'}`}>
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered w-full mr-2"
          />
          <button onClick={handleSend} className="btn btn-primary">Send</button>
        </div>
      </div>
    </div>

    
  );
};

ChatWindow.propTypes = {
  user: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default ChatWindow;
