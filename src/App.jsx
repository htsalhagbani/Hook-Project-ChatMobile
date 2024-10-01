import React, { useState } from 'react';
import ChatWindow from './component/ChatWindow';
// import './App.css';
import './index.css';

function App() {
  const [user1, setUser1] = useState({ id: 'user1', name: '', image: '' });
  const [user2, setUser2] = useState({ id: 'user2', name: '', image: '' });
  const [messages, setMessages] = useState([]);

  const sendMessage = (sender, text, timestamp) => {
    if (!sender.name) return;

    const otherUser = sender.id === user1.id ? user2 : user1;

    if (otherUser.name) {
      setMessages(prevMessages => [...prevMessages, { sender: sender.id, text, timestamp }]);
    }
  };

  return (
    <div className='flex md:h-screen w-full bg-[lightgray] justify-center items-center'>
    <div className="flex flex-col md:flex-row justify-center w-full items-center md:h-[80vh] bg-[lightgreen] p-4 space-y-4 md:space-y-0 md:space-x-4 max-sm:pb-12">
      <div className="flex-1 max-w-md overflow-auto md:max-h-full">
        <ChatWindow
          user={user1}
          setUser={setUser1}
          messages={messages}
          sendMessage={sendMessage}
          otherUser={user2}
        />
      </div>
      <div className="flex-1 max-w-md overflow-auto md:max-h-full">
        <ChatWindow
          user={user2}
          setUser={setUser2}
          messages={messages}
          sendMessage={sendMessage}
          otherUser={user1}
        />
      </div>
    </div>
  </div>
  
  );
}

export default App;
