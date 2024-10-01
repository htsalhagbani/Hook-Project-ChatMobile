import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bg from '../assets/baclground.webp'; 
import img4 from '../assets/img4.png';

function ChatWindow({ user, setUser, messages, sendMessage, otherUser }) {
  const [message, setMessage] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [height, setHeight] = useState('40px'); 
  const defaultAvatar = img4;
  const isImageUrl = (url) => {
    return (
        /\.(jpeg|jpg|gif|png|bmp|svg|webp)$/.test(url) ||
        url.startsWith('data:image/')
    );
};

  const handleSend = () => {
    if (!isSetupComplete) {
      alert('Please enter your name to start chatting!');
      return;
    }

    if (message.trim()) {
      const timestamp = new Date();
      sendMessage(user, message, timestamp);
      setMessage('');
    }

    setHeight('40px');
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    setHeight('auto'); 
    setHeight(`${e.target.scrollHeight}px`); 
  };

  const handleSetupComplete = (e) => {
    e.preventDefault();
    setIsSetupComplete(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
  };

  return (
<div className="mockup-phone border-[green] w-full max-sm:w-[350px] max-w-[400px] h-[700px] flex flex-col mx-auto ">
<div className="camera h-2 bg-black"></div>
      <div className="display flex-grow relative flex items-center justify-center ">
        <div
          className="artboard artboard-demo phone-2 w-full h-full bg-cover bg-center flex flex-col  "
          style={{ paddingBottom: '80px', backgroundImage: `url(${bg})` }}
        >
            {/* Header */}
               {isSetupComplete && (
            <div className="chat-header sticky w-full top-0 z-10 flex items-center p-5 bg-white text-black mb-2">
                <div className="chat-image avatar w-10 h-10 border border-black rounded-full overflow-hidden mr-2 max-sm:ml-6">
                  <img
                    alt="Receiving User Avatar"
                    src={otherUser.image || defaultAvatar}
                  />
                </div>
                <span className="font-bold md:text-lg">{otherUser.name}</span>
              </div>
            )}
            <div className="flex flex-col w-full h-full flex-grow ">
            <div className="flex flex-col w-full h-full  flex-grow justify-end">
                <div className="flex flex-col p-2  overflow-y-auto  md:pb-2 pb-6 mb-6"
                >
                {messages.map((msg, index) => (
                    <div
                    key={index}
                    className={`chat mb-4 pl-2 pr-2  w-[90%] md:w-full flex ${msg.sender === user.id ? 'chat-end flex-row-reverse max-sm:ml-4  ' : 'chat-end  max-sm:ml-4 '}`}
                    >
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full overflow-hidden">
                        <img
                            alt={`${msg.sender} Avatar`}
                            src={msg.sender === user.id ? user.image || defaultAvatar : otherUser.image || defaultAvatar}
                        />
                        </div>
                    </div>
                    <div className={`flex flex-col ${msg.sender === user.id ? 'items-end' : 'items-start '}`}>
                        <div className={`chat-header text-white mb-1 ${msg.sender === user.id ? 'text-end' : 'text-start'}`}>
                        <span>{msg.sender === user.id ? user.name : otherUser.name}</span>
                        </div>
                     {/* Message */}
                         <div
                            className={`chat-bubble rounded-lg ${msg.sender === user.id ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'} break-words overflow-hidden`}
                            style={{ wordBreak: 'break-word', maxWidth: '100%' }}>
                            {isImageUrl(msg.text) ? (
                            <img src={msg.text} alt="User sent" className="max-w-full rounded" />
                            ) : (
                            <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                            )}
                    </div>
                       
                        <time className="text-xs opacity-50 text-white mt-1">{formatTime(msg.timestamp)}</time>
                    </div>
                    </div>
                ))}
                </div>


            </div>
            </div>



          {/* User Name Form */}
          {!isSetupComplete && (
                <form
                onSubmit={handleSetupComplete}
                className="flex flex-col justify-center max-sm:w-[300px] "
                >              
                <input
                type="text"
                placeholder="Enter your name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
                className="border p-2 mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-white p-2 mb-2"
              />
              <button type="submit" className="bg-green-500 text-white p-2">
                Start Chat
              </button>
            </form>
          )}
        </div>

        {isSetupComplete && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-80 flex items-center">
          <textarea
            className="flex-grow border rounded-lg p-2 resize-none w-48 max-w-full"
            placeholder="Type a message..."
            value={message}
            onChange={handleChange}
            style={{ height, minHeight: '40px', maxHeight: '200px', overflow: 'hidden' }} 
        />
            <button
              className="ml-2  text-white rounded-lg p-2 flex items-center"
              onClick={handleSend}
            >
              <svg
                className="h-6 w-6 text-[darkgreen]"
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
        )}
      </div>
    </div>
  );
}

ChatWindow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  sendMessage: PropTypes.func.isRequired,
  otherUser: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default ChatWindow;
