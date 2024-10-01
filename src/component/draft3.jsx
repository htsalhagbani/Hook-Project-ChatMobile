import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bg from '../assets/background.webp'; // Ensure this path is correct

// ChatWindow Component
function ChatWindow({ userName, messages, sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(userName, message);
      setMessage(''); // Clear the input
    }
  };

  return (
    <div className="mockup-phone border-primary w-[400px] h-[700px] flex flex-col">
      <div className="camera h-2 bg-black"></div>
      <div className="display flex-grow relative">
        <div
          className={`artboard artboard-demo phone-2 w-full h-full bg-cover bg-center flex flex-col p-2`}
          style={{ backgroundImage: `url(${bg})` }}
        >
          {/* Chat Messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat mb-4 w-full ${msg.sender === userName ? 'chat-end' : 'chat-start'}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={`${msg.sender} Avatar`}
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.sender}
                <time className="text-xs opacity-50">Now</time>
              </div>
              <div className={`chat-bubble ${msg.sender === userName ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                {msg.text}
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))}
        </div>

        {/* Input and Send Button positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-80 flex items-center">
          <input
            type="text"
            className="flex-grow border rounded-lg p-2"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="ml-2 bg-blue-500 text-white rounded-lg p-2 flex items-center"
            onClick={handleSend}
          >
            {/* Send Icon */}
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {
  userName: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  sendMessage: PropTypes.func.isRequired,
};