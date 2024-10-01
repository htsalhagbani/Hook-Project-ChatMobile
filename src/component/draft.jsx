// src/App.js
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const App = () => {
  const [names, setNames] = useState({ user1: '', user2: '' });
  const [isChatReady, setIsChatReady] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setNames((prevNames) => ({ ...prevNames, [name]: value }));
  };

  const startChat = () => {
    if (names.user1 && names.user2) {
      setIsChatReady(true);
    }
  };

  const sendMessage = (user, text) => {
    const newMessage = { user, text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col items-center p-5">
      {!isChatReady ? (
        <div className="card w-96 bg-base-100 shadow-xl p-5">
          <h2 className="card-title">Enter Names to Start Chat</h2>
          <input
            type="text"
            name="user1"
            value={names.user1}
            onChange={handleNameChange}
            placeholder="Enter name for User 1"
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            name="user2"
            value={names.user2}
            onChange={handleNameChange}
            placeholder="Enter name for User 2"
            className="input input-bordered w-full mb-4"
          />
          <button onClick={startChat} className="btn btn-primary w-full">
            Start Chat
          </button>
        </div>
      ) : (
        <div className="flex justify-center flex-wrap">
          <ChatWindow user={names.user1} messages={messages} sendMessage={sendMessage} />
          <ChatWindow user={names.user2} messages={messages} sendMessage={sendMessage} />
        </div>
      )}
    </div>
  );
};

export default App;
